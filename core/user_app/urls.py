from django.urls import path
from .views import RegisterView, LoginView, LogoutView, UserSolutionsView, UserQuizView, get_username_by_id
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('my-solutions/', UserSolutionsView.as_view()),
    path('my-quizzes/', UserQuizView.as_view()),
    path('get-username/<int:user_id>/', get_username_by_id, name='get_username_by_id'),
]
