from django.db import models

# Create your models here.
class Users(models.Model):
    id = models.BigAutoField(primary_key=True)  # Usamos BigAutoField para el id
    name = models.CharField(max_length=100)  # Nombre Completo
    email = models.EmailField(unique=True)  # Email
    # Agregar el campo 'message' que es opcional
    message = models.TextField(null=True, blank=True)  # Permitir valores nulos y en blanco