from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from .models import *
from .serializers import *
from .permissions import *
import requests

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [isAuthenticatedGetAndAdminPost]

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [isAuthenticatedGetAndAdminPost]

    @action(detail=True, methods=['get'])
    def batches(self, request, pk=None):
        course = self.get_object()
        batches = course.batch.all()
        serializer = BatchSerializer(batches, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def lessons(self, request, pk=None):
        course = self.get_object()
        lessons = Lessons.objects.filter(batch__courses=course)
        serializer = LessonSerializer(lessons, many=True)
        return Response(serializer.data)


# @api_view(['POST'])
# @permission_classes([permissions.IsAuthenticated])
# def get_video_otp(request):
#     video_id = request.data.get("video_id")
#     url = f"https://dev.vdocipher.com/api/videos/{video_id}/otp"
#     payload = {
#         "ttl": 300
#     }
#     headers = {
#         "Authorization": "Apisecret" + " <api-key>", # make an env file and fetch this from there in the production phase.
#         "Content-Type": "application/json"
#     }

#     response = requests.post(url,json=payload, headers=headers)
#     return Response(response.json())
