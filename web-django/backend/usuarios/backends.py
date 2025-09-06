"""
Backend de autenticação personalizado para Django.

Este backend permite que os usuários façam login utilizando o e-mail cadastrado,
em vez do nome de usuário padrão. Para utilizá-lo, adicione o caminho deste
backend na configuração AUTHENTICATION_BACKENDS do seu settings.py.

Exemplo:
AUTHENTICATION_BACKENDS = [
    'prototipo_tcc.src.mysite.usuarios.backends.EmailBackend',
    'django.contrib.auth.backends.ModelBackend',
]
"""

from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model


# Obtém o modelo de usuário configurado no projeto (pode ser o padrão do Django ou um customizado)
UserModel = get_user_model()


class EmailBackend(ModelBackend):
    """
    Backend de autenticação que permite login usando o e-mail do usuário.
    Herda do ModelBackend padrão do Django.
    """

    def authenticate(self, request, username=None, password=None, **kwargs):
        """
        Tenta autenticar um usuário usando o e-mail e a senha fornecidos.

        Parâmetros:
        - request: objeto HttpRequest (pode ser None).
        - username: valor do campo username (neste caso, espera-se o e-mail).
        - password: senha fornecida pelo usuário.
        - **kwargs: argumentos adicionais, pode conter 'email'.

        Retorna:
        - Usuário autenticado se as credenciais estiverem corretas.
        - None se a autenticação falhar.
        """
        # Se username não for informado, tenta obter o e-mail dos kwargs
        if username is None:
            username = kwargs.get('email')
        try:
            # Busca o usuário pelo campo de e-mail
            user = UserModel.objects.get(email=username)
        except UserModel.DoesNotExist:
            # Retorna None se o usuário não existir
            return None
        else:
            # Verifica se a senha está correta
            # e se o usuário está ativo (user_can_authenticate)
            if user.check_password(password) and self.user_can_authenticate(user):
                return user
        # Retorna None caso a autenticação falhe
        return None