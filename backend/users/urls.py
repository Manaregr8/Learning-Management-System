from django.urls import path
from .views import LoginView, RegisterUserView, CheckUserRoleView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterUserView.as_view(), name='register'),
    path('check-role/', CheckUserRoleView.as_view(), name='check-role'),
]
