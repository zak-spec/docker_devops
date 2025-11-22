from django.shortcuts import render, redirect
from django.views import View
from django.http import HttpResponse
from django.contrib import messages
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.forms import AuthenticationForm
from .forms import RegistroForm

# Create your views here.
class MiVista(View):
    def get(self, request):
        return render(request, 'prueba/index.html')
    
    def post(self, request):
        return HttpResponse("Método POST recibido")


class RegistroView(View):
    def get(self, request):
        if request.user.is_authenticated:
            return redirect('index')
        form = RegistroForm()
        return render(request, 'prueba/registro.html', {'form': form})
    
    def post(self, request):
        form = RegistroForm(request.POST)
        if form.is_valid():
            user = form.save()
            # Crear perfil solo para usuarios registrados por el formulario
            from .models import Perfil
            Perfil.objects.create(user=user)
            login(request, user)
            messages.success(request, f'¡Bienvenido {user.username}! Tu cuenta ha sido creada exitosamente.')
            return redirect('index')
        else:
            messages.error(request, 'Por favor corrige los errores en el formulario.')
        return render(request, 'prueba/registro.html', {'form': form})


class LoginView(View):
    def get(self, request):
        # Comentado temporalmente para ver el formulario
        # if request.user.is_authenticated:
        #     return redirect('index')
        form = AuthenticationForm()
        return render(request, 'prueba/login.html', {'form': form})
    
    def post(self, request):
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                messages.success(request, f'¡Bienvenido de nuevo {username}!')
                return redirect('index')
        else:
            messages.error(request, 'Usuario o contraseña incorrectos.')
        return render(request, 'prueba/login.html', {'form': form})


class LogoutView(View):
    def get(self, request):
        logout(request)
        messages.info(request, 'Has cerrado sesión exitosamente.')
        return redirect('login')