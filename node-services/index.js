const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// AI Chat Logic
class VetAI {
  constructor() {
    this.context = {
      user: null,
      pets: [],
      conversation_history: []
    };
  }

  // Базовые ответы для ветеринарных вопросов
  getBasicResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Симптомы и болезни
    if (lowerMessage.includes('рвота') || lowerMessage.includes('тошнота')) {
      return {
        type: 'warning',
        message: 'Рвота может быть симптомом различных заболеваний. Рекомендую обратиться к ветеринару в течение 24 часов, особенно если рвота повторяется или сопровождается другими симптомами.',
        suggestions: ['Записаться к ветеринару', 'Проверить аппетит', 'Наблюдать за поведением']
      };
    }

    if (lowerMessage.includes('понос') || lowerMessage.includes('диарея')) {
      return {
        type: 'warning',
        message: 'Диарея может быть вызвана неправильным питанием, инфекцией или паразитами. Обеспечьте питомцу доступ к воде и обратитесь к ветеринару.',
        suggestions: ['Обеспечить обильное питье', 'Проверить стул', 'Записаться к ветеринару']
      };
    }

    if (lowerMessage.includes('кашель') || lowerMessage.includes('чихание')) {
      return {
        type: 'info',
        message: 'Кашель и чихание могут указывать на респираторные проблемы. Если симптомы не проходят в течение 2-3 дней, обратитесь к ветеринару.',
        suggestions: ['Наблюдать за дыханием', 'Проверить температуру', 'Записаться к ветеринару']
      };
    }

    // Питание
    if (lowerMessage.includes('корм') || lowerMessage.includes('питание') || lowerMessage.includes('еда')) {
      return {
        type: 'info',
        message: 'Правильное питание важно для здоровья питомца. Рекомендую кормить качественным кормом, соответствующим возрасту и размеру питомца.',
        suggestions: ['Выбрать подходящий корм', 'Соблюдать режим питания', 'Консультация с ветеринаром']
      };
    }

    // Вакцинация
    if (lowerMessage.includes('прививк') || lowerMessage.includes('вакцин')) {
      return {
        type: 'info',
        message: 'Регулярная вакцинация защищает питомца от опасных заболеваний. График вакцинации зависит от возраста и вида питомца.',
        suggestions: ['Проверить график прививок', 'Записаться на вакцинацию', 'Узнать о необходимых прививках']
      };
    }

    // Поведение
    if (lowerMessage.includes('агрессия') || lowerMessage.includes('агрессивн')) {
      return {
        type: 'warning',
        message: 'Агрессивное поведение может иметь различные причины. Рекомендую проконсультироваться с ветеринаром или зоопсихологом.',
        suggestions: ['Наблюдать за триггерами', 'Консультация специалиста', 'Создать спокойную обстановку']
      };
    }

    if (lowerMessage.includes('апатия') || lowerMessage.includes('вялость')) {
      return {
        type: 'warning',
        message: 'Апатия и вялость могут быть симптомами заболевания. Если состояние не улучшается, обратитесь к ветеринару.',
        suggestions: ['Проверить аппетит', 'Измерить температуру', 'Записаться к ветеринару']
      };
    }

    // Общие советы
    if (lowerMessage.includes('здоровье') || lowerMessage.includes('уход')) {
      return {
        type: 'info',
        message: 'Для поддержания здоровья питомца важно: регулярные осмотры у ветеринара, правильное питание, физическая активность и гигиена.',
        suggestions: ['Запланировать осмотр', 'Проверить питание', 'Увеличить активность']
      };
    }

    // Приветствие
    if (lowerMessage.includes('привет') || lowerMessage.includes('здравствуй')) {
      return {
        type: 'greeting',
        message: 'Привет! Я ваш ветеринарный ассистент. Могу помочь с вопросами о здоровье питомцев, питании, уходе и ветеринарных процедурах. Как я могу вам помочь?',
        suggestions: ['Здоровье питомца', 'Питание', 'Вакцинация', 'Поведение']
      };
    }

    // По умолчанию
    return {
      type: 'info',
      message: 'Спасибо за ваш вопрос! Для получения точной информации о здоровье вашего питомца рекомендую обратиться к ветеринару. Я могу помочь с общими советами по уходу.',
      suggestions: ['Записаться к ветеринару', 'Общие советы по уходу', 'Проверить симптомы']
    };
  }

  // Обработка сообщения с контекстом
  async processMessage(message, userContext = {}) {
    // Обновляем контекст
    this.context = { ...this.context, ...userContext };
    
    // Добавляем сообщение в историю
    this.context.conversation_history.push({
      role: 'user',
      content: message,
      timestamp: new Date()
    });

    // Получаем базовый ответ
    const response = this.getBasicResponse(message);
    
    // Добавляем ответ в историю
    this.context.conversation_history.push({
      role: 'assistant',
      content: response.message,
      timestamp: new Date()
    });

    // Ограничиваем историю последними 10 сообщениями
    if (this.context.conversation_history.length > 10) {
      this.context.conversation_history = this.context.conversation_history.slice(-10);
    }

    return {
      ...response,
      context: {
        pets_count: this.context.pets?.length || 0,
        conversation_length: this.context.conversation_history.length
      }
    };
  }

  // Получение контекста пользователя
  getContext() {
    return this.context;
  }
}

const vetAI = new VetAI();

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', service: 'VetCard AI Services' });
});

// AI Chat endpoint
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { message, userContext } = req.body;
    
    if (!message || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const response = await vetAI.processMessage(message, userContext);
    
    res.json(response);
  } catch (error) {
    console.error('AI Chat error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Произошла ошибка при обработке сообщения'
    });
  }
});

// Get AI context
app.get('/api/ai/context', (req, res) => {
  try {
    const context = vetAI.getContext();
    res.json(context);
  } catch (error) {
    console.error('Get context error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('🔌 New client connected:', socket.id);

  socket.on('join_room', (room) => {
    socket.join(room);
    console.log(`👥 User joined room: ${room}`);
  });

  socket.on('leave_room', (room) => {
    socket.leave(room);
    console.log(`👋 User left room: ${room}`);
  });

  socket.on('disconnect', () => {
    console.log('🔌 Client disconnected:', socket.id);
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`🚀 VetCard Node.js Services running on port ${PORT}`);
  console.log(`📡 Socket.io server ready for real-time features`);
  console.log(`🤖 AI Bot endpoint: http://localhost:${PORT}/api/ai/chat`);
});

module.exports = { app, io, vetAI }; 