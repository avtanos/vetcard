import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = ({ onAuthClick }) => {
  const { user } = useAuth();

  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Добро пожаловать в <span className="highlight">VetCard</span>
          </h1>
          <p className="hero-subtitle">
            Умная система управления здоровьем ваших питомцев
          </p>
          <div className="hero-features">
            <div className="feature">
              <span className="feature-icon">🐾</span>
              <span>Управление питомцами</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🤖</span>
              <span>AI-ассистент</span>
            </div>
            <div className="feature">
              <span className="feature-icon">📅</span>
              <span>Напоминания</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🏥</span>
              <span>Медицинские записи</span>
            </div>
          </div>
          {!user ? (
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={onAuthClick}>
                Начать
              </button>
              <Link to="/partners" className="btn btn-outline">
                Наши партнеры
              </Link>
            </div>
          ) : (
            <div className="hero-actions">
              <Link to="/my-pets" className="btn btn-primary">
                Мои питомцы
              </Link>
              <Link to="/assistant" className="btn btn-outline">
                AI-ассистент
              </Link>
            </div>
          )}
        </div>
        <div className="hero-image">
          <div className="floating-card card-1">
            <span className="card-icon">🐕</span>
            <span className="card-text">Здоровье</span>
          </div>
          <div className="floating-card card-2">
            <span className="card-icon">🐱</span>
            <span className="card-text">Уход</span>
          </div>
          <div className="floating-card card-3">
            <span className="card-icon">🏥</span>
            <span className="card-text">Ветеринар</span>
          </div>
        </div>
      </div>

      <div className="features-section">
        <h2 className="section-title">Возможности системы</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-card-icon">📱</div>
            <h3>Удобное управление</h3>
            <p>Простой и интуитивный интерфейс для управления информацией о ваших питомцах</p>
          </div>
          <div className="feature-card">
            <div className="feature-card-icon">🤖</div>
            <h3>AI-ассистент</h3>
            <p>Получите мгновенные ответы на вопросы о здоровье и уходе за питомцами</p>
          </div>
          <div className="feature-card">
            <div className="feature-card-icon">📅</div>
            <h3>Умные напоминания</h3>
            <p>Не пропустите важные события: прививки, осмотры, кормление</p>
          </div>
          <div className="feature-card">
            <div className="feature-card-icon">📊</div>
            <h3>Медицинская история</h3>
            <p>Ведите полную историю здоровья и лечения ваших питомцев</p>
          </div>
          <div className="feature-card">
            <div className="feature-card-icon">🏥</div>
            <h3>Партнерская сеть</h3>
            <p>Найдите проверенных ветеринаров и зоомагазины рядом с вами</p>
          </div>
          <div className="feature-card">
            <div className="feature-card-icon">📱</div>
            <h3>Мобильный доступ</h3>
            <p>Получите доступ к данным ваших питомцев с любого устройства</p>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <div className="cta-content">
          <h2>Готовы начать?</h2>
          <p>Присоединяйтесь к тысячам владельцев питомцев, которые уже используют VetCard</p>
          {!user ? (
            <button className="btn btn-primary" onClick={onAuthClick}>
              Создать аккаунт
            </button>
          ) : (
            <Link to="/my-pets" className="btn btn-primary">
              Перейти к питомцам
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home; 