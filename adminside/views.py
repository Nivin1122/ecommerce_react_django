from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.decorators import login_required

# Create your views here.
class AdminLoginView(APIView):
    permission_classes = []

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        print("hiiiii")
        if not username or not password:
            return Response({'error': 'Username and password are required.'}, status=400)
        
        user = authenticate(username=username,password=password)
        if user and user.is_staff:
            print("user is adminnnnnn")
            refresh = RefreshToken.for_user(user)
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'username': user.username,
                'is_staff': user.is_staff
            })
        return Response({'error': 'Invalid credentials or not an admin.'}, status=401)
    

class AdminDashboardView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        if not request.user.is_staff:
            return Response({
                'error': 'Access denied. Admin privileges required.'
            }, status=403)
        return Response({
            'message': 'Welcome to the admin dashboard!',
            'username': request.user.username
        })