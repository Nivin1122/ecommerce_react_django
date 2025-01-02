from django.urls import path, include
from .views import AdminDashboardView,AdminLoginView

urlpatterns = [
    path('ad_login/',AdminLoginView.as_view(),name='admin_login'),
    path('dashboard/',AdminDashboardView.as_view(),name='admin_dashboard')
]