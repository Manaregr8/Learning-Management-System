# backend/users/urls.py
from django.urls import path
from .views_auth import LoginView, RegisterUserView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterUserView.as_view(), name='register'),
]
