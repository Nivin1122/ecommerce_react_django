from django.urls import path, include
from .views import AdminDashboardView,AdminLoginView,list_users

urlpatterns = [
    path('ad_login/',AdminLoginView.as_view(),name='admin_login'),
    path('dashboard/',AdminDashboardView.as_view(),name='admin_dashboard'),
    path('ad/users/',list_users, name='list_users')
]