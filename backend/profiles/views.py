from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import get_object_or_404
import jdatetime

from accounts.models import Student, Teacher
from .serializers import StudentProfileSerializer, TeacherProfileSerializer

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def profile_api_view(request):
    user = request.user
    
    if user.role == 'student':
        profile = get_object_or_404(Student, user=user)
        serializer_class = StudentProfileSerializer
    else:
        profile = get_object_or_404(Teacher, user=user)
        serializer_class = TeacherProfileSerializer


    if request.method == 'GET':

        serializer = serializer_class(profile, context={'request': request})
        return Response({'status': 'success', 'data': serializer.data})


    elif request.method == 'POST':
        data = request.data
        try:
            user.first_name = data.get('first_name', user.first_name)
            user.last_name = data.get('last_name', user.last_name)
            

            password = data.get('password')
            if password:
                if len(password) < 8:
                    return Response({'status': 'error', 'message': 'رمز عبور باید حداقل ۸ کاراکتر باشد'}, status=400)
                user.set_password(password)
                user.has_static_password = True
            user.save()


            profile.national_code = data.get('national_code', profile.national_code)
            
            day = data.get('birth_day')
            month = data.get('birth_month')
            year = data.get('birth_year')
            
            if day and month and year:
                try:
                    # تبدیل شمسی به میلادی
                    profile.birth_date = jdatetime.date(int(year), int(month), int(day)).togregorian()
                except ValueError:
                    return Response({'status': 'error', 'message': 'تاریخ وارد شده معتبر نیست'}, status=400)

            #  آپلود تصویر پروفایل (فیلد profile_image در مدل accounts)
            if 'profile_image' in request.FILES:
                profile.profile_image = request.FILES['profile_image']

            #  اطلاعات تحصیلی
            if user.role == 'student':
                profile.grade = data.get('grade', profile.grade)
                profile.major = data.get('major', profile.major)
            else:
                profile.level = data.get('level', profile.level)
                profile.subject = data.get('subject', profile.subject)

            profile.save()
            return Response({'status': 'success', 'message': 'پروفایل با موفقیت آپدیت شد'})

        except Exception as e:
            return Response({'status': 'error', 'message': str(e)}, status=400)