from rest_framework import serializers
from .models import *

class LessonSerializer(serializers.ModelSerializer):
    # video = serializers.FileField(use_url=True)
    class Meta:
        model = Lessons
        fields = ['id', 'batch', 'name', 'content']


class BatchSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True, read_only=True)
    courses = serializers.PrimaryKeyRelatedField(many=True, queryset = Course.objects.all())

    class Meta:
        model = Batch
        fields = ['id', 'name', 'category', 'courses', 'lessons']

class CourseSerializer(serializers.ModelSerializer):
    modules = BatchSerializer(many=True, read_only=True)

    class Meta:
        model = Course
        fields = ['id', 'name', 'category', 'price', 'duration_weeks', 'description', 'modules']

class CategorySerializer(serializers.ModelSerializer):
    courses = CourseSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'description','courses']

class EnrollmentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset = Category.objects.all(),
        source = 'course',
        write_only = True
    ) 

    class Meta:
        model = Enrollment
        fields = ['id', 'user', 'category', 'category_id', 'enrolled_at']

    
