"""
URL configuration for webapp project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from usuarios import views

urlpatterns = [
    # Inclui as URLs do app gest_financeira na raiz do site (ex: /)
    path('', include('gest_financeira.urls')), # /home ficará na raiz

    # Inclui as URLs do app usuarios também na raiz (ex: /login/, /signup/)
    path('', include('usuarios.urls')),   # /usuarios/login/ e /usuarios/signup/

    # URL para acessar o painel administrativo do Django
    path('admin/', admin.site.urls),

    path("login/", views.login_view, name="login")

]
