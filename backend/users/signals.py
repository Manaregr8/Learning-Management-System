from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from .models import CustomUser

@receiver(post_save, sender=CustomUser)
def send_welcome_mail(sender, instance, created, **kwargs):
    if created:
        send_mail(
            subject="Welcome to Our LMS",
            message=f"Hi, {instance.username}, thanks for registering!",
            from_email=None,
            recipient_list=[instance.email],
            fail_silently=False,
        )