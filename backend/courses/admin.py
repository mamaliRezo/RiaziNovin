from django.contrib import admin
from .models import Course, Video

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'teacher', 'grade', 'subject', 'is_published')
    list_filter = ('grade', 'subject', 'is_published')
    search_fields = ('title', 'teacher__user__last_name')
    filter_horizontal = ('participants',)

@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ('title', 'course', 'order', 'duration')
    list_filter = ('course',)
    search_fields = ('title',)