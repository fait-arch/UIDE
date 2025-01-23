from rest_framework import serializers
from .models import Users

class UsersSerializer(serializers.ModelSerializer):  # Usamos ModelSerializer para el modelo Users
    class Meta:
        model = Users
        fields = ('id', 'name', 'email','message')  # Definimos los campos a serializar
        read_only_fields = ('id',)  # Solo el campo 'id' es de solo lectura
    