from django.contrib import admin
from .models import CustomUser, Role
from  django.contrib.auth.admin import UserAdmin as BaseUserAdmin

class CustomUserAdmin(BaseUserAdmin):
    model = CustomUser
    list_display = ('email', 'username', 'role', 'is_staff', 'is_superuser')
    list_filter = ('role', 'is_active', 'is_staff')
    search_fields = ('email', 'username')
    ordering = ('email',)
    
    fieldsets = (
        (None, {'fields': ('email', 'username', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_superuser', 'role')})
    )

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Role)
