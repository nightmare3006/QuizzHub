from django.urls import include, path
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register(r'quiz', QuizViewSet)
router.register(r'solution', SolutionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('quiz/<int:quiz_id>/set-winner/', create_or_update_winner, name='create_or_update_winner'),
]