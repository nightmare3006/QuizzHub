from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from .serializer import *
from .permissions import IsOwnerOrReadOnly, IsOwner
from rest_framework import viewsets, status
from .models import *

# Create your views here.

class QuizViewSet(viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_permissions(self):
        if self.action in ['destroy', 'solutions', 'set_winner']:
            self.permission_classes = [IsOwnerOrReadOnly]
        elif self.action == 'create':
            self.permission_classes = [IsAuthenticated]
        else:
            self.permission_classes = [IsAuthenticatedOrReadOnly]
        return super().get_permissions()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(detail=True, methods=['get'], permission_classes=[IsOwnerOrReadOnly])
    def solutions(self, request, pk=None):
        quiz = self.get_object()
        solutions = Solution.objects.filter(quiz=quiz, deleted=False)
        serializer = SolutionSerializer(solutions, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'], permission_classes=[IsAuthenticatedOrReadOnly])
    def winner(self, request, pk=None):
        quiz = self.get_object()
        winner = Winner.objects.filter(quiz=quiz).first()
        print(winner)
        if winner:
            serializer = WinnerSerializer(winner)
            return Response(serializer.data)
        else:
            return Response({'message': 'No winner found for this quiz'}, status=404)

class SolutionViewSet(viewsets.ModelViewSet):
    queryset = Solution.objects.all()
    serializer_class = SolutionSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwner]

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

@api_view(['POST'])
@permission_classes([IsAuthenticated, IsOwnerOrReadOnly])
def create_or_update_winner(request, quiz_id):
    try:
        quiz = Quiz.objects.get(id=quiz_id)
        solution_id = request.data.get('solution')

        if not Solution.objects.filter(id=solution_id, quiz=quiz).exists():
            return Response({'error': 'Invalid solution for this quiz.'}, status=status.HTTP_400_BAD_REQUEST)
        
        winner, created = Winner.objects.update_or_create(
            quiz=quiz,
            defaults={'solution_id': solution_id}
        )
        if created:
            return Response({'message': 'Winner created successfully.'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'Winner updated successfully.'}, status=status.HTTP_200_OK)
    except Quiz.DoesNotExist:
        return Response({'error': 'Quiz not found.'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
