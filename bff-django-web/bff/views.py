import os
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import CreateJsonFromWhatsSerializer, RegisterSerializer, LoginSerializer

from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import AllowAny

@method_decorator(csrf_exempt, name="dispatch")
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
                "password_confirmed": validated_data["password_confirmed"],
                "phone": validated_data["phone"]
            }

            # Pega a URL do Core via variável de ambiente
            core_url = os.getenv("CORE_URL_REGISTER")
            if not core_url:
                core_url = "http://localhost:8080/auth/register"  # fallback

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
        if not serializer.is_valid():
            print("ERROS DO SERIALIZER:", serializer.errors)  # 🔹 imprime o motivo do 400
            return Response(serializer.errors, status=400)
        
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
                core_url = "http://localhost:8080/auth/login"  # fallback

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
                   "http://localhost:8080/financial-registers/create/whats"
        
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


@method_decorator(csrf_exempt, name="dispatch")
class AiCreateView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        token = request.headers.get("Authorization")
        if not token:
            return Response({"error": "Token não fornecido"}, status=401)

        user_string = request.data.get("userString")
        if not user_string:
            return Response({"error": "Campo userString é obrigatório"}, status=400)

        core_url = os.getenv("CORE_URL_AI_CREATE", "http://core:8080/financial-registers/create/ia")
        try:
            headers = {"Authorization": token}
            payload = {"userString": user_string}
            response = requests.post(core_url, headers=headers, json=payload)
            response.raise_for_status()
        except requests.exceptions.RequestException as e:
            return Response({"error": str(e)}, status=500)

        return Response(response.json(), status=response.status_code)
    

@method_decorator(csrf_exempt, name="dispatch")
class CreateView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        # 1️⃣ Pegar os dados do corpo da requisição
        description = request.data.get("description")
        category = request.data.get("category")
        value = request.data.get("value")
        type_register = request.data.get("typeRegister")
        date_register = request.data.get("dateRegister")

        # 2️⃣ Validar campos obrigatórios
        required_fields = {
            "description": description,
            "category": category,
            "value": value,
            "typeRegister": type_register,
            "dateRegister": date_register,
        }

        missing_fields = [key for key, val in required_fields.items() if val is None]
        if missing_fields:
            return Response({"error": f"Campos obrigatórios ausentes: {', '.join(missing_fields)}"}, status=400)

        # 3️⃣ Validar que value não é negativo
        try:
            value = float(value)
        except (ValueError, TypeError):
            return Response({"error": "Campo value deve ser um número"}, status=400)

        if value < 0:
            return Response({"error": "Campo value não pode ser negativo"}, status=400)

        # 4️⃣ Enviar para o core
        core_url = os.getenv("CORE_URL_CREATE", "http://localhost:8080/financial-registers/create")
        token = request.headers.get("Authorization")
        if not token:
            return Response({"error": "Token não fornecido"}, status=401)

        try:
            headers = {"Authorization": token}
            payload = {
                "description": description,
                "category": category,
                "value": value,
                "typeRegister": type_register,
                "dateRegister": date_register,
            }
            response = requests.post(core_url, headers=headers, json=payload)
            response.raise_for_status()
        except requests.exceptions.RequestException as e:
            return Response({"error": str(e)}, status=500)

        return Response(response.json(), status=response.status_code)


@method_decorator(csrf_exempt, name="dispatch")
class MeView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        core_url = os.getenv("CORE_URL_ME") or "http://localhost:8080/user/me"

        token = request.headers.get("Authorization")
        if not token:
            return Response({"error": "Token não fornecido"}, status=status.HTTP_401_UNAUTHORIZED)
          
        headers = {"Authorization": token}

        response = requests.get(core_url, headers=headers)
        response.raise_for_status()
        return Response(response.json())


@method_decorator(csrf_exempt, name="dispatch")
class ResumeCardsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        core_url = os.getenv("CORE_URL_RESUME_CARDS") or "http://localhost:8080/financial-registers/resumeCards"

        token = request.headers.get("Authorization")
        if not token:
            return Response({"error": "Token não fornecido"}, status=status.HTTP_401_UNAUTHORIZED)
          
        headers = {"Authorization": token}

        response = requests.get(core_url, headers=headers)
        response.raise_for_status()
        return Response(response.json())


@method_decorator(csrf_exempt, name="dispatch")
class CategoryResumeView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        core_url = os.getenv("CORE_URL_RESUME_CATEGORY") or "http://localhost:8080/financial-registers/categoryresume"

        token = request.headers.get("Authorization")
        if not token:
            return Response({"error": "Token não fornecido"}, status=status.HTTP_401_UNAUTHORIZED)
          
        headers = {"Authorization": token}

        response = requests.get(core_url, headers=headers)
        response.raise_for_status()
        return Response(response.json())


@method_decorator(csrf_exempt, name="dispatch")
class MouthResumeView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        core_url = os.getenv("CORE_URL_MONTH_RESUME") or "http://localhost:8080/financial-registers/monthresume"

        token = request.headers.get("Authorization")
        if not token:
            return Response({"error": "Token não fornecido"}, status=status.HTTP_401_UNAUTHORIZED)
          
        headers = {"Authorization": token}

        response = requests.get(core_url, headers=headers)
        response.raise_for_status()
        return Response(response.json())


@method_decorator(csrf_exempt, name="dispatch")
class MouthResumeInvestmentView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        core_url = os.getenv("CORE_URL_RESUME_INVESTMENT") or "http://localhost:8080/financial-registers/monthresumeinvest"

        token = request.headers.get("Authorization")
        if not token:
            return Response({"error": "Token não fornecido"}, status=status.HTTP_401_UNAUTHORIZED)
          
        headers = {"Authorization": token}

        response = requests.get(core_url, headers=headers)
        response.raise_for_status()
        return Response(response.json())    


@method_decorator(csrf_exempt, name="dispatch")
class TableRegistersView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        ##parametros paginacao
        page = request.query_params.get("page", 0)
        size = request.query_params.get("size", 10)

        #Monta a URL do core com pagincacao
        core_base_url = os.getenv("CORE_URL_TABLE_RESUME", "http://localhost:8080/financial-registers/list/paged")
        core_url = f"{core_base_url}?page={page}&size={size}"

        token = request.headers.get("Authorization")
        if not token:
            return Response({"error": "Token não fornecido"}, status=status.HTTP_401_UNAUTHORIZED)
          
        headers = {"Authorization": token}

        response = requests.get(core_url, headers=headers)
        response.raise_for_status()
        return Response(response.json())
    

@method_decorator(csrf_exempt, name="dispatch")
class DeleteRegisterView(APIView):
    permission_classes = [AllowAny]

    def delete(self, request, id=None):
        #id vem do url
        if not id:
            return Response({"error":"ID não fornecido"}, status=status.HTTP_400_BAD_REQUEST)
        
        core_base_url = os.getenv("CORE_URL_DELETE_REGISTER") or "http://localhost:8080/financial-registers/"
        core_url = f"{core_base_url}{id}"

        token = request.headers.get("Authorization")

        if not token:
            return Response({"error":"Token não fornecido"}, status=status.HTTP_403_FORBIDDEN)
        
        headers = {"Authorization": token}

        try:
            response = requests.delete(core_url, headers=headers)
            if response.status_code == 204:
                return Response({"message": "Registro Deletado com Sucesso"})
            else:
                return Response(response.json(), status=response.status_code)
        except requests.exceptions.RequestException as err:
            return Response({"error": str(err)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)