from django.urls import path
from . import views

urlpatterns = [
    path('api/dashboard/', views.user_dashboard, name='main_dashboard'),
]