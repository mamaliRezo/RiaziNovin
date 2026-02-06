import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.db import transaction
from django.db.models import Q
from django.utils import timezone
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User, OTPcode, Student, Teacher
from .utils import send_sms, send_email

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

@csrf_exempt
@require_http_methods(['POST'])
def check_user_view(request):
    """ مرحله اول ورود: چک کردن وجود کاربر و ارسال کد """
    try:
        data = json.loads(request.body)
        phone_email = data.get('phone_email', '').strip()
        
        if not phone_email:
            return JsonResponse({'status': 'error', 'message': 'شماره تلفن یا ایمیل اجباری است'}, status=400)
        
        # پیدا کردن کاربر بدون نیاز به نقش (Role)
        user = User.objects.filter(Q(phone_number=phone_email) | Q(email=phone_email)).first()
        
        if not user:
            return JsonResponse({
                'status': 'error', 
                'message': 'کاربر یافت نشد', 
                'redirect_to': 'signup/'
            }, status=404)

        # چک کردن محدودیت زمانی ارسال مجدد
        last_otp = OTPcode.objects.filter(user=user).order_by('-created_at').first()
        if last_otp and (timezone.now() - last_otp.created_at).total_seconds() < 120:
            return JsonResponse({'status': 'error', 'message': 'لطفا 120 ثانیه صبر کنید'}, status=429)

        # تولید کد جدید
        OTPcode.clean_expired()
        otp_code = OTPcode.generate_code()
        OTPcode.objects.filter(user=user, is_used=False).delete()
        OTPcode.objects.create(user=user, code=otp_code)

        message = f"کد تایید شما: {otp_code}\nمعتبر برای ۲ دقیقه"
        if '@' in phone_email:
            send_email(phone_email, 'کد تایید ورود', message)
        else:
            send_sms(phone_email, message)

        return JsonResponse({
            'status': 'success', 
            'message': 'کد تایید ارسال شد', 
            'role': user.role, # نقش را برمی‌گردانیم تا فرانت بداند کجا برود
            'has_static_password': user.has_static_password
        })
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': 'خطایی در سرور رخ داد'}, status=500)

@csrf_exempt
@require_http_methods(['POST'])
def verify_otp_view(request):
    """ مرحله دوم: تایید کد OTP برای ورود یا ثبت‌نام """
    try:
        data = json.loads(request.body)
        phone_number = (data.get('phone_number') or data.get('phone_email') or "").strip()
        otp = data.get('otp', '').strip()
        action = data.get('action', 'login').strip() # 'login' یا 'signup'

        if not phone_number or not otp:
            return JsonResponse({'status': 'error', 'message': 'شماره و کد تایید اجباری هستند'}, status=400)

        # پیدا کردن کد OTP معتبر
        otp_obj = OTPcode.objects.filter(
            Q(phone_number=phone_number) | Q(user__phone_number=phone_number) | Q(user__email=phone_number),
            code=otp, 
            is_used=False
        ).order_by('-created_at').first()
        
        if not otp_obj or not otp_obj.is_valid():
            return JsonResponse({'status': 'error', 'message': 'کد اشتباه یا منقضی شده است'}, status=400)

        with transaction.atomic():
            if action == 'signup':
                # در ثبت‌نام، نقش اجباری است
                role = data.get('role')
                if role not in ['student', 'teacher']:
                    return JsonResponse({'status': 'error', 'message': 'نقش کاربر نامعتبر است'}, status=400)
                
                if User.objects.filter(phone_number=phone_number).exists():
                    return JsonResponse({'status': 'error', 'message': 'این کاربر قبلاً ثبت‌نام کرده است'}, status=400)

                new_user = User.objects.create(
                    phone_number=phone_number,
                    first_name=data.get('first_name', ''),
                    last_name=data.get('last_name', ''),
                    role=role,
                    is_verified=True
                )
                
                if role == 'student':
                    Student.objects.create(
                        user=new_user, 
                        grade=data.get('grade'),
                        major=data.get('major'),
                        national_code=data.get('national_code')
                    )
                else:
                    Teacher.objects.create(
                        user=new_user, 
                        level=data.get('level'), 
                        subject=data.get('subject'),
                        national_code=data.get('national_code')
                    )
                target_user = new_user
            else:
                # در ورود (Login)، نقش را از مدل User می‌خوانیم
                target_user = otp_obj.user
                if not target_user:
                    return JsonResponse({'status': 'error', 'message': 'کاربری یافت نشد'}, status=404)
                role = target_user.role

            # مصرف کردن کد و تایید یوزر
            otp_obj.is_used = True
            otp_obj.user = target_user
            otp_obj.save()
            
            target_user.is_verified = True
            target_user.save()

            tokens = get_tokens_for_user(target_user)
            redirect_to = 'dashboard/student/' if role == 'student' else 'dashboard/teacher/'
            
            return JsonResponse({
                'status': 'success', 
                'tokens': tokens, 
                'role': role,
                'redirect_to': redirect_to
            })

    except Exception as e:
        return JsonResponse({'status': 'error', 'message': f'خطا: {str(e)}'}, status=500)

