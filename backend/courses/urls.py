from django.urls import path
from . import views

urlpatterns = [
    # --- مسیرهای مربوط به دوره‌ها (بدون تغییر) ---
    
    # لیست تمام دوره‌های موجود در سایت (برای صفحه فروشگاه یا جستجو)
    path('api/all-courses/', views.all_courses_list, name='all_courses_list'),
    
    # دوره‌های خریداری شده یا ثبت‌نام شده (پنل دانش‌آموز/کاربر)
    path('api/my-enrolled-courses/', views.enrolled_courses_list, name='enrolled_courses_list'),
    
    # دوره‌های ایجاد شده توسط خود کاربر (پنل معلم)
    path('api/my-created-courses/', views.created_courses_list, name='created_courses_list'),
    
    # جزئیات کامل یک دوره شامل لیست ویدیوها
    path('api/my-courses/<int:pk>/', views.my_course_detail, name='my_course_detail'),
    
    # ثبت‌نام در یک دوره و اضافه کردن آن به لیست "enrolled_courses"
    path('api/courses/<int:course_id>/enroll/', views.enroll_in_course, name='enroll_in_course'),
    
    # ایجاد دوره جدید (مخصوص معلم)
    path('api/create-course/', views.create_course, name='create_course'),
    
    # ویرایش (PUT) یا حذف کامل (DELETE) یک دوره
    path('api/courses/<int:pk>/manage/', views.manage_course, name='manage_course'),
    
    # افزودن ویدیو جدید به انتهای یک دوره
    path('api/courses/<int:course_id>/add-video/', views.add_video, name='add_video'),
    
    # ویرایش یا حذف یک ویدیو خاص بر اساس "شماره جلسه"
    path('api/courses/<int:course_id>/videos/<int:order_num>/', views.manage_video_by_order, name='manage_video_by_order'),
    
    # جابه‌جایی هوشمند ترتیب ویدیوها (Drag & Drop)
    path('api/courses/<int:course_id>/move-video/', views.move_video_by_order, name='move_video_by_order'),


   # --- مسیرهای جدید مربوط به پکیج‌ها (Packages) ---
    
    # لیست تمام پکیج‌های موجود (برای فروشگاه)
    path('api/all-packages/', views.all_packages_list, name='all_packages_list'),

    # لیست پکیج‌ها برای صفحه‌ی اصلی/لندینگ (بدون نیاز به لاگین)
    path('api/public/packages/', views.public_packages_list, name='public_packages_list'),

    # ایجاد پکیج جدید (مخصوص معلم)
    path('api/packages/create/', views.create_package, name='create_package'),

    # مشاهده جزئیات کامل یک پکیج
    path('api/packages/<int:pk>/', views.package_detail, name='package_detail'),

    # این همان خطی است که کم داشتید:
    path('api/packages/<int:package_id>/enroll/', views.enroll_in_package, name='enroll_in_package'),

    # شروع پرداخت برای یه پکیج پولی (برمی‌گردونه لینک درگاه زرین‌پال)
    path('api/packages/<int:package_id>/purchase/', views.purchase_package, name='purchase_package'),

    # کال‌بک زرین‌پال بعد از پرداخت (مرورگر کاربر مستقیم بهش ریدایرکت می‌شه)
    path('api/payment/verify/', views.verify_zarinpal_payment, name='verify_zarinpal_payment'),

    # لیست پکیج‌های من (خریداری شده یا ساخته شده)
    path('api/packages/my-list/', views.user_packages_list, name='user_packages_list'),
    
    #امتیاز دادن
    path('api/courses/<int:course_id>/rate/', views.rate_course, name='rate_course'),
    
    ]