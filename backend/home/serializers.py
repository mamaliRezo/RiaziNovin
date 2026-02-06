from rest_framework import serializers
from .models import Banner
from courses.models import Course, Package

# سریالایزر برای نمایش بنرها در هوم‌پیج
class BannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Banner
        fields = '__all__'

# سریالایزر برای ساخت بنر جدید (که قبلاً نوشتیم)
class BannerCreateSerializer(serializers.ModelSerializer):
    course_id = serializers.IntegerField(required=False, write_only=True)
    package_id = serializers.IntegerField(required=False, write_only=True)

    class Meta:
        model = Banner
        fields = ['title', 'image', 'course_id', 'package_id', 'order']

    def validate(self, attrs):
        course_id = attrs.get('course_id')
        package_id = attrs.get('package_id')
        if course_id and package_id:
            raise serializers.ValidationError("یک بنر نمی‌تواند همزمان به دوره و پکیج وصل شود.")
        return attrs