@csrf_exempt
@require_http_methods(["POST"])
def verify_password_view(request):
    """ ورود با رمز عبور ثابت (بدون نیاز به Role در ورودی) """
    try:
        data = json.loads(request.body)
        phone_email = data.get('phone_email', '').strip()
        password = data.get('password', '')
        
        user = User.objects.filter(Q(phone_number=phone_email) | Q(email=phone_email)).first()
        
        if not user:
            return JsonResponse({'status': 'error', 'message': 'کاربر یافت نشد'}, status=404)

        if not user.has_static_password:
             return JsonResponse({'status': 'error', 'message': 'رمز ثابت برای شما تنظیم نشده است'}, status=400)

        if user.check_password(password):
            tokens = get_tokens_for_user(user)
            redirect_to = 'dashboard/student/' if user.role == 'student' else 'dashboard/teacher/'
            return JsonResponse({
                'status': 'success', 
                'tokens': tokens, 
                'role': user.role,
                'redirect_to': redirect_to
            })
        
        return JsonResponse({'status': 'error', 'message': 'رمز عبور نادرست است'}, status=400)
    except Exception:
        return JsonResponse({'status': 'error', 'message': 'خطا در فرآیند ورود'}, status=500)

@csrf_exempt
@require_http_methods(["POST"])
def signup(request):
    """ مرحله اول ثبت‌نام: ارسال کد برای شماره جدید """
    try:
        data = json.loads(request.body)
        phone_number = data.get('phone_number', '').strip()
        
        if not phone_number:
            return JsonResponse({'status': 'error', 'message': 'شماره موبایل الزامی است'}, status=400)
            
        if User.objects.filter(phone_number=phone_number).exists():
            return JsonResponse({'status': 'error', 'message': 'این شماره قبلاً ثبت‌نام شده است'}, status=400)
        
        # محدودیت زمانی ۱۲۰ ثانیه برای شماره‌های ناشناس (بر اساس فیلد phone_number در OTP)
        last_otp = OTPcode.objects.filter(phone_number=phone_number, is_used=False).order_by('-created_at').first()
        if last_otp and (timezone.now() - last_otp.created_at).total_seconds() < 120:
             return JsonResponse({'status': 'error', 'message': 'لطفا ۲ دقیقه صبر کنید'}, status=429)

        otp_code = OTPcode.generate_code()
        OTPcode.objects.create(code=otp_code, phone_number=phone_number) 
        
        send_sms(phone_number, f'کد تایید ثبت‌نام: {otp_code}')
        return JsonResponse({'status': 'success', 'message': 'کد تایید ارسال شد'})
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': 'خطا در ثبت‌نام'}, status=500)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def set_static_password_view(request):
    """ تنظیم رمز عبور ثابت برای اولین بار """
    new_password = request.data.get('new_password', '')
    if len(new_password) < 8:
        return Response({'status': 'error', 'message': 'رمز حداقل باید ۸ کاراکتر باشد'}, status=400)
    
    user = request.user
    user.set_password(new_password)
    user.has_static_password = True
    user.save()
    return Response({'status': 'success', 'message': 'رمز عبور با موفقیت تنظیم شد'})

@csrf_exempt
@require_http_methods(["POST"])
def resend_otp_view(request):
    """ ارسال مجدد کد (هوشمند برای یوزر یا شماره ناشناس) """
    try:
        data = json.loads(request.body)
        identifier = (data.get('phone_email') or data.get('phone_number') or "").strip()
        
        user = User.objects.filter(Q(phone_number=identifier) | Q(email=identifier)).first()
        
        # فیلتر کردن بر اساس یوزر (اگر هست) یا شماره موبایل (برای ثبت‌نامی‌ها)
        filter_q = Q(user=user) if user else Q(phone_number=identifier)
        
        last_otp = OTPcode.objects.filter(filter_q).order_by('-created_at').first()
        if last_otp and (timezone.now() - last_otp.created_at).total_seconds() < 120:
            return JsonResponse({'status': 'error', 'message': 'لطفا ۱۲۰ ثانیه صبر کنید'}, status=429)

        otp_code = OTPcode.generate_code()
        OTPcode.objects.filter(filter_q, is_used=False).delete()
        OTPcode.objects.create(user=user, phone_number=identifier if not user else None, code=otp_code)
        
        send_sms(identifier, f'کد تایید مجدد: {otp_code}')
        return JsonResponse({'status': 'success', 'message': 'کد جدید ارسال شد'})
            
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': 'خطا در ارسال مجدد'}, status=500)