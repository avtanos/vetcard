import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import LoadingSpinner from '../components/LoadingSpinner';
import './Products.css';

const Products = () => {
  const { t } = useLanguage();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPartner, setSelectedPartner] = useState('all');

  // Моковые данные товаров и услуг
  const mockProducts = [
    {
      id: 1,
      name: 'Премиум корм для собак',
      type: 'product',
      category: 'food',
      partner: 'Зоомагазин "Питомец"',
      price: 2500,
      currency: 'сом',
      description: 'Высококачественный корм для собак всех пород. Содержит все необходимые витамины и минералы.',
      image: '🦴',
      rating: 4.8,
      reviews: 156,
      inStock: true,
      discount: 10
    },
    {
      id: 2,
      name: 'Ветеринарный осмотр',
      type: 'service',
      category: 'health',
      partner: 'Ветеринарная клиника "Добрый доктор"',
      price: 1500,
      currency: 'сом',
      description: 'Полный осмотр питомца с консультацией ветеринара. Включает измерение температуры, осмотр ушей, глаз, зубов.',
      image: '🏥',
      rating: 4.9,
      reviews: 234,
      inStock: true
    },
    {
      id: 3,
      name: 'Игрушка для кошек "Мышка"',
      type: 'product',
      category: 'toys',
      partner: 'Зоомагазин "Дружок"',
      price: 450,
      currency: 'сом',
      description: 'Интерактивная игрушка для кошек с пищалкой. Развивает охотничьи инстинкты.',
      image: '🐭',
      rating: 4.6,
      reviews: 89,
      inStock: true
    },
    {
      id: 4,
      name: 'Груминг собак',
      type: 'service',
      category: 'grooming',
      partner: 'Груминг-салон "Красавчик"',
      price: 3000,
      currency: 'сом',
      description: 'Полный груминг: мытье, стрижка, обработка когтей, чистка ушей. Для собак всех пород.',
      image: '✂️',
      rating: 4.7,
      reviews: 178,
      inStock: true
    },
    {
      id: 5,
      name: 'Витамины для кошек',
      type: 'product',
      category: 'vitamins',
      partner: 'Зоомагазин "Питомец"',
      price: 1200,
      currency: 'сом',
      description: 'Комплекс витаминов для поддержания здоровья кошек. Укрепляет иммунитет и шерсть.',
      image: '💊',
      rating: 4.5,
      reviews: 67,
      inStock: true,
      discount: 15
    },
    {
      id: 6,
      name: 'Вакцинация от бешенства',
      type: 'service',
      category: 'health',
      partner: 'Ветеринарная клиника "Айболит"',
      price: 800,
      currency: 'сом',
      description: 'Вакцинация от бешенства с оформлением ветеринарного паспорта.',
      image: '💉',
      rating: 4.8,
      reviews: 312,
      inStock: true
    },
    {
      id: 7,
      name: 'Лежанка для питомца',
      type: 'product',
      category: 'accessories',
      partner: 'Зоомагазин "Дружок"',
      price: 3500,
      currency: 'сом',
      description: 'Мягкая лежанка для собак и кошек. Ортопедическая основа, съемный чехол.',
      image: '🛏️',
      rating: 4.4,
      reviews: 45,
      inStock: false
    },
    {
      id: 8,
      name: 'Дрессировка собак',
      type: 'service',
      category: 'training',
      partner: 'Кинологический центр "Умная собака"',
      price: 5000,
      currency: 'сом',
      description: 'Индивидуальные занятия по дрессировке. Базовые команды, коррекция поведения.',
      image: '🎾',
      rating: 4.9,
      reviews: 98,
      inStock: true
    }
  ];

  const categories = [
    { value: 'all', label: 'Все товары', icon: '🛍️' },
    { value: 'food', label: 'Корма', icon: '🦴' },
    { value: 'toys', label: 'Игрушки', icon: '🎾' },
    { value: 'accessories', label: 'Аксессуары', icon: '🦮' },
    { value: 'vitamins', label: 'Витамины', icon: '💊' },
    { value: 'health', label: 'Здоровье', icon: '🏥' },
    { value: 'grooming', label: 'Груминг', icon: '✂️' },
    { value: 'training', label: 'Дрессировка', icon: '🎓' }
  ];

  const partners = [
    { value: 'all', label: 'Все партнеры' },
    { value: 'Зоомагазин "Питомец"', label: 'Зоомагазин "Питомец"' },
    { value: 'Ветеринарная клиника "Добрый доктор"', label: 'Ветеринарная клиника "Добрый доктор"' },
    { value: 'Зоомагазин "Дружок"', label: 'Зоомагазин "Дружок"' },
    { value: 'Груминг-салон "Красавчик"', label: 'Груминг-салон "Красавчик"' },
    { value: 'Ветеринарная клиника "Айболит"', label: 'Ветеринарная клиника "Айболит"' },
    { value: 'Кинологический центр "Умная собака"', label: 'Кинологический центр "Умная собака"' }
  ];

  useEffect(() => {
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, [mockProducts]);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesPartner = selectedPartner === 'all' || product.partner === selectedPartner;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesPartner && matchesSearch;
  });

  const getCategoryIcon = (category) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.icon : '📦';
  };

  const getCategoryLabel = (category) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.label : 'Товар';
  };

  const formatPrice = (price, currency) => {
    return `${price.toLocaleString()} ${currency}`;
  };

  const getDiscountedPrice = (price, discount) => {
    return price * (1 - discount / 100);
  };

  if (loading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <div className="products-container">
      <div className="products-header">
        <h1>{t('products')}</h1>
        <p>Товары и услуги от проверенных партнеров</p>
      </div>

      <div className="products-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Поиск товаров и услуг..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filters-row">
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category.value}
                className={`filter-btn ${selectedCategory === category.value ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.value)}
              >
                {category.icon} {category.label}
              </button>
            ))}
          </div>
          
          <div className="partner-filter">
            <select
              value={selectedPartner}
              onChange={(e) => setSelectedPartner(e.target.value)}
              className="partner-select"
            >
              {partners.map(partner => (
                <option key={partner.value} value={partner.value}>
                  {partner.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="products-stats">
        <div className="stat-item">
          <span className="stat-number">{products.length}</span>
          <span className="stat-label">Всего товаров</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{products.filter(p => p.type === 'product').length}</span>
          <span className="stat-label">Товары</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{products.filter(p => p.type === 'service').length}</span>
          <span className="stat-label">Услуги</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{products.filter(p => p.inStock).length}</span>
          <span className="stat-label">В наличии</span>
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <span className="product-icon">{product.image}</span>
              {product.discount && (
                <div className="discount-badge">
                  -{product.discount}%
                </div>
              )}
              {!product.inStock && (
                <div className="out-of-stock-badge">
                  Нет в наличии
                </div>
              )}
            </div>
            
            <div className="product-content">
              <div className="product-meta">
                <span className="product-type">
                  {product.type === 'product' ? '🛍️ Товар' : '🔧 Услуга'}
                </span>
                <span className="product-category">
                  {getCategoryIcon(product.category)} {getCategoryLabel(product.category)}
                </span>
              </div>
              
              <h3 className="product-title">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              
              <div className="product-partner">
                <span className="partner-icon">🏢</span>
                <span>{product.partner}</span>
              </div>
              
              <div className="product-rating">
                <span className="stars">{'⭐'.repeat(Math.floor(product.rating))}</span>
                <span className="rating-text">{product.rating} ({product.reviews} отзывов)</span>
              </div>
              
              <div className="product-price">
                {product.discount ? (
                  <div className="price-with-discount">
                    <span className="original-price">{formatPrice(product.price, product.currency)}</span>
                    <span className="discounted-price">
                      {formatPrice(getDiscountedPrice(product.price, product.discount), product.currency)}
                    </span>
                  </div>
                ) : (
                  <span className="price">{formatPrice(product.price, product.currency)}</span>
                )}
              </div>
            </div>
            
            <div className="product-actions">
              <button className="action-btn primary" disabled={!product.inStock}>
                {product.type === 'product' ? '🛒 Купить' : '📅 Записаться'}
              </button>
              <button className="action-btn secondary">
                💬 Связаться
              </button>
              <button className="action-btn secondary">
                📍 Адрес
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="no-products">
          <p>Товары не найдены</p>
          <button 
            className="reset-filters-btn"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedPartner('all');
            }}
          >
            Сбросить фильтры
          </button>
        </div>
      )}
    </div>
  );
};

export default Products; 