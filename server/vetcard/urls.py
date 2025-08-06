from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from pets.views import (
    AuthViewSet, PetViewSet, MedicalRecordViewSet, ReminderViewSet,
    PartnerViewSet, ProductOrServiceViewSet, PetDocumentViewSet
)

router = DefaultRouter()
router.register(r'auth', AuthViewSet, basename='auth')
router.register(r'pets', PetViewSet, basename='pet')
router.register(r'medical-records', MedicalRecordViewSet, basename='medical-record')
router.register(r'reminders', ReminderViewSet, basename='reminder')
router.register(r'partners', PartnerViewSet, basename='partner')
router.register(r'products', ProductOrServiceViewSet, basename='product')
router.register(r'documents', PetDocumentViewSet, basename='document')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

# Добавляем поддержку медиа файлов в режиме разработки
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) 