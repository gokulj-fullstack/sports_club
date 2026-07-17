import urllib.request
import urllib.parse
import base64
import os
import logging
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from .models import Booking, ContactMessage
from .serializers import BookingSerializer, ContactMessageSerializer

logger = logging.getLogger(__name__)


def send_whatsapp_notification(message_text):
    # Option 1: Telegram Bot (100% Free, Instant, Highly Recommended)
    tg_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    tg_chat_id = os.environ.get('TELEGRAM_CHAT_ID')
    
    if tg_token and tg_chat_id:
        encoded_text = urllib.parse.quote(message_text)
        url = f"https://api.telegram.org/bot{tg_token}/sendMessage?chat_id={tg_chat_id}&text={encoded_text}"
        try:
            req = urllib.request.Request(url, method='GET')
            with urllib.request.urlopen(req) as response:
                res_data = response.read().decode('utf-8')
                logger.info("[Telegram Notification Sent]: %s", res_data)
                return
        except Exception as e:
            logger.warning("[Telegram Notification Failed]: %s", e)

    # Option 2: CallMeBot WhatsApp (Free Sandbox)
    callmebot_key = os.environ.get('CALLMEBOT_API_KEY')
    phone_number = os.environ.get('WHATSAPP_TO_NUMBER', '919080703491')
    
    if callmebot_key:
        encoded_text = urllib.parse.quote(message_text)
        url = f"https://api.callmebot.com/whatsapp.php?phone={phone_number}&text={encoded_text}&apikey={callmebot_key}"
        try:
            req = urllib.request.Request(url, method='GET')
            with urllib.request.urlopen(req) as response:
                res_data = response.read().decode('utf-8')
                logger.info("[CallMeBot WhatsApp Notification Sent]: %s", res_data)
                return
        except Exception as e:
            logger.warning("[CallMeBot WhatsApp Notification Failed]: %s", e)

    # Option 3: Twilio WhatsApp
    account_sid = os.environ.get('TWILIO_ACCOUNT_SID')
    auth_token = os.environ.get('TWILIO_AUTH_TOKEN')
    from_number = os.environ.get('TWILIO_WHATSAPP_FROM')
    to_number = os.environ.get('TWILIO_WHATSAPP_TO')
    
    if account_sid and auth_token and from_number and to_number:
        url = f"https://api.twilio.com/2010-04-01/Accounts/{account_sid}/Messages.json"
        data = urllib.parse.urlencode({
            'From': from_number,
            'To': to_number,
            'Body': message_text
        }).encode('utf-8')
        
        auth_str = f"{account_sid}:{auth_token}"
        auth_header = base64.b64encode(auth_str.encode('utf-8')).decode('utf-8')
        
        req = urllib.request.Request(url, data=data, method='POST')
        req.add_header('Authorization', f'Basic {auth_header}')
        req.add_header('Content-Type', 'application/x-www-form-urlencoded')
        
        try:
            with urllib.request.urlopen(req) as response:
                res_data = response.read().decode('utf-8')
                logger.info("[Twilio WhatsApp Notification Sent]: %s", res_data)
                return
        except Exception as e:
            logger.warning("[Twilio WhatsApp Notification Failed]: %s", e)
            
    # Option 4: Console Fallback
    logger.debug("[Notification Fallback]:\n%s", message_text)

