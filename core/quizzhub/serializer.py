from rest_framework import serializers
from .models import *

class QuizSerializer(serializers.ModelSerializer):
    owner = serializers.PrimaryKeyRelatedField(read_only=True)
    
    class Meta:
        model = Quiz
        fields = '__all__'

class SolutionSerializer(serializers.ModelSerializer):
    owner = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Solution
        fields = '__all__'

class WinnerSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='solution.owner.username', read_only=True)
    solution_content = serializers.CharField(source='solution.content', read_only=True)
    
    class Meta:
        model = Winner
        fields = '__all__'