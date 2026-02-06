from django.urls import path
from . import views

urlpatterns = [
    path('api/profile/', views.profile_api_view, name='user_profile'),
]