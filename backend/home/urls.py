from django.urls import path
from . import views

urlpatterns = [
    path('api/home/', views.home_page_view, name='home_page'),
    path('api/home/banners/create/', views.create_banner, name='create_banner'),
    ]
