from django.db import models
from django.core.validators import MinValueValidator


class Booking(models.Model):
    FACILITY_CHOICES = [
        ('gym', 'Gym'),
        ('gym_ac', 'Fitness Gym (AC)'),
        ('gym_nonac', 'Fitness Gym (Non-AC)'),
        ('gym_monthly', 'Fitness Gym (Monthly)'),
        ('total_membership', 'Total Membership'),
        ('turf', 'Football Turf'),
        ('turf_weekday', 'Football Turf (Weekday)'),
        ('turf_weekend', 'Football Turf (Weekend)'),
        ('badminton_1', 'Badminton Court 1'),
        ('badminton_2', 'Badminton Court 2'),
        ('badminton_3', 'Badminton Court 3'),
    ]

    PAYMENT_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('paid', 'Paid'),
        ('failed', 'Failed'),
        ('refunded', 'Refunded'),
    ]

    BOOKING_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]

    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    facility = models.CharField(max_length=20, choices=FACILITY_CHOICES)
    date = models.DateField()
    time_slot = models.CharField(max_length=20)
    hours = models.PositiveIntegerField(default=1)
    message = models.TextField(blank=True)

    # ── Admin-dashboard fields ──────────────────────────────────────────
    amount = models.DecimalField(max_digits=9, decimal_places=2, default=0, validators=[MinValueValidator(0)])
    payment_status = models.CharField(max_length=10, choices=PAYMENT_STATUS_CHOICES, default='pending')
    booking_status = models.CharField(max_length=10, choices=BOOKING_STATUS_CHOICES, default='pending')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['date']),
            models.Index(fields=['facility']),
            models.Index(fields=['booking_status']),
            models.Index(fields=['payment_status']),
        ]

    def __str__(self):
        return f"{self.name} - {self.facility} on {self.date}"


class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.created_at.strftime('%Y-%m-%d')}"


class Slot(models.Model):
    """A recurring bookable time-slot template for a facility (timing + price)."""

    FACILITY_CHOICES = Booking.FACILITY_CHOICES

    DAY_CHOICES = [
        ('all', 'Every Day'),
        ('weekday', 'Weekdays'),
        ('weekend', 'Weekends'),
        ('mon', 'Monday'), ('tue', 'Tuesday'), ('wed', 'Wednesday'),
        ('thu', 'Thursday'), ('fri', 'Friday'), ('sat', 'Saturday'), ('sun', 'Sunday'),
    ]

    facility = models.CharField(max_length=20, choices=FACILITY_CHOICES)
    day_type = models.CharField(max_length=10, choices=DAY_CHOICES, default='all')
    start_time = models.TimeField()
    end_time = models.TimeField()
    price = models.DecimalField(max_digits=8, decimal_places=2, validators=[MinValueValidator(0)])
    capacity = models.PositiveIntegerField(default=1, help_text="Number of parallel bookings allowed in this slot")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['facility', 'start_time']

    def __str__(self):
        return f"{self.get_facility_display()} · {self.start_time}-{self.end_time} (₹{self.price})"


class Member(models.Model):
    """A gym membership record."""

    MEMBERSHIP_CHOICES = [
        ('gym_ac', 'Gym AC'),
        ('gym_nonac', 'Gym Non-AC'),
        ('gym_monthly', 'Gym Monthly'),
        ('total_membership', 'Total Membership (All Access)'),
    ]

    STATUS_CHOICES = [
        ('active', 'Active'),
        ('expiring', 'Expiring Soon'),
        ('expired', 'Expired'),
        ('cancelled', 'Cancelled'),
    ]

    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    email = models.EmailField(blank=True)
    membership_type = models.CharField(max_length=20, choices=MEMBERSHIP_CHOICES)
    start_date = models.DateField()
    end_date = models.DateField()
    amount_paid = models.DecimalField(max_digits=9, decimal_places=2, default=0, validators=[MinValueValidator(0)])
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='active')
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} ({self.get_membership_type_display()})"


class Payment(models.Model):
    """Transaction record — linked to a booking and/or a membership payment."""

    METHOD_CHOICES = [
        ('cash', 'Cash'),
        ('upi', 'UPI'),
        ('card', 'Card'),
        ('netbanking', 'Net Banking'),
    ]

    STATUS_CHOICES = [
        ('success', 'Success'),
        ('pending', 'Pending'),
        ('failed', 'Failed'),
        ('refunded', 'Refunded'),
    ]

    booking = models.ForeignKey(Booking, null=True, blank=True, on_delete=models.SET_NULL, related_name='payments')
    member = models.ForeignKey(Member, null=True, blank=True, on_delete=models.SET_NULL, related_name='payments')
    customer_name = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=9, decimal_places=2, validators=[MinValueValidator(0)])
    method = models.CharField(max_length=12, choices=METHOD_CHOICES, default='upi')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='success')
    transaction_id = models.CharField(max_length=64, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.customer_name} - ₹{self.amount} ({self.status})"

