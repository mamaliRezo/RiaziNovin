from django.core.mail import send_mail
from django.conf import settings
import requests
import logging

# 📝 لاگ‌گیری
logger = logging.getLogger(__name__)


def send_email(to_email, subject, message):
    """
    📨 ارسال ایمیل با استفاده از سرویس SMTP جنگو

    📥 پارامترها:
    - to_email: ایمیل دریافت کننده
    - subject: موضوع ایمیل
    - message: متن ایمیل
    """
    try:
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[to_email],
            fail_silently=False,  # ❌ اگر خطا داشت، بنداز خطا
        )
        logger.info(f"📧 ایمیل با موفقیت ارسال شد به: {to_email}")
        return True

    except Exception as e:
        logger.error(f"❌ خطا در ارسال ایمیل به {to_email}: {str(e)}")
        return False


def send_sms(phone_number, message):
    """
    📱 ارسال SMS با استفاده از سرویس کاوه نگار

    📥 پارامترها:
    - phone_number: شماره موبایل
    - message: متن پیامک
    """
    try:
        # 🎯 در حالت واقعی، این قسمت با سرویس SMS پر میشه
        # مثال برای کاوه نگار:

        # api_key = settings.SMS_API_KEY
        # url = f"https://api.kavenegar.com/v1/{api_key}/sms/send.json"
        #
        # data = {
        #     'receptor': phone_number,
        #     'message': message,
        #     'sender': settings.SMS_SENDER
        # }
        #
        # response = requests.post(url, data=data)
        # return response.status_code == 200

        # 🚨 فعلاً برای توسعه، فقط لاگ می‌کنیم
        logger.info(f"📱 SMS به {phone_number}: {message}")
        print(f"📱 SMS به {phone_number}: {message}")  # برای نمایش در کنسول

        return True

    except Exception as e:
        logger.error(f"❌ خطا در ارسال SMS به {phone_number}: {str(e)}")
        return False


def generate_otp_code(length=5):
    """
    🔢 تولید کد OTP تصادفی

    📥 پارامترها:
    - length: طول کد (پیشفرض: ۶)
    """
    import random
    import string

    return ''.join(random.choices(string.digits, k=length))


def validate_phone_number(phone):
    """
    📞 اعتبارسنجی شماره تلفن ایرانی

    📥 پارامترها:
    - phone: شماره تلفن
    """
    import re

    # الگوی شماره تلفن ایرانی
    pattern = r'^09[0-9]{9}$'
    return bool(re.match(pattern, phone))


def validate_email(email):
    """
    📧 اعتبارسنجی ایمیل

    📥 پارامترها:
    - email: آدرس ایمیل
    """
    import re

    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))
