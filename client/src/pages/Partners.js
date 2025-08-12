import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import LoadingSpinner from '../components/LoadingSpinner';
import './Partners.css';

const Partners = () => {
  const { t } = useLanguage();
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  // Кыргызстанские данные партнеров
  const mockPartners = [
    {
      id: 1,
      name: 'Ветеринарная клиника "Добрый доктор"',
      type: 'clinic',
      description: 'Современная ветеринарная клиника с полным спектром услуг для домашних животных. Опытные врачи, современное оборудование.',
      address: 'ул. Советская, 123, Бишкек',
      phone: '+996 (555) 123-456',
      workingHours: 'Пн-Пт 9:00-18:00, Сб 10:00-16:00',
      distance: '2.3 км',
      services: ['therapy', 'surgery', 'vaccination', 'diagnostics'],
      rating: 4.8,
      reviews: 156
    },
    {
      id: 2,
      name: 'Зоомагазин "Питомец"',
      type: 'shop',
      description: 'Большой выбор кормов, игрушек и аксессуаров для домашних животных. Консультации по уходу.',
      address: 'ул. Чуй, 45, Бишкек',
      phone: '+996 (555) 234-567',
      workingHours: 'Ежедневно 8:00-20:00',
      distance: '1.8 км',
      services: ['food', 'accessories', 'toys', 'vitamins'],
      rating: 4.6,
      reviews: 89
    },
    {
      id: 3,
      name: 'Груминг-салон "Красавчик"',
      type: 'grooming',
      description: 'Профессиональный груминг для собак и кошек. Стрижка, мытье, обработка когтей.',
      address: 'ул. Ибраимова, 78, Бишкек',
      phone: '+996 (555) 345-678',
      workingHours: 'Вт-Вс 10:00-19:00',
      distance: '3.1 км',
      services: ['grooming', 'accessories'],
      rating: 4.9,
      reviews: 203
    },
    {
      id: 4,
      name: 'Ветеринарная клиника "Айболит"',
      type: 'clinic',
      description: 'Специализированная клиника для экзотических животных и птиц. Уникальные услуги.',
      address: 'ул. Токтогула, 56, Бишкек',
      phone: '+996 (555) 456-789',
      workingHours: 'Пн-Сб 8:00-17:00',
      distance: '4.2 км',
      services: ['therapy', 'diagnostics', 'emergency'],
      rating: 4.7,
      reviews: 67
    },
    {
      id: 5,
      name: 'Зоомагазин "Дружок"',
      type: 'shop',
      description: 'Семейный зоомагазин с широким ассортиментом товаров для всех видов домашних животных.',
      address: 'ул. Московская, 234, Бишкек',
      phone: '+996 (555) 567-890',
      workingHours: 'Ежедневно 9:00-21:00',
      distance: '2.7 км',
      services: ['food', 'toys', 'accessories', 'vitamins'],
      rating: 4.5,
      reviews: 134
    },
    {
      id: 6,
      name: 'Груминг-салон "Элит"',
      type: 'grooming',
      description: 'Премиум груминг-салон с использованием профессиональной косметики и оборудования.',
      address: 'ул. Ахунбаева, 89, Бишкек',
      phone: '+996 (555) 678-901',
      workingHours: 'Ср-Вс 11:00-20:00',
      distance: '1.5 км',
      services: ['grooming', 'accessories'],
      rating: 4.8,
      reviews: 178
    }
  ];

  useEffect(() => {
    // Имитация загрузки данных
    setTimeout(() => {
      setPartners(mockPartners);
      setLoading(false);
    }, 1000);
  }, [mockPartners]);

  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         partner.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         partner.services.some(service => t(service).toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = selectedType === 'all' || partner.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getTypeColor = (type) => {
    switch (type) {
      case 'clinic': return '#667eea';
      case 'shop': return '#28a745';
      case 'grooming': return '#ffc107';
      default: return '#6c757d';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'clinic': return '🏥';
      case 'shop': return '🏪';
      case 'grooming': return '✂️';
      default: return '🏢';
    }
  };

  const stats = {
    total: partners.length,
    clinics: partners.filter(p => p.type === 'clinic').length,
    shops: partners.filter(p => p.type === 'shop').length,
    grooming: partners.filter(p => p.type === 'grooming').length
  };

  if (loading) {
    return (
      <div className="partners-container">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="partners-container">
      <div className="partners-header">
        <h1>{t('partnersTitle')}</h1>
        <p>{t('partnersSubtitle')}</p>
        <button 
          className="partner-register-btn"
          onClick={() => window.location.href = '/partner-register'}
        >
          🏢 {t('becomePartner')}
        </button>
      </div>

      <div className="partners-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder={t('search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-buttons">
          <button
            className={`filter-btn ${selectedType === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedType('all')}
          >
            {t('totalPartners')} ({stats.total})
          </button>
          <button
            className={`filter-btn ${selectedType === 'clinic' ? 'active' : ''}`}
            onClick={() => setSelectedType('clinic')}
          >
            🏥 {t('clinics')} ({stats.clinics})
          </button>
          <button
            className={`filter-btn ${selectedType === 'shop' ? 'active' : ''}`}
            onClick={() => setSelectedType('shop')}
          >
            🏪 {t('shops')} ({stats.shops})
          </button>
          <button
            className={`filter-btn ${selectedType === 'grooming' ? 'active' : ''}`}
            onClick={() => setSelectedType('grooming')}
          >
            ✂️ {t('groomingSalons')} ({stats.grooming})
          </button>
        </div>
      </div>

      <div className="partners-stats">
        <div className="stat-item">
          <span className="stat-number">{stats.total}</span>
          <span className="stat-label">{t('totalPartners')}</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{stats.clinics}</span>
          <span className="stat-label">{t('clinics')}</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{stats.shops}</span>
          <span className="stat-label">{t('shops')}</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{stats.grooming}</span>
          <span className="stat-label">{t('groomingSalons')}</span>
        </div>
      </div>

      <div className="partners-grid">
        {filteredPartners.map(partner => (
          <div key={partner.id} className="partner-card">
            <div className="partner-header">
              <div 
                className="partner-icon"
                style={{ backgroundColor: getTypeColor(partner.type) }}
              >
                {getTypeIcon(partner.type)}
              </div>
              <div className="partner-info">
                <h3 className="partner-name">{partner.name}</h3>
                <div className="partner-rating">
                  <span className="stars">{'⭐'.repeat(Math.floor(partner.rating))}</span>
                  <span className="rating-text">{partner.rating} ({partner.reviews} {t('reviews')})</span>
                </div>
              </div>
            </div>
            
            <p className="partner-description">{partner.description}</p>
            
            <div className="partner-details">
              <div className="detail-item">
                <span className="detail-icon">📍</span>
                <span>{partner.address}</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">📞</span>
                <span>{partner.phone}</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">🕒</span>
                <span>{partner.workingHours}</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">📏</span>
                <span>{partner.distance}</span>
              </div>
            </div>
            
            <div className="partner-services">
              {partner.services.map(service => (
                <span key={service} className="service-tag">
                  {t(service)}
                </span>
              ))}
            </div>
            
            <div className="partner-actions">
              <button className="action-btn primary">
                📅 {t('bookAppointment')}
              </button>
              <button className="action-btn secondary">
                🗺️ {t('getDirections')}
              </button>
              <button className="action-btn secondary">
                ⭐ {t('reviews')}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredPartners.length === 0 && (
        <div className="no-partners">
          <p>Партнеры не найдены</p>
          <button 
            className="reset-filters-btn"
            onClick={() => {
              setSearchQuery('');
              setSelectedType('all');
            }}
          >
            Сбросить фильтры
          </button>
        </div>
      )}
    </div>
  );
};

export default Partners; 