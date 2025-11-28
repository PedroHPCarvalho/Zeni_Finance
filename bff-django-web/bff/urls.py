from django.urls import path
from .views import RegisterView, LoginView, MeView, TableRegistersView, DeleteRegisterView, CreateWithN8NView , ResumeCardsView, CategoryResumeView, MouthResumeView, MouthResumeInvestmentView, AiCreateView, CreateView, UpdateRegisterView

urlpatterns = [
  
    ##Autenticacao
    path("auth/register", RegisterView.as_view(), name="register"),
    path("auth/login", LoginView.as_view(), name="login"),

    ##DADOS USUARIO
    path("me", MeView.as_view(), name="me"),
    
    ##REGISTROS FINANCEIROS
    path("financial-registers-bff/resumecards",
         ResumeCardsView.as_view(), name="resume-cards"),
    path("financial-registers-bff/categoryresume",
         CategoryResumeView.as_view(), name="resume-category"),
    path("financial-registers-bff/mouthresume",
         MouthResumeView.as_view(), name="resume-month"),
    path("financial-registers-bff/mouthresumeinvest",
         MouthResumeInvestmentView.as_view(), name="resume-month-invest"),
    path("financial-registers-bff/create/ia",
         AiCreateView.as_view(), name="createIA"),
    path("financial-registers-bff/create/whats",
         CreateWithN8NView.as_view(), name="whats"),
    path("financial-registers-bff/create/",
         CreateView.as_view(), name="create"),
    path("financial-registers-bff/listPaged",
         TableRegistersView.as_view(), name="listTable"),
    path("financial-registers-bff/<int:id>",
         DeleteRegisterView.as_view(), name="delete-register"),
    path("financial-registers-bff/update/<int:id>",
         UpdateRegisterView.as_view(), name="update-register")
]