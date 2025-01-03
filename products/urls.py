from .views import AddProductView
from django.urls import path


urlpatterns = [
    path('add_product/', AddProductView.as_view(), name='add_product'),
]