import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import './PartnerRegisterForm.css';

const PartnerRegisterForm = ({ onClose, onSwitchToLogin }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    first_name: '',
    last_name: '',
    // Поля для партнера
    organization_name: '',
    organization_type: 'clinic', // clinic, shop, grooming
    phone: '',
    address: '',
    city: '',
    description: '',
    website: '',
    working_hours: '',
    services: []
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const organizationTypes = [
    { value: 'clinic', label: t('clinic'), icon: '🏥' },
    { value: 'shop', label: t('shop'), icon: '🏪' },
    { value: 'grooming', label: t('grooming'), icon: '✂️' }
  ];

  const commonServices = [
    { value: 'therapy', label: t('therapy') },
    { value: 'surgery', label: t('surgery') },
    { value: 'vaccination', label: t('vaccination') },
    { value: 'diagnostics', label: t('diagnostics') },
    { value: 'grooming', label: t('grooming') },
    { value: 'food', label: t('food') },
    { value: 'accessories', label: t('accessories') },
    { value: 'toys', label: t('toys') },
    { value: 'vitamins', label: t('vitamins') },
    { value: 'emergency', label: t('emergency') }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Очищаем ошибку для этого поля
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleServiceToggle = (serviceValue) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceValue)
        ? prev.services.filter(s => s !== serviceValue)
        : [...prev.services, serviceValue]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Базовые поля
    if (!formData.username.trim()) {
      newErrors.username = `${t('username')} ${t('required')}`;
    } else if (formData.username.length < 3) {
      newErrors.username = t('minLength', { length: 3 });
    }
    
    if (!formData.email.trim()) {
      newErrors.email = `${t('email')} ${t('required')}`;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('invalidEmail');
    }
    
    if (!formData.password) {
      newErrors.password = `${t('password')} ${t('required')}`;
    } else if (formData.password.length < 8) {
      newErrors.password = t('minLength', { length: 8 });
    }
    
    if (!formData.password2) {
      newErrors.password2 = t('confirmPassword') + ' ' + t('required');
    } else if (formData.password !== formData.password2) {
      newErrors.password2 = t('passwordsNotMatch');
    }
    
    if (!formData.first_name.trim()) {
      newErrors.first_name = `${t('firstName')} ${t('required')}`;
    }
    
    if (!formData.last_name.trim()) {
      newErrors.last_name = `${t('lastName')} ${t('required')}`;
    }
    
    // Поля партнера
    if (!formData.organization_name.trim()) {
      newErrors.organization_name = `${t('organizationName')} ${t('required')}`;
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = `${t('phone')} ${t('required')}`;
    } else if (!/^[+]?[0-9\s\-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = t('invalidPhone');
    }
    
    if (!formData.address.trim()) {
      newErrors.address = `${t('address')} ${t('required')}`;
    }
    
    if (!formData.city.trim()) {
      newErrors.city = `${t('city')} ${t('required')}`;
    }
    
    if (!formData.description.trim()) {
      newErrors.description = `${t('description')} ${t('required')}`;
    }
    
    if (formData.services.length === 0) {
      newErrors.services = t('selectAtLeastOneService');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Добавляем роль партнера к данным регистрации
      const partnerData = {
        ...formData,
        role: 'partner'
      };
      
      await register(partnerData);
      // После успешной регистрации перенаправляем на главную
      window.location.href = '/';
    } catch (error) {
      console.error('Partner registration error:', error);
      if (error.response?.data) {
        const serverErrors = error.response.data;
        setErrors(prev => ({
          ...prev,
          ...serverErrors
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          general: 'Ошибка регистрации. Попробуйте еще раз.'
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="partner-register-form">
      <div className="form-header">
        <h2>{t('partnerRegistration')}</h2>
        <p>{t('partnerRegistrationSubtitle')}</p>
      </div>

      <form onSubmit={handleSubmit} className="form">
        {/* Основная информация */}
        <div className="form-section">
          <h3>{t('basicInfo')}</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="first_name">{t('firstName')} *</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className={errors.first_name ? 'error' : ''}
                placeholder={t('enterName')}
              />
              {errors.first_name && <span className="error-message">{errors.first_name}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="last_name">{t('lastName')} *</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className={errors.last_name ? 'error' : ''}
                placeholder={t('enterLastName')}
              />
              {errors.last_name && <span className="error-message">{errors.last_name}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">{t('email')} *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                placeholder={t('enterEmail')}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">{t('phone')} *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? 'error' : ''}
                placeholder={t('enterPhone')}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="username">{t('username')} *</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={errors.username ? 'error' : ''}
                placeholder={t('enterUsername')}
              />
              {errors.username && <span className="error-message">{errors.username}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">{t('password')} *</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
                placeholder={t('enterPassword')}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="password2">{t('confirmPassword')} *</label>
              <input
                type="password"
                id="password2"
                name="password2"
                value={formData.password2}
                onChange={handleChange}
                className={errors.password2 ? 'error' : ''}
                placeholder={t('confirmPasswordPlaceholder')}
              />
              {errors.password2 && <span className="error-message">{errors.password2}</span>}
            </div>
          </div>
        </div>

        {/* Информация об организации */}
        <div className="form-section">
          <h3>{t('organizationInfo')}</h3>
          
          <div className="form-group">
            <label htmlFor="organization_name">{t('organizationName')} *</label>
            <input
              type="text"
              id="organization_name"
              name="organization_name"
              value={formData.organization_name}
              onChange={handleChange}
              className={errors.organization_name ? 'error' : ''}
              placeholder={t('enterOrgName')}
            />
            {errors.organization_name && <span className="error-message">{errors.organization_name}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="organization_type">{t('organizationType')} *</label>
              <select
                id="organization_type"
                name="organization_type"
                value={formData.organization_type}
                onChange={handleChange}
                className={errors.organization_type ? 'error' : ''}
              >
                {organizationTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.icon} {type.label}
                  </option>
                ))}
              </select>
              {errors.organization_type && <span className="error-message">{errors.organization_type}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="city">{t('city')} *</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={errors.city ? 'error' : ''}
                placeholder={t('enterCity')}
              />
              {errors.city && <span className="error-message">{errors.city}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="address">{t('address')} *</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={errors.address ? 'error' : ''}
              placeholder={t('enterAddress')}
            />
            {errors.address && <span className="error-message">{errors.address}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">{t('description')} *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={errors.description ? 'error' : ''}
              placeholder={t('enterDescription')}
              rows="4"
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="website">{t('website')}</label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder={t('enterWebsite')}
            />
          </div>

          <div className="form-group">
            <label htmlFor="working_hours">{t('workingHours')}</label>
            <input
              type="text"
              id="working_hours"
              name="working_hours"
              value={formData.working_hours}
              onChange={handleChange}
              placeholder={t('enterWorkingHours')}
            />
          </div>
        </div>

        {/* Услуги */}
        <div className="form-section">
          <h3>{t('services')} *</h3>
          <p className="section-description">{t('selectServices')}</p>
          
          <div className="services-grid">
            {commonServices.map(service => (
              <label key={service.value} className="service-checkbox">
                <input
                  type="checkbox"
                  checked={formData.services.includes(service.value)}
                  onChange={() => handleServiceToggle(service.value)}
                />
                <span className="checkbox-label">{service.label}</span>
              </label>
            ))}
          </div>
          {errors.services && <span className="error-message">{errors.services}</span>}
        </div>

        {errors.general && (
          <div className="general-error">
            {errors.general}
          </div>
        )}

        <div className="form-actions">
          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
                            {loading ? t('registering') : t('registerBtn')}
          </button>
          
          <button
            type="button"
            className="switch-btn"
            onClick={onSwitchToLogin}
          >
                            {t('alreadyHaveAccount')} {t('loginBtn')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PartnerRegisterForm; 