import os
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import CreateJsonFromWhatsSerializer, RegisterSerializer, LoginSerializer

from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import AllowAny



class RegisterView(APIView):
    permission_classes = [AllowAny]

    @csrf_exempt
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)


        if serializer.is_valid():
            validated_data = serializer.validated_data

            payload = {
                "name": validated_data["name"],
                "email": validated_data["email"],
                "password": validated_data["password"],
                "phone": validated_data["phone"]
            }

            # Pega a URL do Core via variável de ambiente
            core_url = os.getenv("CORE_URL_REGISTER")
            if not core_url:
                core_url = "http://core:8080/auth/register"  # fallback

            try:
                response = requests.post(core_url, json=payload)
                response.raise_for_status()
            except requests.exceptions.HTTPError:
                try:
                    error_detail = response.json()
                except ValueError:
                    error_detail = response.text or "Erro desconhecido do Core"
                return Response({"error": error_detail}, status=response.status_code)
            except requests.exceptions.RequestException:
                return Response({"error": "Erro ao conectar com o Core"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response({"message": "Usuário registrado com sucesso"}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@method_decorator(csrf_exempt, name="dispatch")
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():
            validated_data = serializer.validated_data


            payload = {
                "login": validated_data["email"],
                "password": validated_data["password"]
            }

            # Pega a URL do Core via variável de ambiente
            core_url = os.getenv("CORE_URL_LOGIN")
            if not core_url:
                core_url = "http://core:8080/auth/login"  # fallback

            try:
                response = requests.post(core_url, json=payload)
                response.raise_for_status()
            except requests.exceptions.HTTPError:
                try:
                    error_detail = response.json()
                except ValueError:
                    error_detail = response.text or "Erro desconhecido do Core"
                return Response({"error": error_detail}, status=response.status_code)
            except requests.exceptions.RequestException:
                return Response({"error": "Erro ao conectar com o Core"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response(response.json(), status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@method_decorator(csrf_exempt, name="dispatch")
class CreateWithN8NView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = CreateJsonFromWhatsSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                {"errors": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST
            )

        validated_data = serializer.validated_data

        payload = {
            "phone": validated_data["phone"],
            "description": validated_data["description"],
            "category": validated_data["category"],
            "value": float(validated_data["value"]),  # Decimal -> float
            "typeRegister": validated_data["typeRegister"],
            "dateRegister": validated_data["dateRegister"].isoformat(),  # date -> string
        }

        core_url = os.getenv("CORE_URL_CREATEN8N") or \
                   "http://localhost:8080/financial-registers/createFromWhats"
        
        headers = {
            "Api-Key": "cnuiredhagujnhsdujaBASHd-563498651465"
        }

        try:
            response = requests.post(core_url, json=payload, headers=headers)
            response.raise_for_status()
        except requests.exceptions.HTTPError:
            try:
                error_detail = response.json()
            except ValueError:
                error_detail = response.text or "Erro desconhecido do Core"
            return Response({"error": error_detail}, status=response.status_code)
        except requests.exceptions.RequestException:
            return Response(
                {"error": "Erro ao conectar com o Core"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        return Response(
            {"message": "Registro criado com sucesso"},
            status=status.HTTP_201_CREATED
        )
