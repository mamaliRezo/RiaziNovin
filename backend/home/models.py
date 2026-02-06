from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from courses.models import Course, Package

class Banner(models.Model):
    title = models.CharField(max_length=255)
    image = models.ImageField(upload_to='banners/')
    # لینک به محتوا (Open/Closed Principle)
    linked_course = models.ForeignKey(Course, on_delete=models.SET_NULL, null=True, blank=True)
    linked_package = models.ForeignKey(Package, on_delete=models.SET_NULL, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

