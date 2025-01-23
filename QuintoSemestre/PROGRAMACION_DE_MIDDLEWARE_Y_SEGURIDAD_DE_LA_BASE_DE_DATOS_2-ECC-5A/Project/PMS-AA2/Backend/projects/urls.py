from rest_framework import routers
from .api import ProjectViewSet

routers = routers.DefaultRouter()

routers.register('api/users', ProjectViewSet, 'users')

urlpatterns = routers.urls