"""
URL configuration for server project.

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
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from pets.views import (
    AuthViewSet, PetViewSet, MedicalRecordViewSet, ReminderViewSet, 
    PartnerViewSet, ProductOrServiceViewSet
)

# API Router
router = DefaultRouter()
router.register(r'auth', AuthViewSet, basename='auth')
router.register(r'pets', PetViewSet, basename='pet')
router.register(r'medical-records', MedicalRecordViewSet, basename='medical-record')
router.register(r'reminders', ReminderViewSet, basename='reminder')
router.register(r'partners', PartnerViewSet, basename='partner')
router.register(r'products-services', ProductOrServiceViewSet, basename='product-service')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
