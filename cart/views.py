from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import CartItem
from products.models import Product
from .serializers import CartItemSerializer
from rest_framework.decorators import api_view
from rest_framework.decorators import action
from rest_framework.views import APIView


# Create your views here.
class CartViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = CartItemSerializer

    def get_queryset(self):
        return CartItem.objects.filter(user=self.request.user)
    

    @action(detail=False, methods=['get'])
    def list_cart_items(self, request):
        cart_items = self.get_queryset()
        serializer = CartItemSerializer(cart_items,many=True)
        return Response(serializer.data)


    def create(self, request):
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity', 1)

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

        cart_item, created = CartItem.objects.get_or_create(
            user=request.user, 
            product=product,
            defaults={'quantity': quantity}
        )

        if not created:
            cart_item.quantity += quantity
            cart_item.save()

        serializer = self.get_serializer(cart_item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    


class IncrementCartItemQuantity(APIView):
    """
    Increment the quantity of a cart item.
    """
    def patch(self, request, pk):
        try:
            cart_item = CartItem.objects.get(pk=pk)
            cart_item.quantity += 1
            cart_item.save()

            serializer = CartItemSerializer(cart_item)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except CartItem.DoesNotExist:
            return Response({"error": "Cart item not found"}, status=status.HTTP_404_NOT_FOUND)
        

    
class DecrementCartItemQuantity(APIView):
    """
    Decrement the quantity of a cart item.
    If the quantity becomes 0, delete the item from the cart.
    """
    def patch(self, request, pk):
        try:
            cart_item = CartItem.objects.get(pk=pk)

            if cart_item.quantity > 1:
                cart_item.quantity -= 1
                cart_item.save()

                serializer = CartItemSerializer(cart_item)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                cart_item.delete()
                return Response({"message": "Cart item deleted as quantity reached 0"}, status=status.HTTP_200_OK)

        except CartItem.DoesNotExist:
            return Response({"error": "Cart item not found"}, status=status.HTTP_404_NOT_FOUND)
        

    
class RemoveCartItem(APIView):
    """
    Remove a cart item completely from the cart.
    """
    def delete(self, request, pk):
        try:
            cart_item = CartItem.objects.get(pk=pk)
            cart_item.delete()

            return Response({"message": "Cart item removed successfully"}, status=status.HTTP_200_OK)
        except CartItem.DoesNotExist:
            return Response({"error": "Cart item not found"}, status=status.HTTP_404_NOT_FOUND)