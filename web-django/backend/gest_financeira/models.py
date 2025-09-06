from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Registros(models.Model):
    id_user = models.ForeignKey(      # FK para o usuário  
        User,
        to_field='id',
        on_delete=models.CASCADE
      )
    description = models.CharField(max)
    category = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    type_register = models.CharField(max_length=100, default='exit')
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)  # Data/hora de criação automática

    def __str__(self):
        return f"{self.description} - {self.amount}"
  