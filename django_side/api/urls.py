from django.urls import path
from rest_framework_simplejwt.views import (TokenRefreshView)
from . import views

urlpatterns = [
     path('profile/<int:pk>/', views.ImageUpload.as_view(), name='profile-image-update'),
     path('get-profile-image/<int:pk>/', views.GetImgae.as_view(), name='profile-image-get'),
    path('token/', views.MyTokenObtainPairView.as_view(),name="token-obtain"),
    path('token/refresh/', TokenRefreshView.as_view(), name="refresh-token"),
    path('register/', views.RegisterView.as_view(), name="register-user"),
    path('test/', views.protectedView, name="test"),
    path('', views.view_all_routes, name="all-routes")
    
]