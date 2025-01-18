from django.shortcuts import render
from rest_framework import viewsets
from .models import Product
from .serializers import ProductSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from .models import Product
from rest_framework import status

# Create your views here.
class AddProductView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self,request):
        if not request.user.is_staff:
            return Response({'error': 'Unauthorized access'}, status=403)
        
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Product added successfully'}, status=201)
        return Response(serializer.errors, status=400)



class ListProductView(APIView):

    permission_classes = []
    def get(self,request):
        try:
            all_products = Product.objects.all()
            serializer = ProductSerializer(all_products, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )