from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import get_object_or_404
from django.db import transaction, DatabaseError
from django.db.models import Q, F
from .models import Course, Video, Package, Rating
from .serializers import CourseSerializer, VideoSerializer, PackageListSerializer, PackageDetailSerializer
from accounts.models import Teacher
from django.db.models import Avg, Q, F # اضافه کردن Avg در اینجا ضروری است

# ۱. لیست تمام دوره‌های موجود در سایت
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def all_courses_list(request):
    course_type = request.query_params.get('type')
    courses = Course.objects.filter(is_published=True).select_related('teacher__user')
    
    if course_type:
        courses = courses.filter(course_type=course_type)
        
    serializer = CourseSerializer(courses, many=True, context={'request': request})
    return Response({'status': 'success', 'data': serializer.data})

# ۲. لیست تمام پکیج‌های موجود (اضافه شده برای رفع ارور AttributeError)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def all_packages_list(request):
    packages = Package.objects.all().select_related('teacher__user')
    serializer = PackageListSerializer(packages, many=True, context={'request': request})
    return Response({'status': 'success', 'data': serializer.data})

# ۳. ثبت‌نام در دوره (نسخه اصلاح شده)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def enroll_in_course(request, course_id):
    try:
        course = Course.objects.get(id=course_id)
        user = request.user

        if course.teacher.user == user:
            return Response({'status': 'error', 'message': 'شما مدرس این دوره هستید و نیازی به ثبت‌نام ندارید.'}, status=400)

        if course.participants.filter(id=user.id).exists():
            return Response({'status': 'info', 'message': 'این دوره در لیست شما موجود است.'})

        course.participants.add(user)
        return Response({'status': 'success', 'message': f'دوره "{course.title}" با موفقیت اضافه شد.'})
    except Course.DoesNotExist:
        return Response({'status': 'error', 'message': 'دوره مورد نظر یافت نشد.'}, status=404)

# ۴. ثبت‌نام در پکیج (نسخه جدید با منطق اضافه کردن به دوره‌ها)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def enroll_in_package(request, package_id):
    try:
        package = get_object_or_404(Package, id=package_id)
        user = request.user

        if package.participants.filter(id=user.id).exists():
            return Response({'status': 'info', 'message': 'شما قبلاً این پکیج را تهیه کرده‌اید.'})

        with transaction.atomic():
            # اضافه کردن کاربر به پکیج
            package.participants.add(user)
            # اضافه کردن کاربر به تک‌تک دوره‌های درون پکیج (برای شمارش درست دانش‌آموزان)
            for course in package.courses.all():
                course.participants.add(user)

        return Response({'status': 'success', 'message': f'پکیج "{package.title}" و دوره‌های آن با موفقیت اضافه شدند.'})
    except Exception as e:
        return Response({'status': 'error', 'message': str(e)}, status=500)

# ۵. لیست دوره‌های خریداری شده (دانش‌آموز)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def enrolled_courses_list(request):
    course_type = request.query_params.get('type')
    courses = request.user.enrolled_courses.all().select_related('teacher__user')
    
    if course_type:
        courses = courses.filter(course_type=course_type)
        
    serializer = CourseSerializer(courses, many=True, context={'request': request})
    return Response({'status': 'success', 'data': serializer.data})

# ۶. لیست دوره‌های ساخته شده (معلم)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def created_courses_list(request):
    if request.user.role != 'teacher':
        return Response({'status': 'error', 'message': 'فقط مدرسین به این بخش دسترسی دارند.'}, status=403)
    
    course_type = request.query_params.get('type')
    courses = Course.objects.filter(teacher__user=request.user)
    
    if course_type:
        courses = courses.filter(course_type=course_type)
        
    serializer = CourseSerializer(courses, many=True, context={'request': request})
    return Response({'status': 'success', 'data': serializer.data})

# ۷. ایجاد دوره جدید
@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def create_course(request):
    if request.user.role != 'teacher':
        return Response({'status': 'error', 'message': 'فقط معلمان مجاز به ایجاد دوره هستند.'}, status=403)
    
    try:
        teacher = Teacher.objects.get(user=request.user)
        course = Course.objects.create(
            teacher=teacher,
            title=request.data.get('title'),
            description=request.data.get('description'),
            thumbnail=request.FILES.get('thumbnail'),
            handout=request.FILES.get('handout'),
            course_type=request.data.get('course_type', 'educational'),
            grade=request.data.get('grade'),
            subject=request.data.get('subject')
        )
        return Response({'status': 'success', 'course_id': course.id, 'message': 'دوره ساخته شد.'}, status=201)
    except Teacher.DoesNotExist:
        return Response({'status': 'error', 'message': 'پروفایل معلم یافت نشد.'}, status=404)
    except Exception as e:
        return Response({'status': 'error', 'message': str(e)}, status=400)

# ۸. مدیریت دوره (ویرایش و حذف)
@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def manage_course(request, pk):
    course = get_object_or_404(Course, pk=pk, teacher__user=request.user)
    
    if request.method == 'DELETE':
        course.delete()
        return Response({'status': 'success', 'message': 'دوره و تمامی محتویات آن حذف شد.'})
    
    elif request.method == 'PUT':
        fields = ['title', 'description', 'grade', 'subject', 'course_type', 'is_published']
        for field in fields:
            if field in request.data:
                setattr(course, field, request.data.get(field))
        
        if 'thumbnail' in request.FILES:
            course.thumbnail = request.FILES['thumbnail']
        if 'handout' in request.FILES:
            course.handout = request.FILES['handout']
            
        course.save()
        return Response({'status': 'success', 'message': 'تغییرات دوره ذخیره شد.'})

