from rest_framework.permissions import BasePermission, SAFE_METHODS

class isAuthenticatedGetAndAdminPost(BasePermission):
    def has_permission(self, request, view):
        user = request.user

        # Superuser can do anything
        if user.is_authenticated and user.is_superuser:
            return True

        # Allow authenticated users to GET
        if request.method in SAFE_METHODS:
            return user.is_authenticated

        # Allow staff or trainers for unsafe methods
        if user.is_authenticated:
            role_name = getattr(getattr(user, 'role', None), 'name', '').lower()
            return user.is_staff or role_name == 'trainer'

        # Default deny
        return False
