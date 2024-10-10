from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from .serializer import *
from rest_framework import viewsets, status
from .models import *

# Create your views here.
class QuizViewSet(viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    permission_classes = [IsAuthenticatedOrReadOnly ]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class SolutionViewSet(viewsets.ModelViewSet):
    queryset = Solution.objects.all()
    serializer_class = SolutionSerializer

    def perform_create(self, serializer):
        quiz_id = self.request.data.get('quiz')
        quiz = Quiz.objects.get(id=quiz_id)
        existing_solution = Solution.objects.filter(quiz=quiz, owner=self.request.user)
        if existing_solution:
            raise serializers.ValidationError('You have already posted a solution for this quiz')
        serializer.save(owner=self.request.user)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.deleted = True
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

class WinnerViewSet(viewsets.ModelViewSet):
    queryset = Winner.objects.all()
    serializer_class = WinnerSerializer