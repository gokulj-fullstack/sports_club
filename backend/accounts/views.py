from rest_framework import status, viewsets
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, get_user_model
from django.views.decorators.http import require_http_methods
import json

from .serializers import (
    UserSerializer,
    UserRegisterSerializer,
    LoginSerializer,
    ChangePasswordSerializer,
    CustomTokenObtainPairSerializer,
)
from .models import LoginLog

User = get_user_model()


class CustomTokenObtainPairView(TokenObtainPairView):
    """Custom JWT token obtain view"""
    serializer_class = CustomTokenObtainPairSerializer


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    """
    User login endpoint
    POST /api/login/
    """
    serializer = LoginSerializer(data=request.data)
    
    if serializer.is_valid():
        user = serializer.validated_data['user']
        
        # Generate tokens
        refresh = RefreshToken.for_user(user)
        
        # Log the login
        client_ip = get_client_ip(request)
        user_agent = request.META.get('HTTP_USER_AGENT', '')
        LoginLog.objects.create(
            user=user,
            ip_address=client_ip,
            user_agent=user_agent,
            is_successful=True
        )
        
        # Update last login IP
        user.last_login_ip = client_ip
        user.save()
        
        response_data = {
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'user': UserSerializer(user).data,
            'message': 'Login successful'
        }
        
        return Response(response_data, status=status.HTTP_200_OK)
    
    return Response(
        {'detail': serializer.errors.get('non_field_errors', ['Invalid credentials'])[0]},
        status=status.HTTP_401_UNAUTHORIZED
    )


@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    """
    User registration endpoint
    POST /api/register/
    """
    serializer = UserRegisterSerializer(data=request.data)
    
    if serializer.is_valid():
        user = serializer.save()
        
        refresh = RefreshToken.for_user(user)
        
        response_data = {
            'user': UserSerializer(user).data,
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'message': 'Account created successfully'
        }
        
        return Response(response_data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_profile_view(request):
    """
    Get current user profile
    GET /api/profile/
    """
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def update_profile_view(request):
    """
    Update user profile
    PUT/PATCH /api/profile/update/
    """
    user = request.user
    data = request.data
    
    # Only allow updating specific fields
    if 'first_name' in data:
        user.first_name = data['first_name']
    if 'last_name' in data:
        user.last_name = data['last_name']
    
    user.save()
    serializer = UserSerializer(user)
    return Response(
        {'message': 'Profile updated successfully', 'user': serializer.data},
        status=status.HTTP_200_OK
    )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password_view(request):
    """
    Change user password
    POST /api/change-password/
    """
    serializer = ChangePasswordSerializer(
        data=request.data,
        context={'request': request}
    )
    
    if serializer.is_valid():
        serializer.save()
        return Response(
            {'message': 'Password changed successfully'},
            status=status.HTTP_200_OK
        )
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    """
    User logout endpoint
    POST /api/logout/
    """
    try:
        refresh_token = request.data.get('refresh')
        if refresh_token:
            from rest_framework_simplejwt.tokens import RefreshToken
            token = RefreshToken(refresh_token)
            token.blacklist()
        
        return Response(
            {'message': 'Logout successful'},
            status=status.HTTP_200_OK
        )
    except Exception as e:
        return Response(
            {'detail': 'Logout failed'},
            status=status.HTTP_400_BAD_REQUEST
        )


@api_view(['GET'])
def health_check(request):
    """
    Health check endpoint
    GET /api/health/
    """
    return Response({
        'status': 'ok',
        'message': 'AuthCore API is running',
        'version': '1.0.0'
    }, status=status.HTTP_200_OK)


def get_client_ip(request):
    """
    Get client IP address from request
    """
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip