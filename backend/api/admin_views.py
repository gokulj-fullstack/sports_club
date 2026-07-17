"""
Admin-dashboard API — everything under /api/admin/.

All endpoints here require an authenticated staff user (IsAdminUser), unlike
the public booking endpoints in views.py which stay open (AllowAny) for the
main site's booking form.
"""
import datetime
from decimal import Decimal

from django.db.models import Sum, Count, Q
from django.utils import timezone
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from .models import Booking, Slot, Member, Payment, PricingSetting
from .serializers import (
    BookingAdminSerializer, SlotSerializer, MemberSerializer, PaymentSerializer,
    PricingSettingSerializer,
)

ADMIN_PERMISSIONS = [IsAuthenticated, IsAdminUser]


# ─────────────────────────── ViewSets (CRUD) ────────────────────────────

class BookingAdminViewSet(viewsets.ModelViewSet):
    """
    Full CRUD for bookings, with search + filter query params:
      ?search=name/phone/email
      ?facility=badminton_1
      ?payment_status=paid
      ?booking_status=confirmed
      ?date_from=2026-07-01&date_to=2026-07-31
    """
    queryset = Booking.objects.all().order_by('-created_at')
    serializer_class = BookingAdminSerializer
    permission_classes = ADMIN_PERMISSIONS

    def get_queryset(self):
        qs = super().get_queryset()
        params = self.request.query_params

        search = params.get('search')
        if search:
            qs = qs.filter(
                Q(name__icontains=search) | Q(phone__icontains=search) | Q(email__icontains=search)
            )

        facility = params.get('facility')
        if facility:
            qs = qs.filter(facility=facility)

        payment_status = params.get('payment_status')
        if payment_status:
            qs = qs.filter(payment_status=payment_status)

        booking_status = params.get('booking_status')
        if booking_status:
            qs = qs.filter(booking_status=booking_status)

        date_from = params.get('date_from')
        date_to = params.get('date_to')
        if date_from:
            qs = qs.filter(date__gte=date_from)
        if date_to:
            qs = qs.filter(date__lte=date_to)

        return qs


class SlotViewSet(viewsets.ModelViewSet):
    """CRUD for recurring slot templates (timing + price + enable/disable)."""
    queryset = Slot.objects.all()
    serializer_class = SlotSerializer
    permission_classes = ADMIN_PERMISSIONS

    def get_queryset(self):
        qs = super().get_queryset()
        facility = self.request.query_params.get('facility')
        if facility:
            qs = qs.filter(facility=facility)
        is_active = self.request.query_params.get('is_active')
        if is_active in ('true', 'false'):
            qs = qs.filter(is_active=(is_active == 'true'))
        return qs


class MemberViewSet(viewsets.ModelViewSet):
    """CRUD for gym memberships."""
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    permission_classes = ADMIN_PERMISSIONS

    def get_queryset(self):
        qs = super().get_queryset()
        params = self.request.query_params
        search = params.get('search')
        if search:
            qs = qs.filter(Q(name__icontains=search) | Q(phone__icontains=search) | Q(email__icontains=search))
        status_param = params.get('status')
        if status_param:
            qs = qs.filter(status=status_param)
        membership_type = params.get('membership_type')
        if membership_type:
            qs = qs.filter(membership_type=membership_type)
        return qs


class PaymentViewSet(viewsets.ModelViewSet):
    """Read/write transaction history."""
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = ADMIN_PERMISSIONS

    def get_queryset(self):
        qs = super().get_queryset()
        params = self.request.query_params
        search = params.get('search')
        if search:
            qs = qs.filter(Q(customer_name__icontains=search) | Q(transaction_id__icontains=search))
        status_param = params.get('status')
        if status_param:
            qs = qs.filter(status=status_param)
        method = params.get('method')
        if method:
            qs = qs.filter(method=method)
        return qs


from accounts.models import CustomUser
from accounts.serializers import UserSerializer

class PricingSettingViewSet(viewsets.ModelViewSet):
    """CRUD for global pricing settings (bookings and memberships)."""
    queryset = PricingSetting.objects.all()
    serializer_class = PricingSettingSerializer
    permission_classes = ADMIN_PERMISSIONS

    def get_queryset(self):
        qs = super().get_queryset()
        category = self.request.query_params.get('category')
        if category:
            qs = qs.filter(category=category)
        return qs


