from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login
from django.urls import reverse_lazy
from django.views.generic import CreateView
from django.shortcuts import render, redirect
from .forms import CustomUserCreationForm

# View baseada em classe para cadastro de novo usuário
class SignUpView(CreateView):
    form_class = CustomUserCreationForm  # Usa o formulário customizado com campo de e-mail obrigatório
    template_name = "usuarios/signup.html"  # Template usado para exibir o formulário de cadastro
    success_url = reverse_lazy("login")  # Redireciona para a página de login após cadastro bem-sucedido


# View para a página inicial do app de usuários
def index(request):
    # Redireciona automaticamente para a página de login
    return redirect("login") # 'login' é o nome da rota para onde você quer redirecionar


# View para login personalizado usando e-mail
def login_view(request):
    if request.method == "POST":
        # Obtém o e-mail e a senha enviados pelo formulário
        email = request.POST.get('username')
        password = request.POST.get('password')

        print(f"Tentando login com: {email} / {password}")  # DEBUG

        # Autentica o usuário usando o backend configurado (por e-mail)
        user = authenticate(request, username=email, password=password)
        if user is not None:
            print("Usuário autenticado!")  # DEBUG
            login(request, user)  # Realiza o login do usuário
            return redirect("home")  # Redireciona para a página inicial do sistema após login
        else:
            print("Falha na autenticação")  # DEBUG
            # Retorna o template de login com mensagem de erro
            context = {'error': "Email ou senha inválidos."}
            return render(request, 'usuarios/login.html', context)
        
    # Se não for POST, apenas exibe o template de login
    return render(request, 'usuarios/login.html')



