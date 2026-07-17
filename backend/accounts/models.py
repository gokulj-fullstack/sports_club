from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils import timezone

class CustomUserManager(BaseUserManager):
    """Custom user manager for email-based authentication"""

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractUser):
    """Custom user model with email-based authentication"""
    email = models.EmailField(unique=True, max_length=255)
    username = models.CharField(max_length=150, unique=False, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_login_ip = models.GenericIPAddressField(null=True, blank=True)
    is_email_verified = models.BooleanField(default=False)
    profile_picture = models.ImageField(upload_to='profiles/', null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    class Meta:
        db_table = 'custom_users'
        verbose_name = 'User'
        verbose_name_plural = 'Users'
        ordering = ['-created_at']

    def __str__(self):
        return self.email

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}".strip() or self.email


class LoginLog(models.Model):
    """Model to track login activities"""
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='login_logs')
    ip_address = models.GenericIPAddressField()
    user_agent = models.TextField(blank=True)
    login_time = models.DateTimeField(auto_now_add=True)
    logout_time = models.DateTimeField(null=True, blank=True)
    is_successful = models.BooleanField(default=True)

    class Meta:
        db_table = 'login_logs'
        ordering = ['-login_time']

    def __str__(self):
        return f"{self.user.email} - {self.login_time}"


class PasswordReset(models.Model):
    """Model for password reset requests"""
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    token = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    is_used = models.BooleanField(default=False)

    class Meta:
        db_table = 'password_resets'
        ordering = ['-created_at']

    def is_valid(self):
        return not self.is_used and timezone.now() < self.expires_at

    def __str__(self):
        return f"Reset for {self.user.email}"