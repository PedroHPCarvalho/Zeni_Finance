from django.urls import path
from .views import RegisterView, LoginView, CreateWithN8NView

urlpatterns = [
    path("auth/register", RegisterView.as_view(), name="register"),
    path("auth/login", LoginView.as_view(), name="login"),
    path("createN8N/", CreateWithN8NView.as_view(), name="create-for-n8n")
]