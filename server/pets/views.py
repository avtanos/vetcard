from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.conf import settings
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import os
import uuid

from .models import Pet, MedicalRecord, Reminder, Partner, ProductOrService, PetDocument
from .serializers import (
    UserSerializer, PetSerializer, MedicalRecordSerializer, 
    ReminderSerializer, PartnerSerializer, ProductOrServiceSerializer,
    PetDocumentSerializer
)

class AuthViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['post'], permission_classes=[])
    def register(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                'user': UserSerializer(user).data,
                'access_token': user.auth_token.key if hasattr(user, 'auth_token') else None,
                'refresh_token': None
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], permission_classes=[])
    def login(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        if not username or not password:
            return Response({'error': 'Username and password required'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = authenticate(username=username, password=password)
        if user:
            return Response({
                'user': UserSerializer(user).data,
                'access_token': user.auth_token.key if hasattr(user, 'auth_token') else None,
                'refresh_token': None
            })
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=False, methods=['get'])
    def me(self, request):
        return Response(UserSerializer(request.user).data)

class PetViewSet(viewsets.ModelViewSet):
    serializer_class = PetSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Pet.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(detail=True, methods=['post'])
    def upload_image(self, request, pk=None):
        pet = self.get_object()
        image_file = request.FILES.get('image')
        
        if not image_file:
            return Response({'error': 'No image file provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Проверяем тип файла
        if image_file.content_type not in settings.ALLOWED_IMAGE_TYPES:
            return Response({'error': 'Invalid file type'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Проверяем размер файла
        if image_file.size > settings.MAX_UPLOAD_SIZE:
            return Response({'error': 'File too large'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Генерируем уникальное имя файла
        file_extension = os.path.splitext(image_file.name)[1]
        filename = f"{uuid.uuid4()}{file_extension}"
        
        # Сохраняем файл
        file_path = f"pets/{pet.owner.id}/{pet.id}/{filename}"
        saved_path = default_storage.save(file_path, ContentFile(image_file.read()))
        
        # Обновляем модель питомца
        pet.image = saved_path
        pet.save()
        
        return Response({
            'image_url': request.build_absolute_uri(default_storage.url(saved_path)),
            'message': 'Image uploaded successfully'
        })

class MedicalRecordViewSet(viewsets.ModelViewSet):
    serializer_class = MedicalRecordSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return MedicalRecord.objects.filter(pet__owner=self.request.user)

    def perform_create(self, serializer):
        pet_id = self.request.data.get('pet')
        pet = Pet.objects.get(id=pet_id, owner=self.request.user)
        serializer.save(pet=pet)

class ReminderViewSet(viewsets.ModelViewSet):
    serializer_class = ReminderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Reminder.objects.filter(pet__owner=self.request.user)

    def perform_create(self, serializer):
        pet_id = self.request.data.get('pet')
        pet = Pet.objects.get(id=pet_id, owner=self.request.user)
        serializer.save(pet=pet)

class PetDocumentViewSet(viewsets.ModelViewSet):
    serializer_class = PetDocumentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return PetDocument.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        pet_id = self.request.data.get('pet')
        pet = Pet.objects.get(id=pet_id, owner=self.request.user)
        serializer.save(owner=self.request.user, pet=pet)

    @action(detail=True, methods=['post'])
    def upload_file(self, request, pk=None):
        document = self.get_object()
        file_obj = request.FILES.get('file')
        
        if not file_obj:
            return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Проверяем размер файла
        if file_obj.size > settings.MAX_UPLOAD_SIZE:
            return Response({'error': 'File too large'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Генерируем уникальное имя файла
        file_extension = os.path.splitext(file_obj.name)[1]
        filename = f"{uuid.uuid4()}{file_extension}"
        
        # Сохраняем файл
        file_path = f"documents/{document.owner.id}/{document.pet.id}/{filename}"
        saved_path = default_storage.save(file_path, ContentFile(file_obj.read()))
        
        # Обновляем модель документа
        document.file = saved_path
        document.save()
        
        return Response({
            'file_url': request.build_absolute_uri(default_storage.url(saved_path)),
            'message': 'File uploaded successfully'
        })

class PartnerViewSet(viewsets.ModelViewSet):
    queryset = Partner.objects.all()
    serializer_class = PartnerSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        category = self.request.query_params.get('category', None)
        queryset = Partner.objects.all()
        if category:
            queryset = queryset.filter(partner_type=category)
        return queryset

class ProductOrServiceViewSet(viewsets.ModelViewSet):
    queryset = ProductOrService.objects.all()
    serializer_class = ProductOrServiceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        category = self.request.query_params.get('category', None)
        partner = self.request.query_params.get('partner', None)
        queryset = ProductOrService.objects.filter(is_available=True)
        
        if category:
            queryset = queryset.filter(category=category)
        if partner:
            queryset = queryset.filter(partner_id=partner)
            
        return queryset

    @action(detail=False, methods=['get'])
    def categories(self, request):
        categories = ProductOrService.objects.values_list('category', flat=True).distinct()
        return Response({'categories': list(categories)})
