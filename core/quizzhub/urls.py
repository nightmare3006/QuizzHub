from django.urls import include, path
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register(r'quiz', QuizViewSet)
router.register(r'solution', SolutionViewSet)
router.register(r'Winer', WinnerViewSet)

urlpatterns = [
    path('', include(router.urls)),
]