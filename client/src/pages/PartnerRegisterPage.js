import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import PartnerRegisterForm from '../components/PartnerRegisterForm';
import './PartnerRegisterPage.css';

const PartnerRegisterPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleClose = () => {
    navigate('/');
  };

  const handleSwitchToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="partner-register-page">
      <div className="page-background">
        <div className="background-overlay"></div>
      </div>
      
      <div className="page-content">
        <div className="content-wrapper">
          <div className="page-header">
            <button className="back-btn" onClick={handleClose}>
              ← {t('back')}
            </button>
            <div className="header-info">
              <h1>{t('partnerRegistration')}</h1>
              <p>{t('partnerRegistrationSubtitle')}</p>
            </div>
          </div>

          <div className="benefits-section">
            <h2>{t('whyBecomePartner')}</h2>
            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon">📈</div>
                <h3>{t('clientBaseGrowth')}</h3>
                <p>{t('clientBaseGrowthDesc')}</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🎯</div>
                <h3>{t('targetedAdvertising')}</h3>
                <p>{t('targetedAdvertisingDesc')}</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">⭐</div>
                <h3>{t('reputationBoost')}</h3>
                <p>{t('reputationBoostDesc')}</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">📱</div>
                <h3>{t('easyManagement')}</h3>
                <p>{t('easyManagementDesc')}</p>
              </div>
            </div>
          </div>

          <div className="form-section">
            <PartnerRegisterForm 
              onClose={handleClose}
              onSwitchToLogin={handleSwitchToLogin}
            />
          </div>

          <div className="contact-section">
            <h2>{t('haveQuestions')}</h2>
            <p>{t('contactForInfo')}</p>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <span>{t('emailContact')}</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <span>{t('phoneContact')}</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">💬</span>
                <span>{t('telegramContact')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerRegisterPage; 