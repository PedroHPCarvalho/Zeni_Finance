from django.forms import ValidationError
from rest_framework import serializers
from .utils import phone
from rest_framework import serializers
from django.core.exceptions import ValidationError


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

class CreateJsonFromWhatsSerializer(serializers.Serializer):
    phone = serializers.CharField(max_length=14)
    description = serializers.CharField(max_length=500)
    category = serializers.CharField(max_length=31)
    value = serializers.DecimalField(max_digits=12, decimal_places=2)
    typeRegister = serializers.CharField(max_length=7)
    dateRegister = serializers.DateField()

    CATEGORIAS_PERMITIDAS = [
        "ALIMENTACAO", "TRANSPORTE", "MORADIA", "SAUDE", "EDUCACAO",
        "LAZER_E_ENTRETENIMENTO", "BETS_E_JOGOS_DE_AZAR", "VESTUARIO",
        "SERVICOS", "IMPOSTOS_E_TAXAS", "SALARIO", "FREELANCE_E_SERVICOS_PRESTADOS",
        "INVESTIMENTOS", "PRESENTES_E_DOACOES_RECEBIDAS", "REEMBOLSOS_E_RESTITUICOES"
    ]

    TIPOS_REGISTROS = ["DESPESA", "RECEITA"]

    def validate_phone(self, value):
        value = str(value).strip()
        if len(value) != 14:
            raise serializers.ValidationError("O telefone deve conter 14 caracteres")
        if not value.startswith("+55"):
            raise serializers.ValidationError("O telefone deve começar com +55")
        return value

    def validate_description(self, value):
        if not value.strip():
            raise serializers.ValidationError("Descrição não pode ser vazia")
        return value

    def validate_category(self, value):
        value = value.strip().upper()
        if value not in self.CATEGORIAS_PERMITIDAS:
            raise serializers.ValidationError(f"Categoria inválida: {value}")
        return value

    def validate_value(self, value):
        if value <= 0:
            raise serializers.ValidationError("O valor deve ser maior que zero")
        return value

    def validate_typeRegister(self, value):
        value = value.strip().upper()
        if value not in self.TIPOS_REGISTROS:
            raise serializers.ValidationError(f"Tipo de registro inválido: {value}")
        return value

    def validate_dateRegister(self, value):
        if value is None:
            raise serializers.ValidationError("A data de registro não pode ser nula")
        return value

