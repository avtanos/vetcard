from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from .models import Pet, MedicalRecord, Reminder, Partner, ProductOrService, PetDocument

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(**validated_data)
        return user

class PetSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    age = serializers.SerializerMethodField()

    class Meta:
        model = Pet
        fields = '__all__'
        read_only_fields = ('owner', 'created_at', 'updated_at')

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return obj.image_url

    def get_age(self, obj):
        if obj.birth_date:
            from datetime import date
            today = date.today()
            age = today.year - obj.birth_date.year
            if today.month < obj.birth_date.month or (today.month == obj.birth_date.month and today.day < obj.birth_date.day):
                age -= 1
            return age
        return None

class MedicalRecordSerializer(serializers.ModelSerializer):
    pet_name = serializers.CharField(source='pet.name', read_only=True)

    class Meta:
        model = MedicalRecord
        fields = '__all__'
        read_only_fields = ('created_at',)

class ReminderSerializer(serializers.ModelSerializer):
    pet_name = serializers.CharField(source='pet.name', read_only=True)
    days_until_due = serializers.SerializerMethodField()

    class Meta:
        model = Reminder
        fields = '__all__'
        read_only_fields = ('created_at',)

    def get_days_until_due(self, obj):
        from datetime import date
        today = date.today()
        delta = obj.due_date - today
        return delta.days

class PetDocumentSerializer(serializers.ModelSerializer):
    pet_name = serializers.CharField(source='pet.name', read_only=True)
    file_url = serializers.SerializerMethodField()
    file_size_mb = serializers.SerializerMethodField()

    class Meta:
        model = PetDocument
        fields = '__all__'
        read_only_fields = ('owner', 'file_size', 'uploaded_at')

    def get_file_url(self, obj):
        if obj.file:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.file.url)
            return obj.file.url
        return None

    def get_file_size_mb(self, obj):
        if obj.file_size:
            return round(obj.file_size / (1024 * 1024), 2)
        return None

class PartnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partner
        fields = '__all__'
        read_only_fields = ('created_at',)

class ProductOrServiceSerializer(serializers.ModelSerializer):
    partner_name = serializers.CharField(source='partner.name', read_only=True)

    class Meta:
        model = ProductOrService
        fields = '__all__'
        read_only_fields = ('created_at',) 