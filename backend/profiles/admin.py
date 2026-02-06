from django.contrib import admin

'''@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('user', 'grade', 'national_id', 'birth_date', 'school_name')
    search_fields = ('user__phone_number', 'user__first_name', 'user__last_name', 'national_id')
    list_filter = ('grade',)

@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    list_display = ('user', 'subject', 'level', 'national_id')
    search_fields = ('user__phone_number', 'user__first_name', 'user__last_name', 'subject')
    list_filter = ('level', 'subject')'''