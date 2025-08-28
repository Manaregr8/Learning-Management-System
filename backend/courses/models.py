from django.db import models
from users.models import CustomUser
from django.core.exceptions import ValidationError

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    
    @property
    def all_lessons(self):
        return Lessons.objects.filter(module__category = self)

    def __str__(self):
        return self.name

class Course(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name = 'course')
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=-0.00)
    duration_weeks = models.IntegerField(default=0)
   
    def __str__(self):
        return f"{self.name} ({self.category.name})"
    
class Enrollment(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    enrolled_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} enrolled in {self.category.name}"

class Batch(models.Model):
    courses = models.ManyToManyField(Course, related_name="batch")
    category = models.ForeignKey(Category,on_delete=models.CASCADE, related_name="batch", null=True)
    name = models.CharField(max_length=100)
    
    def clean(self):
        if not self.pk:
            return
        for course in self.courses.all():
            if course.category != self.category:
                raise ValidationError(
                    f"Course '{course.name}' is not in the same category as the batch '{self.name}'"
                )

    def __str__(self):
        return f"{self.name} of ({self.category.name})"
    
class Lessons(models.Model):
    module = models.ForeignKey(Batch, on_delete=models.CASCADE, related_name="lesson")
    name = models.CharField(max_length=100)
    content = models.TextField()
    video = models.FileField(upload_to="lesson_videos/", blank=True, null=True)

    def __str__(self):
        return f"{self.name} in ({self.module.name})"

