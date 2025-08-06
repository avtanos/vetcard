import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './LoginForm.css';

const LoginForm = ({ onClose, onSwitchToRegister, onSwitchToPartner }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

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
    
    if (!formData.username.trim()) {
      newErrors.username = 'Имя пользователя обязательно';
    }
    
    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
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
      await login(formData);
      onClose();
    } catch (error) {
      console.error('Login error:', error);
      if (error.response?.data) {
        const serverErrors = error.response.data;
        setErrors(prev => ({
          ...prev,
          ...serverErrors
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          general: 'Ошибка входа. Проверьте ваши данные.'
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form">
      <div className="form-header">
        <h2>Вход в систему</h2>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      <form onSubmit={handleSubmit}>
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

        {errors.general && (
          <div className="error-message">
            {errors.general}
          </div>
        )}

        <div className="form-actions">
          <div className="action-buttons">
            <button
              type="button"
              className="btn btn-outline"
              onClick={onSwitchToRegister}
              disabled={loading}
            >
              Создать аккаунт
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
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm; 