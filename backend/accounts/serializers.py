from rest_framework import serializers
from .models import User, Student, Teacher

class StudentProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)
    phone_number = serializers.CharField(source='user.phone_number', read_only=True)

    class Meta:
        model = Student
        fields = ('first_name', 'last_name', 'phone_number', 'grade')

class TeacherProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)
    phone_number = serializers.CharField(source='user.phone_number', read_only=True)
    
    level_display = serializers.CharField(source='get_level_display', read_only=True)
    subject_display = serializers.CharField(source='get_subject_display', read_only=True)

    class Meta:
        model = Teacher
        fields = ('first_name', 'last_name', 'phone_number', 'level', 'level_display', 'subject', 'subject_display')

class UserSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'phone_number', 'role', 'profile')

    def get_profile(self, obj):
        if obj.role == 'teacher' and hasattr(obj, 'teacher_profile'):
            return TeacherProfileSerializer(obj.teacher_profile).data
        elif obj.role == 'student' and hasattr(obj, 'student_profile'):
            return StudentProfileSerializer(obj.student_profile).data
        return None























'''
from rest_framework import serializers
from .models import User, Student, Teacher, Course, Video



class StudentProfileSerializer(serializers.ModelSerializer):#ModelSerializer برو از روی مدل خودت بخون من دیگه دستی وارد نکنم
    first_name = serializers.CharField(source='user.first_name')# فیلد user رو قبلا توی مدل دانش اموزساختیکه وصل شده به مدل یوزر 
    last_name = serializers.CharField(source='user.last_name')# source میگه که برو یه فیلدی رو که توی یوزر هست پیدا کن
    phone_number = serializers.CharField(source='user.phone_number')#خروجی حتما متن باشه

    class Meta:
        model = Student #به کدوم مدل وصل شه
        fields = ('first_name', 'last_name', 'phone_number', 'grade')

    # این تابع فقط برای متدهای GET استفاده می‌شود. (خواندن اطلاعات)
    def to_representation(self, instance):
        data = super().to_representation(instance)
        # در اینجا می‌توانید label های choices را برگردانید اگر نیاز بود
        # data['grade_display'] = instance.get_grade_display()
        return data


class TeacherProfileSerializer(serializers.ModelSerializer):
    # این فیلدها مستقیماً از مدل User که OneToOne به Teacher هست، خونده می‌شن
    first_name = serializers.CharField(source='user.first_name')#اگر اینو ننویسیم متا ارور میده چون این فیلد توی یوزر هست نه توی تیچر
    last_name = serializers.CharField(source='user.last_name')
    phone_number = serializers.CharField(source='user.phone_number')

    class Meta: #در واقع ما با تعریف فیلد در بالا، داریم به Meta دستور می‌دهیم که تنظیمات پیش‌فرض خودش را نادیده بگیرد و از دستور جدید ما استفاده کند
        model = Teacher
        fields = ('first_name', 'last_name', 'phone_number', 'level', 'subject')

    def to_representation(self, instance):
        data = super().to_representation(instance)# یک دیکشنری پایتونی میسازه که اطلاعات دیتابیس اون ابجکت توشه
        # برای نمایش بهتر level و subject در خروجی JSON
        data['level_display'] = instance.get_level_display()
        data['subject_display'] = instance.get_subject_display()
        return data


# --- Serializerهای دوره و ویدیو ---

class TeacherNameSerializer(serializers.ModelSerializer):
    """ فقط برای نمایش نام معلم در لیست دوره‌ها """
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')

    class Meta:
        model = Teacher
        fields = ('first_name', 'last_name')


class CourseListSerializer(serializers.ModelSerializer):
    """ نمایش لیست دوره‌ها """
    # استفاده از Serializer تو در تو برای نمایش اطلاعات معلم
    teacher_info = TeacherNameSerializer(source='teacher', read_only=True)
    cover_image_url = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = ('id', 'title', 'description', 'session_count', 'cover_image_url', 'teacher_info')

    def get_cover_image_url(self, obj):
        # ساخت URL کامل عکس کاور
        if obj.cover_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.cover_image.url)
        return None


class VideoListSerializer(serializers.ModelSerializer):
    """ برای نمایش لیست جلسات در صفحه جزئیات دوره (Session List) """

    class Meta:
        model = Video
        fields = ('id', 'title', 'duration_display', 'session_order')


class VideoDetailSerializer(serializers.ModelSerializer):
    """ برای نمایش جزئیات کامل یک ویدیو در حال پخش """
    teacher_name = serializers.SerializerMethodField()

    class Meta:
        model = Video
        fields = ('id', 'video_url', 'title', 'description', 'duration_display', 'teacher_name')

    def get_teacher_name(self, obj):
        # بازیابی نام و نام خانوادگی معلم از طریق مدل Course
        teacher = obj.course.teacher.user
        return f"{teacher.first_name} {teacher.last_name}"


class CourseDetailSerializer(serializers.ModelSerializer):
    """ نمایش جزئیات کامل دوره """
    # لیست تمام ویدیوهای مربوط به این دوره
    session_list = VideoListSerializer(source='videos', many=True, read_only=True)#بخاطر فارن کی...برای videos در دوره، چون مستقیم زیرمجموعه‌اش است، نیازی به این سفر طولانی نیست.
    teacher_name = serializers.SerializerMethodField()
    cover_image_url = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = ('id', 'title', 'description', 'teacher_name', 'cover_image_url', 'session_list')

    def get_teacher_name(self, obj):
        teacher = obj.teacher.user
        return f"{teacher.first_name} {teacher.last_name}"

    def get_cover_image_url(self, obj):
        if obj.cover_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.cover_image.url)
        return None

#hasattr() =. has attribute => hasattr(object, 'name_of_attribute')'''