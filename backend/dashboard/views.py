from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Q
from accounts.models import Student, Teacher
from courses.models import Course
from profiles.serializers import StudentProfileSerializer, TeacherProfileSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_dashboard(request):
    user = request.user
    
    if user.role == 'student':
        profile = Student.objects.get(user=user)
        profile_data = StudentProfileSerializer(profile, context={'request': request}).data
        course_count = Course.objects.filter(participants=user).count()
    else:
        profile = Teacher.objects.get(user=user)
        profile_data = TeacherProfileSerializer(profile, context={'request': request}).data
        course_count = Course.objects.filter(Q(teacher__user=user) | Q(participants=user)).distinct().count()

    dashboard_data = {
        'user_info': {
            'full_name': f"{user.first_name} {user.last_name}",
            'role': user.role,
            'profile_image': profile_data.get('profile_image'),
        },
        'statistics': {
            'total_courses': course_count,
            #اپشن های دیگه
        },
        'status': 'success'
    }

    return Response(dashboard_data)
















                # می‌توان آمارهای دیگر مثل "آزمون‌های پیش رو" یا "ساعت مطالعه" را اضافه کرد
