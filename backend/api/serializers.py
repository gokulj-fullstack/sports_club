from rest_framework import serializers
from .models import Booking, ContactMessage, Slot, Member, Payment


class BookingSerializer(serializers.ModelSerializer):
    """Public-facing serializer used by the booking form on the main site."""

    class Meta:
        model = Booking
        fields = '__all__'
        read_only_fields = ['amount', 'payment_status', 'booking_status']


class BookingAdminSerializer(serializers.ModelSerializer):
    """Full read/write serializer for the admin dashboard's Bookings page."""

    facility_display = serializers.CharField(source='get_facility_display', read_only=True)
    payment_status_display = serializers.CharField(source='get_payment_status_display', read_only=True)
    booking_status_display = serializers.CharField(source='get_booking_status_display', read_only=True)

    class Meta:
        model = Booking
        fields = [
            'id', 'name', 'email', 'phone', 'facility', 'facility_display',
            'date', 'time_slot', 'hours', 'message', 'amount',
            'payment_status', 'payment_status_display',
            'booking_status', 'booking_status_display',
            'created_at', 'updated_at',
        ]


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'


class SlotSerializer(serializers.ModelSerializer):
    facility_display = serializers.CharField(source='get_facility_display', read_only=True)
    day_type_display = serializers.CharField(source='get_day_type_display', read_only=True)

    class Meta:
        model = Slot
        fields = [
            'id', 'facility', 'facility_display', 'day_type', 'day_type_display',
            'start_time', 'end_time', 'price', 'capacity', 'is_active',
            'created_at', 'updated_at',
        ]

    def validate(self, data):
        start = data.get('start_time', getattr(self.instance, 'start_time', None))
        end = data.get('end_time', getattr(self.instance, 'end_time', None))
        if start and end and start >= end:
            raise serializers.ValidationError('end_time must be after start_time.')
        return data


class MemberSerializer(serializers.ModelSerializer):
    membership_type_display = serializers.CharField(source='get_membership_type_display', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = Member
        fields = [
            'id', 'name', 'phone', 'email', 'membership_type', 'membership_type_display',
            'start_date', 'end_date', 'amount_paid', 'status', 'status_display',
            'notes', 'created_at', 'updated_at',
        ]


class PaymentSerializer(serializers.ModelSerializer):
    method_display = serializers.CharField(source='get_method_display', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = Payment
        fields = [
            'id', 'booking', 'member', 'customer_name', 'amount', 'method',
            'method_display', 'status', 'status_display', 'transaction_id', 'created_at',
        ]
