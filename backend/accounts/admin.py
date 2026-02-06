from django.contrib import admin
from .models import User, Student, Teacher

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('phone_number', 'first_name', 'last_name', 'role', 'is_staff')
    list_filter = ('role', 'is_staff')
    search_fields = ('phone_number', 'first_name', 'last_name')

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('user', 'national_code', 'grade')
    search_fields = ('user__phone_number', 'national_code')

@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    list_display = ('user', 'national_code', 'subject')
    search_fields = ('user__phone_number', 'national_code')