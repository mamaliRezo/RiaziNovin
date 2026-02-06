from rest_framework import serializers
from accounts.models import Student, Teacher, User
import jdatetime

class ProfileBaseSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name', required=False)
    last_name = serializers.CharField(source='user.last_name', required=False)
    phone_number = serializers.CharField(source='user.phone_number', read_only=True)
    
    # فیلدهای تفکیکی برای تاریخ تولد (فقط خواندنی برای نمایش)
    birth_day = serializers.SerializerMethodField()
    birth_month = serializers.SerializerMethodField()
    birth_year = serializers.SerializerMethodField()

    class Meta:
        model = None  # در کلاس‌های فرزند تعیین می‌شود
        fields = []

    def get_birth_day(self, obj):
        if obj.birth_date:
            return jdatetime.date.fromgregorian(date=obj.birth_date).day
        return None

    def get_birth_month(self, obj):
        if obj.birth_date:
            return jdatetime.date.fromgregorian(date=obj.birth_date).month
        return None

    def get_birth_year(self, obj):
        if obj.birth_date:
            return jdatetime.date.fromgregorian(date=obj.birth_date).year
        return None

class StudentProfileSerializer(ProfileBaseSerializer):
    class Meta:
        model = Student
        fields = [
            'first_name', 'last_name', 'phone_number', 'national_code', 
            'grade', 'major', 'profile_image', 
            'birth_day', 'birth_month', 'birth_year'
        ]

class TeacherProfileSerializer(ProfileBaseSerializer):
    class Meta:
        model = Teacher
        fields = [
            'first_name', 'last_name', 'phone_number', 'national_code', 
            'level', 'subject', 'profile_image',
            'birth_day', 'birth_month', 'birth_year'
        ]