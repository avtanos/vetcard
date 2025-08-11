import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import './Assistant.css';
import './Assistant.css';

const Assistant = () => {
  const { user, token } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Отладочный лог
  console.log('Assistant component rendered', { 
    messagesCount: messages.length, 
    inputMessage, 
    loading, 
    error 
  });

  // Автоматическая прокрутка к последнему сообщению
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Приветственное сообщение при загрузке
  useEffect(() => {
    setMessages([
      {
        id: 1,
        type: 'assistant',
        content: 'Привет! Я ваш ветеринарный ассистент. Могу помочь с вопросами о здоровье питомцев, питании, уходе и ветеринарных процедурах. Как я могу вам помочь?',
        timestamp: new Date(),
        suggestions: ['Здоровье питомца', 'Питание', 'Вакцинация', 'Поведение', 'Уход за шерстью', 'Первая помощь']
      }
    ]);
  }, []);

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setLoading(true);
    setError('');
    setIsTyping(true);

    try {
      // Получаем данные о питомцах пользователя для контекста
      let pets = [];
      try {
        const petsResponse = await fetch('http://localhost:8000/api/pets/', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (petsResponse.ok) {
          const petsData = await petsResponse.json();
          pets = petsData.results || petsData;
        } else if (petsResponse.status === 401) {
          // Если токен недействителен, просто продолжаем без контекста питомцев
          console.log('Токен недействителен, продолжаем без контекста питомцев');
        }
      } catch (error) {
        console.log('Не удалось загрузить питомцев для контекста');
      }

      const response = await fetch('http://localhost:5000/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          userContext: {
            user: user?.username,
            pets: pets
          }
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const assistantMessage = {
          id: Date.now() + 1,
          type: 'assistant',
          content: data.message,
          timestamp: new Date(),
          messageType: data.type,
          suggestions: data.suggestions || []
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error('Ошибка при отправке сообщения');
      }
    } catch (error) {
      console.error('Chat error:', error);
      setError('Произошла ошибка при отправке сообщения. Попробуйте еще раз.');
      
      const errorMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: 'Извините, произошла ошибка при обработке вашего сообщения. Попробуйте еще раз или обратитесь к ветеринару.',
        timestamp: new Date(),
        messageType: 'error'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loading && inputMessage.trim()) {
      sendMessage(inputMessage);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    sendMessage(suggestion);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const clearChat = () => {
    setMessages([
      {
        id: Date.now(),
        type: 'assistant',
        content: 'Чат очищен. Чем могу помочь?',
        timestamp: new Date(),
        suggestions: ['Здоровье питомца', 'Питание', 'Вакцинация', 'Поведение']
      }
    ]);
  };

  return (
    <div className="assistant-page">
      <div className="assistant-container">
        <div className="assistant-header">
          <div className="header-content">
            <div className="header-icon">🤖</div>
            <div className="header-text">
              <h1>Ветеринарный ассистент</h1>
              <p>Задайте вопрос о здоровье вашего питомца</p>
            </div>
          </div>
          <div className="header-actions">
            <button 
              className="clear-chat-btn"
              onClick={clearChat}
              title="Очистить чат"
            >
              🗑️
            </button>
          </div>
        </div>

        <div className="chat-container" style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column',
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          border: '1px solid #f0f0f0'
        }}>
          <div className="messages-container" style={{
            flex: 1,
            padding: '1.5rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            background: '#fafbfc'
          }}>
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.type}`}>
                <div className="message-avatar">
                  {message.type === 'user' ? '👤' : '🤖'}
                </div>
                <div className="message-content-wrapper">
                  <div className={`message-content ${message.messageType || 'info'}`}>
                    <div className="message-text">{message.content}</div>
                    <div className="message-time">{formatTime(message.timestamp)}</div>
                  </div>
                  
                  {message.suggestions && message.suggestions.length > 0 && (
                    <div className="message-suggestions">
                      {message.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          className="suggestion-btn"
                          onClick={() => handleSuggestionClick(suggestion)}
                          disabled={loading}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message assistant">
                <div className="message-avatar">🤖</div>
                <div className="message-content-wrapper">
                  <div className="message-content info">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="message-input-form" style={{
            padding: '1.5rem',
            background: 'white',
            borderTop: '1px solid #e9ecef',
            border: '2px solid #667eea', /* Добавляем яркую границу */
            borderRadius: '0 0 20px 20px'
          }}>
            <div className="input-container" style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'flex-end'
            }}>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Введите ваш вопрос..."
                disabled={loading}
                className="message-input"
                style={{ 
                  flex: 1,
                  border: '2px solid #e1e5e9',
                  backgroundColor: 'white',
                  color: '#333',
                  fontSize: '1rem',
                  padding: '1rem 1.5rem',
                  borderRadius: '25px',
                  minHeight: '50px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' /* Добавляем тень */
                }}
              />
              <button
                type="submit"
                disabled={loading || !inputMessage.trim()}
                className="send-button"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                  transition: 'all 0.3s ease'
                }}
              >
                {loading ? (
                  <div style={{ width: '20px', height: '20px' }}>
                    <div style={{
                      width: '100%',
                      height: '100%',
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderTop: '2px solid white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}></div>
                  </div>
                ) : '📤'}
              </button>
            </div>
          </form>
        </div>

        <div className="assistant-info">
          <div className="info-header">
            <h3>💡 Что я могу помочь:</h3>
          </div>
          <div className="capabilities">
            <div className="capability">
              <span className="capability-icon">🏥</span>
              <div className="capability-text">
                <span className="capability-title">Симптомы и болезни</span>
                <span className="capability-desc">Помогу определить возможные причины недомогания</span>
              </div>
            </div>
            <div className="capability">
              <span className="capability-icon">🍽️</span>
              <div className="capability-text">
                <span className="capability-title">Питание и кормление</span>
                <span className="capability-desc">Советы по правильному питанию для разных животных</span>
              </div>
            </div>
            <div className="capability">
              <span className="capability-icon">💉</span>
              <div className="capability-text">
                <span className="capability-title">Вакцинация</span>
                <span className="capability-desc">Информация о необходимых прививках и графиках</span>
              </div>
            </div>
            <div className="capability">
              <span className="capability-icon">🐾</span>
              <div className="capability-text">
                <span className="capability-title">Поведение и уход</span>
                <span className="capability-desc">Советы по воспитанию и уходу за питомцем</span>
              </div>
            </div>
          </div>
          <div className="disclaimer">
            <span className="disclaimer-icon">⚠️</span>
            <p>Важно: Я предоставляю общие советы. Для точной диагностики и лечения обратитесь к ветеринару.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assistant; 