from django.urls import path,include
from users.views import SignupView
from django.conf import settings
from django.conf.urls.static import static
from .views import CartViewSet

urlpatterns = [
    path('add_to_carts/', CartViewSet.as_view({'post': 'create'}), name='add_to_cart'),
    path('list_carts/',CartViewSet.as_view({'get':'list_cart_items'}), name='list_cart')
]