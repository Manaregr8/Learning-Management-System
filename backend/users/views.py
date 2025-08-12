from rest_framework import generics, permissions
from rest_framework.generics import RetrieveAPIView
from .models import CustomUser, Role
from .serializers import *
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .permissions import IsAdminUserOnly
# Login View
class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = authenticate(email=serializer.validated_data['email'], password=serializer.validated_data['password'])

        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'role': user.role.name
            })
        return Response({'error': 'Invalid Credentials'}, status=401)

# Admin-only Registration View
class RegisterUserView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [IsAdminUserOnly]

    def perform_create(self, serializer):
        serializer.save()

class UserListView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = SafeUserSerializer
    permission_classes = [IsAdminUserOnly]

class UserDetailView(RetrieveAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = SafeUserSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'username'
