from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

# Formulário personalizado para criação de usuário, incluindo o campo de e-mail obrigatório
class CustomUserCreationForm(UserCreationForm):
    # Adiciona o campo de e-mail como obrigatório
    email = forms.EmailField(required=True)

    class Meta:
        # Define o modelo associado ao formulário (User padrão do Django)
        model = User
        # Define os campos que aparecerão no formulário
        fields = {"username", "email", "password1", "password2"}

    def save(self, commit=True):
        # Salva o usuário com o e-mail informado
        user = super().save(commit=False)
        user.email = self.cleaned_data["email"]
        if commit:
            user.save()
        return user