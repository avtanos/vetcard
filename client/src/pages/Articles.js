import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import LoadingSpinner from '../components/LoadingSpinner';
import './Articles.css';

const Articles = () => {
  const { t } = useLanguage();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Моковые данные статей
  const mockArticles = [
    {
      id: 1,
      title: 'Как правильно ухаживать за щенком',
      category: 'care',
      author: 'Доктор Иванов',
      date: '2024-02-10',
      readTime: '5 мин',
      image: '🐕',
      excerpt: 'Основные правила ухода за щенком в первые месяцы жизни. Питание, гигиена, воспитание.',
      tags: ['щенок', 'уход', 'воспитание'],
      views: 1247,
      likes: 89
    },
    {
      id: 2,
      title: 'Вакцинация домашних животных: полное руководство',
      category: 'health',
      author: 'Ветеринар Петрова',
      date: '2024-02-08',
      readTime: '8 мин',
      image: '💉',
      excerpt: 'Все о вакцинации: календарь прививок, подготовка, возможные реакции и осложнения.',
      tags: ['вакцинация', 'здоровье', 'прививки'],
      views: 2156,
      likes: 156
    },
    {
      id: 3,
      title: 'Питание кошек: что можно и что нельзя',
      category: 'nutrition',
      author: 'Диетолог Сидорова',
      date: '2024-02-05',
      readTime: '6 мин',
      image: '🐱',
      excerpt: 'Правильное питание кошек. Запрещенные продукты, полезные добавки, режим кормления.',
      tags: ['питание', 'кошки', 'диета'],
      views: 1893,
      likes: 134
    },
    {
      id: 4,
      title: 'Первая помощь питомцу: что делать в экстренных случаях',
      category: 'emergency',
      author: 'Ветеринар Козлов',
      date: '2024-02-03',
      readTime: '10 мин',
      image: '🚨',
      excerpt: 'Экстренная помощь животным. Симптомы опасных состояний и алгоритм действий.',
      tags: ['первая помощь', 'экстренная помощь', 'здоровье'],
      views: 3421,
      likes: 267
    },
    {
      id: 5,
      title: 'Дрессировка собак: основы и секреты успеха',
      category: 'training',
      author: 'Кинолог Николаева',
      date: '2024-02-01',
      readTime: '12 мин',
      image: '🎾',
      excerpt: 'Основы дрессировки собак. Команды, методы обучения, типичные ошибки владельцев.',
      tags: ['дрессировка', 'обучение', 'команды'],
      views: 1678,
      likes: 98
    },
    {
      id: 6,
      title: 'Груминг в домашних условиях',
      category: 'grooming',
      author: 'Грумер Морозова',
      date: '2024-01-28',
      readTime: '7 мин',
      image: '✂️',
      excerpt: 'Уход за шерстью, стрижка когтей, чистка ушей и зубов в домашних условиях.',
      tags: ['груминг', 'уход', 'гигиена'],
      views: 1456,
      likes: 112
    }
  ];

  const categories = [
    { value: 'all', label: 'Все статьи', icon: '📚' },
    { value: 'care', label: 'Уход', icon: '🛁' },
    { value: 'health', label: 'Здоровье', icon: '🏥' },
    { value: 'nutrition', label: 'Питание', icon: '🍽️' },
    { value: 'training', label: 'Дрессировка', icon: '🎾' },
    { value: 'grooming', label: 'Груминг', icon: '✂️' },
    { value: 'emergency', label: 'Экстренная помощь', icon: '🚨' }
  ];

  useEffect(() => {
    setTimeout(() => {
      setArticles(mockArticles);
      setLoading(false);
    }, 1000);
  }, [mockArticles]);

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.icon : '📄';
  };

  const getCategoryLabel = (category) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.label : 'Статья';
  };

  if (loading) {
    return (
      <div className="articles-container">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="articles-container">
      <div className="articles-header">
        <h1>{t('articles')}</h1>
        <p>Полезные статьи о здоровье и уходе за домашними животными</p>
      </div>

      <div className="articles-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Поиск статей..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category.value}
              className={`category-btn ${selectedCategory === category.value ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.value)}
            >
              {category.icon} {category.label}
            </button>
          ))}
        </div>
      </div>

      <div className="articles-stats">
        <div className="stat-item">
          <span className="stat-number">{articles.length}</span>
          <span className="stat-label">Всего статей</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{filteredArticles.length}</span>
          <span className="stat-label">Найдено</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{Math.round(articles.reduce((sum, article) => sum + article.views, 0) / 1000)}K</span>
          <span className="stat-label">Просмотров</span>
        </div>
      </div>

      <div className="articles-grid">
        {filteredArticles.map(article => (
          <div key={article.id} className="article-card">
            <div className="article-image">
              <span className="article-icon">{article.image}</span>
            </div>
            
            <div className="article-content">
              <div className="article-meta">
                <span className="article-category">
                  {getCategoryIcon(article.category)} {getCategoryLabel(article.category)}
                </span>
                <span className="article-date">
                  📅 {new Date(article.date).toLocaleDateString()}
                </span>
              </div>
              
              <h3 className="article-title">{article.title}</h3>
              <p className="article-excerpt">{article.excerpt}</p>
              
              <div className="article-tags">
                {article.tags.map(tag => (
                  <span key={tag} className="tag">#{tag}</span>
                ))}
              </div>
              
              <div className="article-footer">
                <div className="article-author">
                  <span className="author-icon">👤</span>
                  <span>{article.author}</span>
                </div>
                
                <div className="article-stats">
                  <span className="read-time">⏱️ {article.readTime}</span>
                  <span className="views">👁️ {article.views}</span>
                  <span className="likes">❤️ {article.likes}</span>
                </div>
              </div>
            </div>
            
            <div className="article-actions">
              <button className="action-btn read">
                📖 Читать
              </button>
              <button className="action-btn bookmark">
                🔖 Сохранить
              </button>
              <button className="action-btn share">
                📤 Поделиться
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="no-articles">
          <p>Статьи не найдены</p>
          <button 
            className="reset-filters-btn"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
          >
            Сбросить фильтры
          </button>
        </div>
      )}
    </div>
  );
};

export default Articles; 