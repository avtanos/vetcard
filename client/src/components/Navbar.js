import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import './Navbar.css';

const Navbar = ({ onAuthClick }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Определяем доступные ссылки в зависимости от статуса аутентификации
  const getNavLinks = () => {
    const baseLinks = [
      { path: '/', label: t('home'), icon: '🏠' }
    ];

    const authenticatedLinks = [
      { path: '/my-pets', label: t('myPets'), icon: '🐾' },
      { path: '/assistant', label: t('assistant'), icon: '🤖' },
      { path: '/reminders', label: t('reminders'), icon: '📅' }
    ];

    const publicLinks = [
      { path: '/partners', label: t('partners'), icon: '🏢' },
      { path: '/articles', label: t('articles'), icon: '📚' },
      { path: '/products', label: t('products'), icon: '🛍️' }
    ];

    const profileLink = { path: '/profile', label: t('profile'), icon: '👤' };

    return {
      base: baseLinks,
      authenticated: user ? authenticatedLinks : [],
      public: publicLinks,
      profile: user ? profileLink : null
    };
  };

  const navLinks = getNavLinks();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <div className="brand-icon">
            <span className="paw-print">🐾</span>
          </div>
          <span className="brand-text">VetCard</span>
        </Link>

        <nav className="nav-links">
          {navLinks.base.map(link => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
            >
              <span className="nav-icon">{link.icon}</span>
              <span className="nav-text">{link.label}</span>
            </Link>
          ))}
          
          {navLinks.authenticated.map(link => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
            >
              <span className="nav-icon">{link.icon}</span>
              <span className="nav-text">{link.label}</span>
            </Link>
          ))}
          
          {navLinks.public.map(link => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
            >
              <span className="nav-icon">{link.icon}</span>
              <span className="nav-text">{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="navbar-auth">
          <LanguageSwitcher />
          
          {user ? (
            <div className="user-menu">
              <button 
                className="user-button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <div className="user-avatar">
                  {user.first_name ? user.first_name[0].toUpperCase() : 'U'}
                </div>
                <span className="user-name">
                  {user.first_name || user.username}
                </span>
                <span className="dropdown-arrow">▼</span>
              </button>
              
              {isUserMenuOpen && (
                <div className="dropdown-menu">
                  <div className="dropdown-header">
                    <span className="user-full-name">
                      {user.first_name && user.last_name 
                        ? `${user.first_name} ${user.last_name}`
                        : user.username
                      }
                    </span>
                    <span className="user-email">{user.email}</span>
                  </div>
                  <div className="dropdown-divider"></div>
                  
                  {navLinks.profile && (
                    <Link 
                      to={navLinks.profile.path}
                      className="dropdown-item"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <span className="dropdown-icon">{navLinks.profile.icon}</span>
                      {navLinks.profile.label}
                    </Link>
                  )}
                  
                  <button 
                    className="dropdown-item"
                    onClick={() => {
                      localStorage.clear();
                      window.location.reload();
                    }}
                  >
                    <span className="dropdown-icon">🔄</span>
                    Очистить токен
                  </button>
                  
                  <button 
                    className="dropdown-item"
                    onClick={handleLogout}
                  >
                    <span className="dropdown-icon">🚪</span>
                    {t('logout')}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              className="auth-button"
              onClick={onAuthClick}
            >
              <span className="auth-icon">🔐</span>
              <span className="auth-text">{t('login')}</span>
            </button>
          )}
        </div>

        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Мобильное меню */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-nav-links">
            {navLinks.base.map(link => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="nav-icon">{link.icon}</span>
                <span className="nav-text">{link.label}</span>
              </Link>
            ))}
            
            {navLinks.authenticated.map(link => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="nav-icon">{link.icon}</span>
                <span className="nav-text">{link.label}</span>
              </Link>
            ))}
            
            {navLinks.public.map(link => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="nav-icon">{link.icon}</span>
                <span className="nav-text">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 