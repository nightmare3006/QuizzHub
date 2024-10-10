from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from django.contrib.auth import login, logout
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

from quizzhub.models import Solution, Quiz
from quizzhub.serializer import SolutionSerializer, QuizSerializer
from .serializers import RegisterSerializer, LoginSerializer, UserSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


class LoginView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        login(request, user)
        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "message": "Logged in successfully",
            },
            status=status.HTTP_200_OK,
        )


class LogoutView(APIView):
    def post(self, request, *args, **kwargs):
        logout(request)
        return Response(
            {"message": "Logged out successfully"}, status=status.HTTP_200_OK
        )


class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]


class UserSolutionsView(generics.ListAPIView):
    serializer_class = SolutionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.request.user
        return Solution.objects.filter(owner_id=user_id)
    
class UserQuizView(generics.ListAPIView):
    serializer_class = QuizSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.request.user
        return Quiz.objects.filter(owner_id=user_id).order_by('id')
