from django.urls import path
from . import views

urlpatterns = [
    path('api/check-user/', views.check_user_view, name='check_user'),
    path('api/verify-otp/', views.verify_otp_view, name='verify_otp'),
    path('api/verify-password/', views.verify_password_view, name='verify_password'),
    path('api/resend-otp/', views.resend_otp_view, name='resend_otp'),
    path('api/signup/', views.signup, name='signup'),
    path('api/set-password/', views.set_static_password_view, name='set_password'),
    path('api/me/', views.me_view, name='me'),
]