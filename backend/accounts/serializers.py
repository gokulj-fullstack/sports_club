from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from .models import CustomUser

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """Serializer for user details"""

    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'first_name', 'last_name', 'is_staff', 'is_superuser', 'is_email_verified', 'created_at']
        read_only_fields = ['id', 'created_at']


class UserRegisterSerializer(serializers.ModelSerializer):
    """Serializer for user registration"""
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CustomUser
        fields = ['email', 'password', 'password2', 'first_name', 'last_name']

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({'password': 'Password fields didn\'t match.'})
        
        if CustomUser.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError({'email': 'Email already registered.'})
        
        return data

    def create(self, validated_data):
        validated_data.pop('password2')
        password = validated_data.pop('password')
        user = CustomUser(**validated_data)
        user.set_password(password)
        user.save()
        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Custom JWT token serializer"""

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['full_name'] = user.get_full_name()
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data['user_id'] = self.user.id
        data['email'] = self.user.email
        return data


class TokenSerializer(serializers.Serializer):
    """Serializer for token response"""
    access = serializers.CharField()
    refresh = serializers.CharField()
    user = UserSerializer(read_only=True)


class LoginSerializer(serializers.Serializer):
    """Serializer for login endpoint"""
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})

    def validate(self, data):
        from django.contrib.auth import authenticate
        
        user = authenticate(
            username=data.get('email'),
            password=data.get('password')
        )
        
        if not user:
            raise serializers.ValidationError('Invalid email or password.')
        
        data['user'] = user
        return data


class ChangePasswordSerializer(serializers.Serializer):
    """Serializer for changing password"""
    old_password = serializers.CharField(write_only=True, style={'input_type': 'password'})
    new_password = serializers.CharField(write_only=True, validators=[validate_password], style={'input_type': 'password'})
    new_password2 = serializers.CharField(write_only=True, style={'input_type': 'password'})

    def validate(self, data):
        if data['new_password'] != data['new_password2']:
            raise serializers.ValidationError({'new_password': 'Password fields didn\'t match.'})
        return data

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError('Old password is not correct.')
        return value

    def save(self):
        user = self.context['request'].user
        user.set_password(self.validated_data['new_password'])
        user.save()
        return user