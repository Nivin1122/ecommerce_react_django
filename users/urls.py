from django.urls import path
from .views import SignupView,ProtectedDataView,LoginView
from rest_framework_simplejwt.views import (TokenObtainPairView,TokenRefreshView)
from .views import BlockUnblockUserView

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('protected-data/', ProtectedDataView.as_view(), name='protected_data'),
    path('login/',LoginView.as_view(), name='login'),
    path('admin/block_unblock_user/',BlockUnblockUserView.as_view(),name='block_unblock_user')
]
