from rest_framework import serializers
from .models import Course, Video, Package
from accounts.models import Teacher
from django.db.models import Avg

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ['id', 'title', 'video_file', 'duration', 'order']

class CourseSerializer(serializers.ModelSerializer):
    videos = VideoSerializer(many=True, read_only=True)
    teacher_name = serializers.SerializerMethodField()
    role_in_course = serializers.SerializerMethodField()
    video_count = serializers.ReadOnlyField() 
    total_duration = serializers.ReadOnlyField()
    course_type_display = serializers.CharField(source='get_course_type_display', read_only=True)
    student_count = serializers.ReadOnlyField(source='total_students_count')
    ratings_count = serializers.ReadOnlyField()
    is_owned = serializers.SerializerMethodField()
    average_rating = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = [
            'id', 'title', 'description', 'thumbnail', 'handout',
            'course_type', 'course_type_display', 'grade', 'subject', 
            'teacher_name', 'role_in_course', 'video_count', 'total_duration', 'videos',
            'student_count', 'average_rating', 'ratings_count', 'is_owned'
        ]

    def get_teacher_name(self, obj):
        return f"{obj.teacher.user.first_name} {obj.teacher.user.last_name}"

    def get_role_in_course(self, obj):
        request = self.context.get('request')
        if not request or not request.user.is_authenticated:
            return "guest"
        
        user = request.user
        if obj.teacher.user == user:
            return "owner"
        if obj.participants.filter(id=user.id).exists():
            return "student"
        return "none"

    def get_is_owned(self, obj):
        """
        اصلاح شده: اگر کاربر معلم دوره باشد یا دانش‌آموز ثبت‌نامی، دسترسی دارد (True)
        """
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            user = request.user
            # چک کردن همزمان مالکیت معلم و عضویت دانش‌آموز
            is_teacher = obj.teacher.user == user
            is_student = obj.participants.filter(id=user.id).exists()
            return is_teacher or is_student
        return False

    def get_average_rating(self, obj):
        # استفاده از course_ratings به جای ratings
        avg = obj.course_ratings.aggregate(Avg('score'))['score__avg']
        return round(avg, 1) if avg else 0

class CourseCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['title', 'description', 'thumbnail', 'handout', 'course_type', 'grade', 'subject']

    def create(self, validated_data):
        request = self.context.get('request')
        user = request.user
        try:
            teacher = Teacher.objects.get(user=user)
        except Teacher.DoesNotExist:
            raise serializers.ValidationError("پروفایل معلم برای این کاربر یافت نشد.")
        return Course.objects.create(teacher=teacher, **validated_data)

class PackageListSerializer(serializers.ModelSerializer):
    teacher_name = serializers.SerializerMethodField()
    enrolled_count = serializers.IntegerField(source='participants.count', read_only=True)
    courses_count = serializers.IntegerField(source='courses.count', read_only=True)

    class Meta:
        model = Package
        fields = ['id', 'title', 'thumbnail', 'teacher_name', 'enrolled_count', 'courses_count']

    def get_teacher_name(self, obj):
        return f"{obj.teacher.user.first_name} {obj.teacher.user.last_name}"

class PackageDetailSerializer(serializers.ModelSerializer):
    teacher_name = serializers.SerializerMethodField()
    teacher_image = serializers.SerializerMethodField()
    courses = CourseSerializer(many=True, read_only=True)
    is_enrolled = serializers.SerializerMethodField()

    class Meta:
        model = Package
        fields = [
            'id', 'title', 'description', 'thumbnail', 'teacher_name', 
            'teacher_image', 'courses', 'is_enrolled'
        ]

    def get_teacher_name(self, obj):
        return f"{obj.teacher.user.first_name} {obj.teacher.user.last_name}"
    
    def get_teacher_image(self, obj):
        request = self.context.get('request')
        if obj.teacher.profile_image and request:
            return request.build_absolute_uri(obj.teacher.profile_image.url)
        return None

    def get_is_enrolled(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.participants.filter(id=request.user.id).exists()
        return False