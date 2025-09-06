from django.urls import path
from django.contrib.auth import views as auth_views
from .views import SignUpView   
from . import views

# Lista de rotas (URLs) para o app 'usuarios'
urlpatterns = [
    # Página inicial do app de usuários
    path("", views.index, name="index"),
    # Rota para login, usando o template personalizado 'usuarios/login.html'
    path("login/", auth_views.LoginView.as_view(template_name="usuarios/login.html"), name='login'),
    # Rota para logout, redirecionando para a página de login após sair
    path("logout/", auth_views.LogoutView.as_view(next_page='login'), name='logout'),
    # Rota para cadastro de novo usuário, usando a view personalizada SignUpView
    path("signup/", SignUpView.as_view(), name="signup"),
]
