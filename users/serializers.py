from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username','email','password')


    def create(self,validate_data):
        user = User.objects.create_user(**validate_data)
        return user
    
    def validate(self,data):
        data['username'] = data['username'].lower()
        return data