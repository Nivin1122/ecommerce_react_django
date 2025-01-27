from django.urls import path,include
from users.views import SignupView
from django.conf import settings
from django.conf.urls.static import static
from .views import CartViewSet,IncrementCartItemQuantity,DecrementCartItemQuantity,RemoveCartItem

urlpatterns = [
    path('add_to_carts/', CartViewSet.as_view({'post': 'create'}), name='add_to_cart'),
    path('list_carts/',CartViewSet.as_view({'get':'list_cart_items'}), name='list_cart'),
    path('cart/increment/<int:pk>/', IncrementCartItemQuantity.as_view(), name='increment-cart-item'),
    path('cart/decrement/<int:pk>/', DecrementCartItemQuantity.as_view(), name='decrement-cart-item'),
    path('cart/remove/<int:pk>/', RemoveCartItem.as_view(), name='remove-cart-item'),
]