import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import PartnerRegisterForm from './PartnerRegisterForm';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose, initialForm = 'login' }) => {
  const [currentForm, setCurrentForm] = useState(initialForm); // 'login', 'register', 'partner'

  if (!isOpen) return null;

  const handleSwitchToRegister = () => {
    setCurrentForm('register');
  };

  const handleSwitchToPartner = () => {
    setCurrentForm('partner');
  };

  const handleSwitchToLogin = () => {
    setCurrentForm('login');
  };

  const handleClose = () => {
    setCurrentForm('login'); // Сбрасываем к форме входа при закрытии
    onClose();
  };

  const renderForm = () => {
    switch (currentForm) {
      case 'login':
        return (
          <LoginForm 
            onClose={handleClose} 
            onSwitchToRegister={handleSwitchToRegister}
            onSwitchToPartner={handleSwitchToPartner}
          />
        );
      case 'register':
        return (
          <RegisterForm 
            onClose={handleClose} 
            onSwitchToLogin={handleSwitchToLogin}
            onSwitchToPartner={handleSwitchToPartner}
          />
        );
      case 'partner':
        return (
          <PartnerRegisterForm 
            onClose={handleClose} 
            onSwitchToLogin={handleSwitchToLogin}
          />
        );
      default:
        return (
          <LoginForm 
            onClose={handleClose} 
            onSwitchToRegister={handleSwitchToRegister}
            onSwitchToPartner={handleSwitchToPartner}
          />
        );
    }
  };

  return (
    <div className="auth-modal-overlay" onClick={handleClose}>
      <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
        {renderForm()}
      </div>
    </div>
  );
};

export default AuthModal; 