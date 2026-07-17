from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

User = get_user_model()

import os

DEFAULT_EMAIL = os.environ.get('ADMIN_EMAIL', 'admin@kingsportsclub.in')
DEFAULT_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'Admin@123')


class Command(BaseCommand):
    """
    Creates (or resets the password of) the admin dashboard's staff account.

    Usage:
        python manage.py create_admin
        python manage.py create_admin --email you@example.com --password "SomePass123"
    """

    help = "Create or update the King Sports Club admin dashboard's staff/superuser account."

    def add_arguments(self, parser):
        parser.add_argument('--email', default=DEFAULT_EMAIL)
        parser.add_argument('--password', default=DEFAULT_PASSWORD)

    def handle(self, *args, **options):
        email = options['email']
        password = options['password']

        user, created = User.objects.get_or_create(
            email=email,
            defaults={'is_staff': True, 'is_superuser': True, 'is_active': True},
        )
        user.is_staff = True
        user.is_superuser = True
        user.is_active = True
        user.set_password(password)
        user.save()

        verb = 'Created' if created else 'Updated'
        self.stdout.write(self.style.SUCCESS(f'{verb} admin account: {email}'))
