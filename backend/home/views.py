from django.db import DatabaseError
from django.db.models import Avg, Q
from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from courses.models import Course, Package
from courses.serializers import CourseSerializer, PackageListSerializer
from .models import Banner
from .serializers import BannerSerializer, BannerCreateSerializer

# ۱. مشاهده هوم‌پیج (عمومی)
@api_view(['GET'])
@permission_classes([AllowAny])
def home_page_view(request):
    try:
        # استخراج پارامترها
        search_query = request.query_params.get('search', '').strip()
        grade_filter = request.query_params.get('grade', '').strip()

        # واکشی بنرهای تبلیغاتی
        try:
            banners = Banner.objects.filter(is_active=True)
            banners_data = BannerSerializer(banners, many=True, context={'request': request}).data
        except Exception:
            banners_data = []

        # فیلترینگ هوشمند دوره‌ها و پکیج‌ها
        try:
            courses_qs = Course.objects.filter(is_published=True)
            packages_qs = Package.objects.filter(is_published=True)

            if search_query:
                search_condition = (
                    Q(title__icontains=search_query) | 
                    Q(teacher__user__first_name__icontains=search_query) |
                    Q(teacher__user__last_name__icontains=search_query) |
                    Q(subject__icontains=search_query)
                )
                courses_qs = courses_qs.filter(search_condition)
                packages_qs = packages_qs.filter(title__icontains=search_query)

            if grade_filter:
                courses_qs = courses_qs.filter(grade=grade_filter)
                packages_qs = packages_qs.filter(courses__grade=grade_filter).distinct()

        except DatabaseError:
            return Response({'status': 'error', 'message': 'خطا در دسترسی به پایگاه داده'}, status=500)

        # چیدمان بخش‌ها (Sections)
        sections = []

        # بخش پکیج‌ها
        if packages_qs.exists():
            sections.append({
                "section_name": "پکیج‌های پیشنهادی",
                "type": "packages",
                "items": PackageListSerializer(packages_qs[:10], many=True, context={'request': request}).data
            })

        # بخش محبوب‌ترین‌ها
        popular_courses = courses_qs.annotate(avg_r=Avg('ratings__score')).order_by('-avg_r')[:10]
        if popular_courses.exists():
            sections.append({
                "section_name": "محبوب‌ترین دوره‌ها",
                "type": "courses",
                "items": CourseSerializer(popular_courses, many=True, context={'request': request}).data
            })

        # بخش جدیدترین‌ها
        recent_courses = courses_qs.order_by('-created_at')[:10]
        if recent_courses.exists():
            sections.append({
                "section_name": "جدیدترین‌ها",
                "type": "courses",
                "items": CourseSerializer(recent_courses, many=True, context={'request': request}).data
            })

        # بخش‌بندی بر اساس نوع
        for c_type, c_name in [('educational', 'ویدیوهای آموزشی'), ('sample_questions', 'نمونه سوالات')]:
            type_qs = courses_qs.filter(course_type=c_type)[:10]
            if type_qs.exists():
                sections.append({
                    "section_name": c_name,
                    "type": "courses",
                    "items": CourseSerializer(type_qs, many=True, context={'request': request}).data
                })

        return Response({
            "status": "success",
            "data": {
                "banners": banners_data,
                "sections": sections
            }
        }, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({
            "status": "error",
            "message": f"خطای سیستمی غیرمنتظره: {str(e)}"
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# ۲. ایجاد بنر تبلیغاتی جدید
@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def create_banner(request):
    # چک کردن سطح دسترسی
    if request.user.role != 'teacher' and not request.user.is_staff:
        return Response({'status': 'error', 'message': 'عدم دسترسی کافی'}, status=403)

    # استفاده از Serializer برای ولیدیشن
    serializer = BannerCreateSerializer(data=request.data)
    if not serializer.is_valid():
        return Response({'status': 'error', 'errors': serializer.errors}, status=400)

    try:
        data = serializer.validated_data
        course_id = data.get('course_id')
        package_id = data.get('package_id')

        # ساخت شیء بنر
        banner = Banner(
            title=data['title'],
            image=data['image'],
            order=data.get('order', 0)
        )

        # هندل کردن روابط (ForeignKeys)
        if course_id:
            banner.linked_course = Course.objects.get(id=course_id)
        elif package_id:
            banner.linked_package = Package.objects.get(id=package_id)

        banner.save()
        
        return Response({
            'status': 'success',
            'message': 'بنر با موفقیت ساخته شد.',
            'id': banner.id
        }, status=201)

    except Course.DoesNotExist:
        return Response({'status': 'error', 'message': 'دوره مورد نظر یافت نشد.'}, status=404)
    
    except Package.DoesNotExist:
        return Response({'status': 'error', 'message': 'پکیج مورد نظر یافت نشد.'}, status=404)
    
    except DatabaseError:
        return Response({'status': 'error', 'message': 'خطای پایگاه داده در هنگام ذخیره‌سازی'}, status=500)
    
    except Exception as e:
        return Response({'status': 'error', 'message': f'خطای ناشناخته سیستمی: {str(e)}'}, status=500)