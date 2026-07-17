from django.contrib import admin
from .models import Booking, ContactMessage, Slot, Member, Payment


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ['name', 'facility', 'date', 'time_slot', 'amount', 'payment_status', 'booking_status', 'created_at']
    list_filter = ['facility', 'date', 'payment_status', 'booking_status']
    search_fields = ['name', 'email', 'phone']


@admin.register(ContactMessage)
class ContactAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'created_at']
    search_fields = ['name', 'email']


@admin.register(Slot)
class SlotAdmin(admin.ModelAdmin):
    list_display = ['facility', 'day_type', 'start_time', 'end_time', 'price', 'is_active']
    list_filter = ['facility', 'day_type', 'is_active']


@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    list_display = ['name', 'membership_type', 'start_date', 'end_date', 'status']
    list_filter = ['membership_type', 'status']
    search_fields = ['name', 'phone', 'email']


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ['customer_name', 'amount', 'method', 'status', 'created_at']
    list_filter = ['method', 'status']
    search_fields = ['customer_name', 'transaction_id']
