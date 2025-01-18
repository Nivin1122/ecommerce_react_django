from .views import AddProductView,ListProductView
from django.urls import path


urlpatterns = [
    path('add_product/', AddProductView.as_view(), name='add_product'),
    path('list_products/',ListProductView.as_view(), name='list_products'),
]