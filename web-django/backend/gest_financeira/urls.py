from django.urls import path
from . import views

urlpatterns = [
    path("home/", views.home, name="home"),
    path("process_chat/", views.process_chat, name="process_chat")
]
