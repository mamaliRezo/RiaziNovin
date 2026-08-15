"""
اتصال به درگاه پرداخت زرین‌پال.

برای تست بدون داشتن merchant ID واقعی، زرین‌پال یه محیط sandbox داره که
همیشه پرداخت رو موفق نشون می‌ده. برای فعال کردنش تو backend/.env بذار:
    ZARINPAL_SANDBOX=True
    ZARINPAL_MERCHANT_ID=00000000-0000-0000-0000-000000000000

وقتی آماده‌ی گرفتن پول واقعی شدی، یه merchant ID واقعی از zarinpal.com
بگیر، تو .env بذار، و ZARINPAL_SANDBOX=False کن.
"""
import os
import requests

SANDBOX = os.environ.get('ZARINPAL_SANDBOX', 'True') == 'True'
MERCHANT_ID = os.environ.get(
    'ZARINPAL_MERCHANT_ID', '00000000-0000-0000-0000-000000000000'
)

_BASE = 'https://sandbox.zarinpal.com' if SANDBOX else 'https://payment.zarinpal.com'
_API_BASE = 'https://sandbox.zarinpal.com' if SANDBOX else 'https://api.zarinpal.com'

REQUEST_URL = f'{_API_BASE}/pg/v4/payment/request.json'
VERIFY_URL = f'{_API_BASE}/pg/v4/payment/verify.json'
STARTPAY_URL = f'{_BASE}/pg/StartPay/'


def request_payment(amount, description, callback_url, mobile=None):
    """
    یه تراکنش جدید تو زرین‌پال می‌سازه.
    برمی‌گردونه: (ok: bool, authority_or_error: str)
    """
    payload = {
        'merchant_id': MERCHANT_ID,
        'amount': amount,  # به تومان؛ زرین‌پال v4 هم تومان قبول می‌کنه
        'description': description,
        'callback_url': callback_url,
    }
    if mobile:
        payload['metadata'] = {'mobile': mobile}

    try:
        res = requests.post(REQUEST_URL, json=payload, timeout=10)
        data = res.json()
    except (requests.RequestException, ValueError) as e:
        return False, str(e)

    result = data.get('data', {})
    if result.get('code') == 100:
        return True, result['authority']

    errors = data.get('errors', {})
    return False, errors.get('message', 'خطای نامشخص از درگاه پرداخت')


def get_startpay_url(authority):
    return f'{STARTPAY_URL}{authority}'


def verify_payment(amount, authority):
    """
    برمی‌گردونه: (ok: bool, ref_id_or_error: str)
    """
    payload = {
        'merchant_id': MERCHANT_ID,
        'amount': amount,
        'authority': authority,
    }
    try:
        res = requests.post(VERIFY_URL, json=payload, timeout=10)
        data = res.json()
    except (requests.RequestException, ValueError) as e:
        return False, str(e)

    result = data.get('data', {})
    # کد 100 یعنی پرداخت تازه تأیید شد؛ 101 یعنی قبلاً تأیید شده بود (idempotent)
    if result.get('code') in (100, 101):
        return True, result.get('ref_id')

    errors = data.get('errors', {})
    return False, errors.get('message', 'تأیید پرداخت ناموفق بود')
