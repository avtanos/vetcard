import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import './LoadingSpinner.css';

const LoadingSpinner = ({ text }) => {
  const { t } = useLanguage();
  
  return (
    <div className="loading-spinner">
      <div className="loader"></div>
      
      <p className="loading-text">
        {text || t('loading')}
      </p>
      

    </div>
  );
};

export default LoadingSpinner; 