from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from accounts.views import (
    login_view,
    register_view,
    user_profile_view,
    update_profile_view,
    change_password_view,
    logout_view,
    health_check,
    CustomTokenObtainPairView,
)

# Authentication & account API endpoints
urlpatterns = [
    # Health check
    path('health/', health_check, name='health_check'),

    # Authentication endpoints
    path('login/', login_view, name='login'),
    path('register/', register_view, name='register'),
    path('logout/', logout_view, name='logout'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # User profile endpoints
    path('profile/', user_profile_view, name='profile'),
    path('profile/update/', update_profile_view, name='update_profile'),
    path('change-password/', change_password_view, name='change_password'),
]
