import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const { currentLanguage, changeLanguage, availableLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languageNames = {
    ru: 'Русский',
    ky: 'Кыргызча',
    en: 'English'
  };

  // const languageFlags = {
  //   ru: '🇷🇺',
  //   ky: '🇰🇬',
  //   en: '🇺🇸'
  // };

  const handleLanguageChange = (language) => {
    changeLanguage(language);
    setIsOpen(false);
  };

  return (
    <div className="language-switcher">
      <button 
        className="language-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="language-name">{languageNames[currentLanguage]}</span>
        <span className="language-arrow">▼</span>
      </button>
      
      {isOpen && (
        <div className="language-dropdown">
          {availableLanguages.map(language => (
            <button
              key={language}
              className={`language-option ${currentLanguage === language ? 'active' : ''}`}
              onClick={() => handleLanguageChange(language)}
            >
              <span className="language-name">{languageNames[language]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher; 