@api_view(['POST'])
def create_booking(request):
    serializer = BookingSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        
        # Send WhatsApp Notification to Owner
        data = serializer.data
        name = data.get('name', 'Unknown')
        phone = data.get('phone', 'Not provided')
        facility = data.get('facility', 'Unknown')
        date = data.get('date', '')
        time_slot = data.get('time_slot', '')
        message = data.get('message', 'No message')
        
        whatsapp_body = f"""*New Booking Request*
*Name*: {name}
*Phone*: {phone}
*Facility*: {facility}
*Date*: {date}
*Time Slot*: {time_slot}
*Message*: {message}"""
        send_whatsapp_notification(whatsapp_body)
        
        return Response({'message': 'Booking confirmed!', 'data': serializer.data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_bookings(request):
    bookings = Booking.objects.all().order_by('-created_at')
    serializer = BookingSerializer(bookings, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def contact(request):
    serializer = ContactMessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()

        # Send email notification via Django SMTP (equivalent to Nodemailer)
        data = serializer.data
        name    = data.get('name', 'Unknown')
        email   = data.get('email', '')
        phone   = data.get('phone', 'Not provided')
        message = data.get('message', '')

        subject = f"[King Sports Club] New Contact Message from {name}"
        body = f"""You have received a new contact form submission on King Sports Club.

Name    : {name}
Email   : {email}
Phone   : {phone}
Message :
{message}

---
Sent via King Sports Club website contact form.
"""
        try:
            send_mail(
                subject=subject,
                message=body,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.CONTACT_EMAIL],
                fail_silently=False,
            )
        except Exception as e:
            # Log the error but don't fail the API response — message is saved to DB
            import logging
            logger = logging.getLogger(__name__)
            logger.error(f"Contact email send failed: {e}")

        # Send WhatsApp Notification to Owner
        whatsapp_body = f"""*New Contact Submission*
*Name*: {name}
*Email*: {email}
*Phone*: {phone}
*Message*: {message}"""
        send_whatsapp_notification(whatsapp_body)

        return Response({'message': 'Message sent successfully!'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_facilities(request):
    facilities = [
        {
            "id": "gym",
            "name": "Fitness Gym",
            "description": "State-of-the-art equipment with certified personal trainers. Choose between AC or Non-AC facilities.",
            "price": "AC: ₹6000/yr | Non-AC: ₹4500/yr",
            "hours": "5:00 AM - 10:00 PM",
            "features": ["Cardio & Strength Machines", "AC & Non-AC Gym Access", "Personal Training Available", "Towel Service"]
        },
        {
            "id": "turf",
            "name": "Football Turf",
            "description": "Professional synthetic turf for football & cricket. Perfect for tournaments, practice, and casual matches.",
            "price": "₹700 (Weekdays) / ₹1000 (Weekends)",
            "hours": "6:00 AM - 11:00 PM",
            "features": ["FIFA Quality Turf", "Floodlights", "Changing Rooms", "Score Board"]
        },
        {
            "id": "badminton",
            "name": "Badminton Courts",
            "description": "Three professional badminton courts - One old court and two new courts with wooden sprung flooring. Ideal for club play, coaching, and tournaments.",
            "price": "₹300/hour",
            "hours": "5:00 AM - 11:00 PM",
            "features": ["1 Old Court", "2 New Courts", "Wooden Flooring", "Professional Nets", "Equipment Rental"]
        }
    ]
    return Response(facilities)

@api_view(['GET'])
def get_slot_availability(request):
    """
    Returns ALL time_slots blocked for a given facility + date,
    accounting for multi-hour bookings (e.g. 2 hrs blocks start + next hour).
    Query params: facility=badminton_1&date=2024-07-01
    """
    import datetime

    ALL_SLOTS = [
        '5:00 AM','6:00 AM','7:00 AM','8:00 AM','9:00 AM','10:00 AM','11:00 AM',
        '12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM',
        '7:00 PM','8:00 PM','9:00 PM','10:00 PM',
    ]

    def slot_index(slot_str):
        """Return the index of the slot in ALL_SLOTS, or -1 if not found."""
        try:
            return ALL_SLOTS.index(slot_str)
        except ValueError:
            return -1

    facility = request.query_params.get('facility')
    date = request.query_params.get('date')
    if not facility or not date:
        return Response({'error': 'facility and date are required'}, status=status.HTTP_400_BAD_REQUEST)

    bookings = Booking.objects.filter(facility=facility, date=date).values('time_slot', 'hours')

    blocked = set()
    for b in bookings:
        start_idx = slot_index(b['time_slot'])
        if start_idx == -1:
            continue
        num_hours = max(1, b.get('hours') or 1)
        for i in range(num_hours):
            idx = start_idx + i
            if idx < len(ALL_SLOTS):
                blocked.add(ALL_SLOTS[idx])

    return Response({'booked_slots': sorted(blocked, key=lambda s: slot_index(s))})

@api_view(['GET'])
def get_facility_load(request):
    """
    Returns today's booking counts per facility group for the hero banner status indicator.
    """
    from django.utils import timezone
    import datetime
    today = timezone.localdate()
    total_slots = 18  # 5AM to 10PM = 18 slots

    gym_count = Booking.objects.filter(
        date=today, facility__in=['gym', 'gym_ac', 'gym_nonac', 'gym_monthly', 'total_membership']
    ).count()
    turf_count = Booking.objects.filter(
        date=today, facility__in=['turf', 'turf_weekday', 'turf_weekend']
    ).count()
    badminton_count = Booking.objects.filter(
        date=today, facility__in=['badminton_1', 'badminton_2', 'badminton_3']
    ).count()

    def load_status(count, capacity):
        ratio = count / capacity if capacity else 0
        if ratio >= 0.8:
            return 'FULL'
        elif ratio >= 0.4:
            return 'BUSY'
        else:
            return 'OPEN'

    return Response({
        'gym': {
            'count': gym_count,
            'status': load_status(gym_count, total_slots),
        },
        'turf': {
            'count': turf_count,
            'status': load_status(turf_count, total_slots),
        },
        'badminton': {
            'count': badminton_count,
            'status': load_status(badminton_count, total_slots * 3),  # 3 courts
        },
    })
