from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer, LoginSerializer
import requests  # pra chamar a API do core
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import AllowAny



class RegisterView(APIView):
    @csrf_exempt
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        # Valida os dados do front no Serializer
        if serializer.is_valid():
            validated_data = serializer.validated_data

            # Monta o payload para o core
            payload = {
                "name": validated_data["name"],
                "email": validated_data["email"],
                "password": validated_data["password"],
                "phone": validated_data["phone"]
            }

            # chama o core para enviar os dados (com requests)
            try:
                response = requests.post("http://localhost:8080/auth/register", json=payload)
                response.raise_for_status()
            except requests.exceptions.HTTPError:
                try:
                    error_detail = response.json()
                except ValueError:
                    error_detail = response.text or "Erro desconhecido do Core"
                    return Response({"error": error_detail}, status=response.status_code)
                except Exception:
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

            try:
                response = requests.post("http://localhost:8080/auth/login", json=payload)
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