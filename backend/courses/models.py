from django.db import models
from accounts.models import Teacher, User
from django.db.models import Count, Avg
from moviepy.editor import VideoFileClip
from django.core.validators import MinValueValidator, MaxValueValidator
import os

class Course(models.Model):
    COURSE_TYPES = (
        ('educational', 'ویدیو آموزشی'),
        ('sample_questions', 'نمونه سوال'),
    )

    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name='created_courses')
    participants = models.ManyToManyField('accounts.User', related_name='enrolled_courses', blank=True, verbose_name="شرکت‌کنندگان")   
    title = models.CharField(max_length=255)
    description = models.TextField()
    thumbnail = models.ImageField(upload_to='courses/thumbnails/', null=True, blank=True)
    handout = models.FileField(upload_to='courses/handouts/', null=True, blank=True)
    course_type = models.CharField(max_length=20, choices=COURSE_TYPES, default='educational')
    grade = models.CharField(max_length=50, null=True, blank=True)
    subject = models.CharField(max_length=100)
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def video_count(self):
        return self.videos.count()

    @property
    def total_duration(self):
        total_seconds = sum(v.duration_seconds for v in self.videos.all())
        if total_seconds == 0: return "00:00"
        minutes, seconds = divmod(int(total_seconds), 60)
        hours, minutes = divmod(minutes, 60)
        return f"{hours:02d}:{minutes:02d}:{seconds:02d}" if hours > 0 else f"{minutes:02d}:{seconds:02d}"

    @property
    def total_students_count(self):
        direct = self.participants.count()
        via_packages = self.contained_in_packages.aggregate(total=Count('participants', distinct=True))['total'] or 0
        return direct + via_packages

    @property
    def ratings_count(self):
        return self.ratings.count()

    def __str__(self):
        return self.title


# کدهای قبلی (Course, Video و غیره بدون تغییر بمانند)

class Rating(models.Model):
    user = models.ForeignKey('accounts.User', on_delete=models.CASCADE, related_name='user_course_ratings')
    course = models.ForeignKey('Course', on_delete=models.CASCADE, related_name='course_ratings') # نام اصلاح شده
    score = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'course')

    def __str__(self):
        return f"{self.user.username} - {self.course.title}: {self.score}"
        

class Video(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='videos')
    title = models.CharField(max_length=255)
    video_file = models.FileField(upload_to='courses/videos/')
    duration_seconds = models.FloatField(default=0, editable=False)
    duration = models.CharField(max_length=20, editable=False, default="00:00")
    order = models.PositiveIntegerField(editable=False)

    class Meta:
        ordering = ['order']

    def save(self, *args, **kwargs):
        is_new = self.pk is None
        if is_new:
            last_video = Video.objects.filter(course=self.course).order_by('order').last()
            self.order = (last_video.order + 1) if last_video else 1
        
        super().save(*args, **kwargs)

        if is_new:
            try:
                clip = VideoFileClip(self.video_file.path)
                duration = clip.duration
                minutes, seconds = divmod(int(duration), 60)
                formatted_duration = f"{minutes:02d}:{seconds:02d}"
                Video.objects.filter(pk=self.pk).update(
                    duration_seconds=duration,
                    duration=formatted_duration
                )
                clip.close()
            except Exception as e:
                print(f"Error extracting duration: {e}")


class Package(models.Model):
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name='created_packages')
    participants = models.ManyToManyField(User, blank=True, related_name='enrolled_packages')
    title = models.CharField(max_length=255)
    description = models.TextField()
    thumbnail = models.ImageField(upload_to='packages/thumbnails/')
    courses = models.ManyToManyField(Course, related_name='contained_in_packages')
    price = models.PositiveIntegerField(default=0, help_text='قیمت به تومان؛ صفر یعنی رایگان')
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    @property
    def total_videos_count(self):
        return sum(course.video_count for course in self.courses.all())

class Payment(models.Model):
    STATUS_CHOICES = (
        ('pending', 'در انتظار پرداخت'),
        ('paid', 'پرداخت‌شده'),
        ('failed', 'ناموفق'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='payments')
    package = models.ForeignKey(Package, on_delete=models.CASCADE, related_name='payments')
    amount = models.PositiveIntegerField(help_text='مبلغ به تومان')
    authority = models.CharField(max_length=64, blank=True, null=True, db_index=True)
    ref_id = models.CharField(max_length=64, blank=True, null=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    paid_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.user} -> {self.package} ({self.status})"
