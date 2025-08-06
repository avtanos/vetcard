import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import './LoadingSpinner.css';

const LoadingSpinner = ({ text }) => {
  const { t } = useLanguage();
  
  return (
    <div className="loading-spinner">
      <div className="spinner">
        <div className="dog-loader">
          <div className="dog-head">
            <div className="dog-ear left"></div>
            <div className="dog-ear right"></div>
            <div className="dog-eye left"></div>
            <div className="dog-eye right"></div>
            <div className="dog-nose"></div>
          </div>
          <div className="dog-body">
            <div className="dog-leg front-left"></div>
            <div className="dog-leg front-right"></div>
            <div className="dog-leg back-left"></div>
            <div className="dog-leg back-right"></div>
            <div className="dog-tail"></div>
          </div>
        </div>
      </div>
      
      <p className="loading-text">
        {text || t('loading')}
      </p>
      
      <div className="loading-paws">
        <div className="loading-paw"></div>
        <div className="loading-paw"></div>
        <div className="loading-paw"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner; 