from rest_framework import serializers
from .utils import phone


class RegisterSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=200)
    email = serializers.EmailField()
    password = serializers.CharField(min_length=8, write_only=True)
    password_confirmed = serializers.CharField(write_only=True)
    phone = serializers.CharField(max_length=15)

    def validate_password(self, value):
        errors = []

        # Regra 1: Conter um número
        if not any(c.isdigit() for c in value):
            errors.append("Senha precisa conter pelo menos UM número")
        # Regra 2: Conter uma letra maiuscula
        if not any(c.isupper() for c in value):
            errors.append("Senha precisa conter pelo menus UMA letra maiúscula")
        # Regra 2: Não ser uma sequencia numerica
        if "12345678" in value or "123456789" in value:
            errors.append("Senha não pode ser uma sequencia numerica")

        if errors:
            raise serializers.ValidationError(errors)

        return value
    
    def validate_phone(self, value):
        return phone.normalize_phone(value)

    def validate(self, data):
        # campo de senhas ser igual
        if data["password"] != data["password_confirmed"]:
            raise serializers.ValidationError(
                "Senha e Confirmação de senha devem ser iguais"
            )
        return data
    

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
