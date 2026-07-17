from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views, admin_views

# ── Admin dashboard router (CRUD viewsets) ──────────────────────────────
admin_router = DefaultRouter()
admin_router.register(r'bookings', admin_views.BookingAdminViewSet, basename='admin-bookings')
admin_router.register(r'slots', admin_views.SlotViewSet, basename='admin-slots')
admin_router.register(r'members', admin_views.MemberViewSet, basename='admin-members')
admin_router.register(r'payments', admin_views.PaymentViewSet, basename='admin-payments')

urlpatterns = [
    # ── Public site endpoints ──
    path('bookings/', views.create_booking, name='create_booking'),
    path('bookings/list/', views.get_bookings, name='get_bookings'),
    path('bookings/slots/', views.get_slot_availability, name='get_slot_availability'),
    path('bookings/load/', views.get_facility_load, name='get_facility_load'),
    path('contact/', views.contact, name='contact'),
    path('facilities/', views.get_facilities, name='get_facilities'),

    # ── Admin dashboard endpoints ──
    path('admin/stats/dashboard/', admin_views.dashboard_stats, name='admin_dashboard_stats'),
    path('admin/stats/reports/', admin_views.reports_analytics, name='admin_reports_analytics'),
    path('admin/', include(admin_router.urls)),
]