# ۹. افزودن ویدیو به دوره
@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def add_video(request, course_id):
    course = get_object_or_404(Course, id=course_id, teacher__user=request.user)
    title = request.data.get('title')
    video_file = request.FILES.get('video_file')
    
    if not video_file:
        return Response({'status': 'error', 'message': 'فایل ویدیو ارسال نشده است.'}, status=400)

    video = Video.objects.create(course=course, title=title, video_file=video_file)
    return Response({
        'status': 'success', 
        'message': 'ویدیو با موفقیت آپلود شد.',
        'order': video.order
    })

# ۱۰. مدیریت ویدیو بر اساس شماره جلسه
@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def manage_video_by_order(request, course_id, order_num):
    video = get_object_or_404(Video, course_id=course_id, order=order_num, course__teacher__user=request.user)
    
    if request.method == 'DELETE':
        with transaction.atomic():
            video.delete()
            Video.objects.filter(course_id=course_id, order__gt=order_num).update(order=F('order') - 1)
        return Response({'status': 'success', 'message': f'جلسه شماره {order_num} حذف شد.'})

    elif request.method == 'PUT':
        video.title = request.data.get('title', video.title)
        if 'video_file' in request.FILES:
            video.video_file = request.FILES['video_file']
        video.save()
        return Response({'status': 'success', 'message': f'جلسه شماره {order_num} ویرایش شد.'})

# ۱۱. جابه‌جایی هوشمند ویدیوها
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def move_video_by_order(request, course_id):
    try:
        old_order = int(request.data.get('old_order'))
        new_order = int(request.data.get('new_order'))
    except (TypeError, ValueError):
        return Response({'status': 'error', 'message': 'شماره جلسات نامعتبر است.'}, status=400)

    video = get_object_or_404(Video, course_id=course_id, order=old_order, course__teacher__user=request.user)
    
    if old_order == new_order:
        return Response({'status': 'no_change', 'message': 'تغییری در ترتیب ایجاد نشد.'})

    with transaction.atomic():
        if new_order < old_order:
            Video.objects.filter(course_id=course_id, order__gte=new_order, order__lt=old_order).update(order=F('order') + 1)
        else:
            Video.objects.filter(course_id=course_id, order__gt=old_order, order__lte=new_order).update(order=F('order') - 1)
        
        video.order = new_order
        video.save()
        
    return Response({'status': 'success', 'message': f'جلسه از {old_order} به {new_order} منتقل شد.'})

# ۱۲. جزئیات کامل یک دوره
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_course_detail(request, pk):
    user = request.user
    query = Q(pk=pk) & (Q(participants=user) | Q(teacher__user=user))
    course = get_object_or_404(Course, query)
    
    serializer = CourseSerializer(course, context={'request': request})
    return Response({'status': 'success', 'data': serializer.data})

# ۱۳. مدیریت پکیج‌های کاربر (ایجاد شده و ثبت‌نام شده)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_packages_list(request):
    try:
        user = request.user
        my_created_packages = []
        
        if user.role == 'teacher':
            packages = Package.objects.filter(teacher__user=user)
            my_created_packages = PackageListSerializer(packages, many=True).data

        enrolled_packages = Package.objects.filter(participants=user)
        my_enrolled_data = PackageListSerializer(enrolled_packages, many=True).data

        return Response({
            'status': 'success',
            'data': {
                'my_packages': my_created_packages,
                'enrolled_packages': my_enrolled_data
            }
        }, status=200)
    except Exception as e:
        return Response({'status': 'error', 'message': str(e)}, status=500)

# ۱۴. ایجاد پکیج جدید
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_package(request):
    if request.user.role != 'teacher':
        return Response({'status': 'error', 'message': 'فقط مدرسین مجاز به این کار هستند'}, status=403)
    
    try:
        teacher = Teacher.objects.get(user=request.user)
        title = request.data.get('title')
        if not title:
            return Response({'status': 'error', 'message': 'عنوان پکیج اجباری است'}, status=400)

        with transaction.atomic():
            package = Package.objects.create(
                teacher=teacher,
                title=title,
                description=request.data.get('description', ''),
                thumbnail=request.FILES.get('thumbnail')
            )
            course_ids = request.data.getlist('course_ids')
            if course_ids:
                valid_courses = Course.objects.filter(id__in=course_ids)
                package.courses.set(valid_courses)
            
        return Response({'status': 'success', 'message': 'پکیج با موفقیت ساخته شد', 'id': package.id}, status=201)
    except Teacher.DoesNotExist:
        return Response({'status': 'error', 'message': 'پروفایل مدرس یافت نشد'}, status=404)
    except Exception as e:
        return Response({'status': 'error', 'message': str(e)}, status=500)

# ۱۵. جزئیات پکیج
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def package_detail(request, pk):
    package = get_object_or_404(Package, pk=pk)
    serializer = PackageDetailSerializer(package, context={'request': request})
    return Response({'status': 'success', 'data': serializer.data})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def rate_course(request, course_id):
    try:
        score = request.data.get('score')
        if score is None or not (1 <= int(score) <= 5):
            return Response({'status': 'error', 'message': 'امتیاز باید بین ۱ تا ۵ باشد.'}, status=400)

        course = get_object_or_404(Course, id=course_id)
        
        # استفاده از مدل Rating موجود در همین اپلیکیشن (courses)
        rating, created = Rating.objects.update_or_create(
            user=request.user,
            course=course,
            defaults={'score': int(score)}
        )

        # محاسبه میانگین با نام جدید relation
        new_avg = course.course_ratings.aggregate(Avg('score'))['score__avg']

        return Response({
            'status': 'success',
            'message': 'امتیاز ثبت شد.',
            'average_rating': round(new_avg, 1) if new_avg else 0
        })
    except Exception as e:
        return Response({'status': 'error', 'message': str(e)}, status=500)