class UserAccountViewSet(viewsets.ModelViewSet):
    """CRUD for registered frontend user accounts."""
    queryset = CustomUser.objects.all().order_by('-created_at')
    serializer_class = UserSerializer
    permission_classes = ADMIN_PERMISSIONS

    def get_queryset(self):
        qs = super().get_queryset()
        params = self.request.query_params
        search = params.get('search')
        if search:
            qs = qs.filter(
                Q(email__icontains=search) | Q(first_name__icontains=search) | Q(last_name__icontains=search)
            )
        return qs


# ─────────────────────────── Dashboard stats ────────────────────────────

@api_view(['GET'])
@permission_classes(ADMIN_PERMISSIONS)
def dashboard_stats(request):
    """
    Aggregate numbers for the dashboard's top cards + booking-statistics chart.
    GET /api/admin/stats/dashboard/
    """
    today = timezone.localdate()
    month_start = today.replace(day=1)

    total_bookings = Booking.objects.count()

    today_revenue = Booking.objects.filter(
        date=today, payment_status='paid'
    ).aggregate(total=Sum('amount'))['total'] or Decimal('0')

    monthly_revenue = Booking.objects.filter(
        date__gte=month_start, date__lte=today, payment_status='paid'
    ).aggregate(total=Sum('amount'))['total'] or Decimal('0')

    active_members = Member.objects.filter(status='active').count()

    bookings_by_facility = list(
        Booking.objects.values('facility').annotate(count=Count('id')).order_by('-count')
    )
    bookings_by_status = list(
        Booking.objects.values('booking_status').annotate(count=Count('id')).order_by('-count')
    )

    recent_bookings = Booking.objects.order_by('-created_at')[:8]
    recent_serialized = BookingAdminSerializer(recent_bookings, many=True).data

    return Response({
        'total_bookings': total_bookings,
        'today_revenue': today_revenue,
        'monthly_revenue': monthly_revenue,
        'active_members': active_members,
        'bookings_by_facility': bookings_by_facility,
        'bookings_by_status': bookings_by_status,
        'recent_bookings': recent_serialized,
    })


@api_view(['GET'])
@permission_classes(ADMIN_PERMISSIONS)
def reports_analytics(request):
    """
    Daily (last 30 days), weekly (last 12 weeks) and monthly (last 12 months)
    booking-count + revenue series for the Reports charts.
    GET /api/admin/stats/reports/
    """
    today = timezone.localdate()

    # ── Daily (last 30 days) ──
    daily = []
    for i in range(29, -1, -1):
        day = today - datetime.timedelta(days=i)
        qs = Booking.objects.filter(date=day)
        revenue = qs.filter(payment_status='paid').aggregate(total=Sum('amount'))['total'] or Decimal('0')
        daily.append({'label': day.strftime('%b %d'), 'date': day.isoformat(), 'bookings': qs.count(), 'revenue': revenue})

    # ── Weekly (last 12 weeks) ──
    weekly = []
    for i in range(11, -1, -1):
        week_start = today - datetime.timedelta(days=today.weekday() + i * 7)
        week_end = week_start + datetime.timedelta(days=6)
        qs = Booking.objects.filter(date__gte=week_start, date__lte=week_end)
        revenue = qs.filter(payment_status='paid').aggregate(total=Sum('amount'))['total'] or Decimal('0')
        weekly.append({
            'label': f"{week_start.strftime('%b %d')}",
            'week_start': week_start.isoformat(),
            'bookings': qs.count(),
            'revenue': revenue,
        })

    # ── Monthly (last 12 months) ──
    monthly = []
    year, month = today.year, today.month
    months = []
    for i in range(11, -1, -1):
        m = month - i
        y = year
        while m <= 0:
            m += 12
            y -= 1
        months.append((y, m))
    for (y, m) in months:
        qs = Booking.objects.filter(date__year=y, date__month=m)
        revenue = qs.filter(payment_status='paid').aggregate(total=Sum('amount'))['total'] or Decimal('0')
        monthly.append({
            'label': datetime.date(y, m, 1).strftime('%b %Y'),
            'bookings': qs.count(),
            'revenue': revenue,
        })

    facility_breakdown = list(
        Booking.objects.values('facility').annotate(
            count=Count('id'),
            revenue=Sum('amount', filter=Q(payment_status='paid')),
        ).order_by('-revenue')
    )

    return Response({
        'daily': daily,
        'weekly': weekly,
        'monthly': monthly,
        'facility_breakdown': facility_breakdown,
    })
