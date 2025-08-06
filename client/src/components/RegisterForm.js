import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './RegisterForm.css';

const RegisterForm = ({ onClose, onSwitchToLogin, onSwitchToPartner }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    first_name: '',
    last_name: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

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

  const validateForm = () => {
    const newErrors = {};
    
    // Проверка имени пользователя
    if (!formData.username.trim()) {
      newErrors.username = 'Имя пользователя обязательно';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Имя пользователя должно содержать минимум 3 символа';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Имя пользователя может содержать только буквы, цифры и подчеркивания';
    }
    
    // Проверка email
    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Введите корректный email';
    }
    
    // Проверка пароля
    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Пароль должен содержать минимум 8 символов';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Пароль должен содержать хотя бы одну заглавную букву, одну строчную букву и одну цифру';
    }
    
    // Проверка подтверждения пароля
    if (!formData.password2) {
      newErrors.password2 = 'Подтвердите пароль';
    } else if (formData.password !== formData.password2) {
      newErrors.password2 = 'Пароли не совпадают';
    }
    
    // Проверка имени
    if (!formData.first_name.trim()) {
      newErrors.first_name = 'Имя обязательно';
    }
    
    // Проверка фамилии
    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Фамилия обязательна';
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
      await register(formData);
      onClose();
    } catch (error) {
      console.error('Registration error:', error);
      if (error.response?.data) {
        const serverErrors = error.response.data;
        setErrors(prev => ({
          ...prev,
          ...serverErrors
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-form">
      <div className="form-header">
        <h2>Регистрация</h2>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="first_name">Имя *</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="Введите ваше имя"
              className={errors.first_name ? 'error' : ''}
            />
            {errors.first_name && <span className="error-text">{errors.first_name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="last_name">Фамилия *</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Введите вашу фамилию"
              className={errors.last_name ? 'error' : ''}
            />
            {errors.last_name && <span className="error-text">{errors.last_name}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="username">Имя пользователя *</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Введите имя пользователя"
            className={errors.username ? 'error' : ''}
          />
          {errors.username && <span className="error-text">{errors.username}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Введите ваш email"
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="password">Пароль *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Введите пароль"
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password2">Подтвердите пароль *</label>
            <input
              type="password"
              id="password2"
              name="password2"
              value={formData.password2}
              onChange={handleChange}
              placeholder="Повторите пароль"
              className={errors.password2 ? 'error' : ''}
            />
            {errors.password2 && <span className="error-text">{errors.password2}</span>}
          </div>
        </div>

        <div className="password-requirements">
          <h4>Требования к паролю:</h4>
          <ul>
            <li className={formData.password.length >= 8 ? 'valid' : ''}>
              Минимум 8 символов
            </li>
            <li className={/(?=.*[a-z])/.test(formData.password) ? 'valid' : ''}>
              Хотя бы одна строчная буква
            </li>
            <li className={/(?=.*[A-Z])/.test(formData.password) ? 'valid' : ''}>
              Хотя бы одна заглавная буква
            </li>
            <li className={/(?=.*\d)/.test(formData.password) ? 'valid' : ''}>
              Хотя бы одна цифра
            </li>
          </ul>
        </div>

        <div className="form-actions">
          <div className="action-buttons">
            <button
              type="button"
              className="btn btn-outline"
              onClick={onSwitchToLogin}
              disabled={loading}
            >
              Уже есть аккаунт?
            </button>
            <button
              type="button"
              className="btn btn-partner"
              onClick={onSwitchToPartner}
              disabled={loading}
            >
              🏢 Регистрация партнера
            </button>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm; 