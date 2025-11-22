from django.contrib import admin
from .models import Perfil

# Register your models here.

@admin.register(Perfil)
class PerfilAdmin(admin.ModelAdmin):
    list_display = ['user', 'telefono', 'fecha_creacion']
    search_fields = ['user__username', 'user__email', 'telefono']
    list_filter = ['fecha_creacion']
    readonly_fields = ['fecha_creacion', 'fecha_actualizacion']
