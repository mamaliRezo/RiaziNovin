from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils import timezone
from datetime import timedelta
import random
import string

class CustomUserManager(BaseUserManager):
    def create_user(self, phone_number, password=None, **extra_fields):
        if not phone_number:
            raise ValueError("شماره تلفن الزامی است")
        user = self.model(phone_number=phone_number, **extra_fields)
        if password:
            user.set_password(password)
            user.has_static_password = True
        user.save(using=self._db)
        return user

    def create_superuser(self, phone_number, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        return self.create_user(phone_number, password, **extra_fields)

class User(AbstractUser):
    username = None
    phone_number = models.CharField(max_length=15, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(max_length=100, blank=True, null=True, unique=True)
    role = models.CharField(max_length=10, default='student') # 'student' or 'teacher'
    has_static_password = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'phone_number'
    REQUIRED_FIELDS = []
    objects = CustomUserManager()

    def save(self, *args, **kwargs):
        if self.password and not self.password.startswith('pbkdf2'):
            self.has_static_password = True
            self.set_password(self.password)
        elif self.password and self.password.startswith('pbkdf2'):
            self.has_static_password = True
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.phone_number} ({self.first_name} {self.last_name})"

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='student_profile')
    
    # اطلاعات تکمیلی 
    national_code = models.CharField(max_length=10, blank=True, null=True, verbose_name="کد ملی")
    birth_date = models.DateField(blank=True, null=True, verbose_name="تاریخ تولد")
    profile_image = models.ImageField(upload_to='profiles/students/', blank=True, null=True, verbose_name="عکس پروفایل")
    
    # اطلاعات تحصیلی 
    grade = models.CharField(max_length=50, blank=True, null=True, verbose_name="مقطع تحصیلی")
    major = models.CharField(max_length=100, blank=True, null=True, verbose_name="رشته تحصیلی")

    def __str__(self):
        return f"دانش‌آموز: {self.user.first_name} {self.user.last_name}"

class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='teacher_profile')
    
    # اطلاعات تکمیلی
    national_code = models.CharField(max_length=10, blank=True, null=True, verbose_name="کد ملی")
    birth_date = models.DateField(blank=True, null=True, verbose_name="تاریخ تولد")
    profile_image = models.ImageField(upload_to='profiles/teachers/', blank=True, null=True, verbose_name="عکس پروفایل")
    
    # اطلاعات تحصیلی/شغلی
    level = models.CharField(max_length=50, blank=True, null=True, verbose_name="سطح تدریس")
    subject = models.CharField(max_length=100, blank=True, null=True, verbose_name="درس تخصصی")

    def __str__(self):
        return f"مدرس: {self.user.first_name} {self.user.last_name}"

class OTPcode(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='otp_codes', null=True, blank=True)
    phone_number = models.CharField(max_length=15, null=True, blank=True) 
    code = models.CharField(max_length=5)
    is_used = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()

    def save(self, *args, **kwargs):
        if not self.expires_at:
            self.expires_at = timezone.now() + timedelta(minutes=2)
        super().save(*args, **kwargs)

    def is_valid(self):
        return timezone.now() <= self.expires_at and not self.is_used

    @classmethod
    def generate_code(cls):
        return ''.join(random.choices(string.digits, k=5))
    
    @classmethod
    def clean_expired(cls):
        """حذف تمامی کدهای منقضی شده از دیتابیس"""
        cls.objects.filter(expires_at__lt=timezone.now()).delete()