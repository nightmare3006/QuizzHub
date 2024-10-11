from rest_framework.permissions import BasePermission

class IsOwnerOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True
        # Write permissions are only allowed to the owner of the quiz
        if request.method in ['PUT', 'PATCH', 'DELETE']:
            return obj.owner == request.user
        return True

class IsOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        # Write permissions are only allowed to the owner of the solution
        if request.method in ['DELETE']:
            return obj.owner == request.user
        # Disable modification of objects
        if request.method in ['PUT', 'PATCH']:
            return False
        return True
