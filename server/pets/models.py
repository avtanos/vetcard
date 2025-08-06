from django.db import models
from django.contrib.auth.models import User
from django.core.validators import FileExtensionValidator
from django.conf import settings
import os

def pet_image_path(instance, filename):
    """Генерирует путь для сохранения изображений питомцев"""
    return f'pets/{instance.owner.id}/{instance.id}/{filename}'

def document_upload_path(instance, filename):
    """Генерирует путь для сохранения документов"""
    return f'documents/{instance.owner.id}/{instance.pet.id}/{filename}'

class Pet(models.Model):
    SPECIES_CHOICES = [
        ('cat', 'Кот'),
        ('dog', 'Собака'),
        ('other', 'Другое'),
    ]
    
    name = models.CharField(max_length=100, verbose_name='Имя')
    species = models.CharField(max_length=10, choices=SPECIES_CHOICES, default='cat', verbose_name='Вид')
    breed = models.CharField(max_length=100, blank=True, verbose_name='Порода')
    birth_date = models.DateField(null=True, blank=True, verbose_name='Дата рождения')
    weight_kg = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True, verbose_name='Вес (кг)')
    notes = models.TextField(blank=True, verbose_name='Особые пометки')
    image = models.ImageField(upload_to=pet_image_path, null=True, blank=True, verbose_name='Фото')
    image_url = models.URLField(blank=True, verbose_name='URL фото')
    owner = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Владелец')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Дата обновления')

    class Meta:
        verbose_name = 'Питомец'
        verbose_name_plural = 'Питомцы'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} ({self.get_species_display()})"

    def delete(self, *args, **kwargs):
        # Удаляем изображение при удалении питомца
        if self.image:
            if os.path.isfile(self.image.path):
                os.remove(self.image.path)
        super().delete(*args, **kwargs)

class MedicalRecord(models.Model):
    RECORD_TYPES = [
        ('vaccination', 'Вакцинация'),
        ('examination', 'Осмотр'),
        ('treatment', 'Лечение'),
        ('surgery', 'Операция'),
        ('other', 'Другое'),
    ]
    
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE, related_name='medical_records', verbose_name='Питомец')
    record_type = models.CharField(max_length=20, choices=RECORD_TYPES, verbose_name='Тип записи')
    title = models.CharField(max_length=200, verbose_name='Название')
    description = models.TextField(verbose_name='Описание')
    date = models.DateField(verbose_name='Дата')
    veterinarian = models.CharField(max_length=100, blank=True, verbose_name='Ветеринар')
    cost = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, verbose_name='Стоимость')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')

    class Meta:
        verbose_name = 'Медицинская запись'
        verbose_name_plural = 'Медицинские записи'
        ordering = ['-date']

    def __str__(self):
        return f"{self.pet.name} - {self.title} ({self.date})"

class Reminder(models.Model):
    REMINDER_TYPES = [
        ('vaccination', 'Вакцинация'),
        ('deworming', 'Дегельминтизация'),
        ('examination', 'Осмотр'),
        ('grooming', 'Груминг'),
        ('other', 'Другое'),
    ]
    
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE, related_name='reminders', verbose_name='Питомец')
    reminder_type = models.CharField(max_length=20, choices=REMINDER_TYPES, verbose_name='Тип напоминания')
    title = models.CharField(max_length=200, verbose_name='Название')
    description = models.TextField(blank=True, verbose_name='Описание')
    due_date = models.DateField(verbose_name='Дата напоминания')
    is_completed = models.BooleanField(default=False, verbose_name='Выполнено')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')

    class Meta:
        verbose_name = 'Напоминание'
        verbose_name_plural = 'Напоминания'
        ordering = ['due_date']

    def __str__(self):
        return f"{self.pet.name} - {self.title} ({self.due_date})"

class PetDocument(models.Model):
    DOCUMENT_TYPES = [
        ('medical', 'Медицинский документ'),
        ('vaccination', 'Сертификат вакцинации'),
        ('pedigree', 'Родословная'),
        ('insurance', 'Страховка'),
        ('other', 'Другое'),
    ]
    
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE, related_name='documents', verbose_name='Питомец')
    owner = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Владелец')
    document_type = models.CharField(max_length=20, choices=DOCUMENT_TYPES, verbose_name='Тип документа')
    title = models.CharField(max_length=200, verbose_name='Название')
    description = models.TextField(blank=True, verbose_name='Описание')
    file = models.FileField(
        upload_to=document_upload_path,
        validators=[FileExtensionValidator(allowed_extensions=['pdf', 'doc', 'docx', 'txt', 'jpg', 'jpeg', 'png'])],
        verbose_name='Файл'
    )
    file_size = models.IntegerField(null=True, blank=True, verbose_name='Размер файла (байт)')
    uploaded_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата загрузки')

    class Meta:
        verbose_name = 'Документ питомца'
        verbose_name_plural = 'Документы питомцев'
        ordering = ['-uploaded_at']

    def __str__(self):
        return f"{self.pet.name} - {self.title}"

    def save(self, *args, **kwargs):
        if self.file:
            self.file_size = self.file.size
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        # Удаляем файл при удалении записи
        if self.file:
            if os.path.isfile(self.file.path):
                os.remove(self.file.path)
        super().delete(*args, **kwargs)

class Partner(models.Model):
    PARTNER_TYPES = [
        ('clinic', 'Ветеринарная клиника'),
        ('pharmacy', 'Аптека'),
        ('grooming', 'Груминг'),
        ('hotel', 'Гостиница для животных'),
        ('other', 'Другое'),
    ]
    
    name = models.CharField(max_length=200, verbose_name='Название')
    partner_type = models.CharField(max_length=20, choices=PARTNER_TYPES, verbose_name='Тип партнера')
    address = models.TextField(verbose_name='Адрес')
    phone = models.CharField(max_length=20, blank=True, verbose_name='Телефон')
    email = models.EmailField(blank=True, verbose_name='Email')
    website = models.URLField(blank=True, verbose_name='Веб-сайт')
    description = models.TextField(blank=True, verbose_name='Описание')
    rating = models.DecimalField(max_digits=3, decimal_places=1, null=True, blank=True, verbose_name='Рейтинг')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')

    class Meta:
        verbose_name = 'Партнер'
        verbose_name_plural = 'Партнеры'
        ordering = ['name']

    def __str__(self):
        return self.name

class ProductOrService(models.Model):
    CATEGORIES = [
        ('food', 'Корм'),
        ('medicine', 'Лекарства'),
        ('accessories', 'Аксессуары'),
        ('toys', 'Игрушки'),
        ('care', 'Уход'),
        ('other', 'Другое'),
    ]
    
    name = models.CharField(max_length=200, verbose_name='Название')
    category = models.CharField(max_length=20, choices=CATEGORIES, verbose_name='Категория')
    description = models.TextField(verbose_name='Описание')
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Цена')
    partner = models.ForeignKey(Partner, on_delete=models.CASCADE, related_name='products', verbose_name='Партнер')
    image_url = models.URLField(blank=True, verbose_name='URL изображения')
    is_available = models.BooleanField(default=True, verbose_name='Доступно')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')

    class Meta:
        verbose_name = 'Товар/Услуга'
        verbose_name_plural = 'Товары/Услуги'
        ordering = ['name']

    def __str__(self):
        return f"{self.name} - {self.partner.name}"
