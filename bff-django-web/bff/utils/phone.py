import re
from rest_framework import serializers


def normalize_phone(phone):
    digitos = re.sub(r'\D', '', phone)
    if len(digitos) != 11:
        raise serializers.ValidationError("Número inválido. Deve conter DDD + telefone")
    return f"55{digitos}"