from django.contrib import admin
from .models import Banner
@admin.register(Banner)
class BannerAdmin(admin.ModelAdmin):
    list_display = ('title', 'link_type_display', 'is_active', 'order')
    list_editable = ('is_active', 'order')
    list_filter = ('is_active',)
    search_fields = ('title',)

    def link_type_display(self, obj):
        if obj.linked_course:
            return f"دوره: {obj.linked_course.title}"
        if obj.linked_package:
            return f"پکیج: {obj.linked_package.title}"
        return "بدون لینک"
    link_type_display.short_description = "متصل به"
