from django.contrib import admin
from .models import Pet, MedicalRecord, Reminder, Partner, ProductOrService, PetDocument

@admin.register(Pet)
class PetAdmin(admin.ModelAdmin):
    list_display = ['name', 'species', 'breed', 'owner', 'created_at']
    list_filter = ['species', 'created_at', 'owner']
    search_fields = ['name', 'breed', 'owner__username']
    readonly_fields = ['created_at', 'updated_at']
    fieldsets = (
        ('Основная информация', {
            'fields': ('name', 'species', 'breed', 'birth_date', 'weight_kg')
        }),
        ('Фото', {
            'fields': ('image', 'image_url'),
            'classes': ('collapse',)
        }),
        ('Дополнительно', {
            'fields': ('notes', 'owner'),
            'classes': ('collapse',)
        }),
        ('Даты', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(MedicalRecord)
class MedicalRecordAdmin(admin.ModelAdmin):
    list_display = ['pet', 'record_type', 'title', 'date', 'veterinarian']
    list_filter = ['record_type', 'date', 'pet__species']
    search_fields = ['pet__name', 'title', 'veterinarian']
    readonly_fields = ['created_at']
    date_hierarchy = 'date'

@admin.register(Reminder)
class ReminderAdmin(admin.ModelAdmin):
    list_display = ['pet', 'reminder_type', 'title', 'due_date', 'is_completed']
    list_filter = ['reminder_type', 'is_completed', 'due_date']
    search_fields = ['pet__name', 'title']
    readonly_fields = ['created_at']
    date_hierarchy = 'due_date'
    list_editable = ['is_completed']

@admin.register(PetDocument)
class PetDocumentAdmin(admin.ModelAdmin):
    list_display = ['pet', 'document_type', 'title', 'file_size', 'uploaded_at']
    list_filter = ['document_type', 'uploaded_at', 'pet__species']
    search_fields = ['pet__name', 'title', 'description']
    readonly_fields = ['file_size', 'uploaded_at']
    date_hierarchy = 'uploaded_at'

@admin.register(Partner)
class PartnerAdmin(admin.ModelAdmin):
    list_display = ['name', 'partner_type', 'phone', 'rating', 'created_at']
    list_filter = ['partner_type', 'rating', 'created_at']
    search_fields = ['name', 'address', 'phone', 'email']
    readonly_fields = ['created_at']

@admin.register(ProductOrService)
class ProductOrServiceAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'partner', 'price', 'is_available']
    list_filter = ['category', 'is_available', 'partner__partner_type']
    search_fields = ['name', 'description', 'partner__name']
    readonly_fields = ['created_at']
    list_editable = ['is_available']
