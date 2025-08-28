from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import *
from .serializers import *
from .permissions import *

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
        modules = course.module.all()
        serializer = BatchSerializer(modules, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def lessons(self, request, pk=None):
        course = self.get_object()
        lessons = Lessons.objects.filter(module__courses=course)
        serializer = LessonSerializer(lessons, many=True)
        return Response(serializer.data)


