import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import LoadingSpinner from '../components/LoadingSpinner';
import './Profile.css';

const Profile = () => {
  const { user, token } = useAuth();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    username: '',
    city: '',
    address: '',
    birth_date: '',
    avatar: null
  });
  const [isEditing, setIsEditing] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        phone: user.phone || '',
        username: user.username || '',
        city: user.city || '',
        address: user.address || '',
        birth_date: user.birth_date || '',
        avatar: user.avatar || null
      });
    }
  }, [user]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData(prev => ({
        ...prev,
        avatar: file
      }));
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Здесь будет API запрос для обновления профиля
      console.log('Обновление профиля:', profileData);
      
      // Имитация успешного обновления
      setTimeout(() => {
        setIsEditing(false);
        setLoading(false);
        alert('Профиль успешно обновлен!');
      }, 1000);
    } catch (error) {
      console.error('Ошибка обновления профиля:', error);
      setLoading(false);
      alert('Ошибка при обновлении профиля');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordData.new_password !== passwordData.confirm_password) {
      alert('Пароли не совпадают');
      return;
    }
    
    setLoading(true);
    
    try {
      // Здесь будет API запрос для смены пароля
      console.log('Смена пароля:', passwordData);
      
      // Имитация успешной смены пароля
      setTimeout(() => {
        setPasswordData({
          current_password: '',
          new_password: '',
          confirm_password: ''
        });
        setLoading(false);
        alert('Пароль успешно изменен!');
      }, 1000);
    } catch (error) {
      console.error('Ошибка смены пароля:', error);
      setLoading(false);
      alert('Ошибка при смене пароля');
    }
  };

  if (!user) {
    return (
      <div className="profile-container">
        <div className="not-authenticated">
          <h2>Необходима авторизация</h2>
          <p>Для просмотра профиля необходимо войти в систему</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>{t('profile')}</h1>
        <p>Управление личными данными и настройками аккаунта</p>
      </div>

      <div className="profile-content">
        <div className="profile-section">
          <div className="section-header">
            <h2>Личные данные</h2>
            <button 
              className="edit-btn"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? '❌ Отмена' : '✏️ Редактировать'}
            </button>
          </div>

          <form onSubmit={handleProfileSubmit} className="profile-form">
            <div className="avatar-section">
              <div className="avatar-container">
                <div className="avatar">
                  {profileData.avatar ? (
                    <img src={URL.createObjectURL(profileData.avatar)} alt="Avatar" />
                  ) : (
                    <span className="avatar-placeholder">
                      {user.first_name ? user.first_name[0].toUpperCase() : 'U'}
                    </span>
                  )}
                </div>
                {isEditing && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="avatar-input"
                    id="avatar-input"
                  />
                )}
                {isEditing && (
                  <label htmlFor="avatar-input" className="avatar-label">
                    📷 Изменить фото
                  </label>
                )}
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="first_name">Имя *</label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={profileData.first_name}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="last_name">Фамилия *</label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={profileData.last_name}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Телефон</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="form-group">
                <label htmlFor="username">Логин *</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={profileData.username}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="birth_date">Дата рождения</label>
                <input
                  type="date"
                  id="birth_date"
                  name="birth_date"
                  value={profileData.birth_date}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="form-group">
                <label htmlFor="city">Город</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={profileData.city}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="address">Адрес</label>
                <textarea
                  id="address"
                  name="address"
                  value={profileData.address}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                  rows="3"
                />
              </div>
            </div>

            {isEditing && (
              <div className="form-actions">
                <button type="submit" className="save-btn" disabled={loading}>
                  {loading ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid rgba(255,255,255,0.3)',
                        borderTop: '2px solid white',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }}></div>
                      Сохранение...
                    </div>
                  ) : '💾 Сохранить изменения'}
                </button>
              </div>
            )}
          </form>
        </div>

        <div className="profile-section">
          <div className="section-header">
            <h2>Смена пароля</h2>
          </div>

          <form onSubmit={handlePasswordSubmit} className="password-form">
            <div className="form-group">
              <label htmlFor="current_password">Текущий пароль *</label>
              <input
                type="password"
                id="current_password"
                name="current_password"
                value={passwordData.current_password}
                onChange={handlePasswordChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="new_password">Новый пароль *</label>
              <input
                type="password"
                id="new_password"
                name="new_password"
                value={passwordData.new_password}
                onChange={handlePasswordChange}
                required
                minLength="8"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirm_password">Подтвердите новый пароль *</label>
              <input
                type="password"
                id="confirm_password"
                name="confirm_password"
                value={passwordData.confirm_password}
                onChange={handlePasswordChange}
                required
                minLength="8"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="change-password-btn" disabled={loading}>
                {loading ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderTop: '2px solid white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}></div>
                    Изменение...
                  </div>
                ) : '🔒 Изменить пароль'}
              </button>
            </div>
          </form>
        </div>

        <div className="profile-section">
          <div className="section-header">
            <h2>Настройки аккаунта</h2>
          </div>

          <div className="account-settings">
            <div className="setting-item">
              <div className="setting-info">
                <h3>Уведомления</h3>
                <p>Получать уведомления о напоминаниях и важных событиях</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h3>Email рассылка</h3>
                <p>Получать полезные статьи и советы на email</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h3>Двухфакторная аутентификация</h3>
                <p>Дополнительная защита аккаунта</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <div className="section-header">
            <h2>Статистика аккаунта</h2>
          </div>

          <div className="account-stats">
            <div className="stat-card">
              <span className="stat-icon">🐾</span>
              <span className="stat-number">3</span>
              <span className="stat-label">Питомцев</span>
            </div>
            <div className="stat-card">
              <span className="stat-icon">📅</span>
              <span className="stat-number">12</span>
              <span className="stat-label">Напоминаний</span>
            </div>
            <div className="stat-card">
              <span className="stat-icon">🏥</span>
              <span className="stat-number">8</span>
              <span className="stat-label">Записей к врачу</span>
            </div>
            <div className="stat-card">
              <span className="stat-icon">⭐</span>
              <span className="stat-number">156</span>
              <span className="stat-label">Дней в системе</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 