# 🐾 VetCard

**Умный помощник по здоровью питомцев**

> 🌐 **[Демо приложения](https://avtanos.github.io/vetcard)** | 📚 **[Документация](https://avtanos.github.io/vetcard/docs)**

VetCard — это комплексная платформа для управления здоровьем домашних животных.

## 🌟 Особенности

### 🏥 Основной функционал
- **Цифровые медицинские карты** питомцев
- **AI-ассистент** для консультаций по здоровью
- **Система напоминаний** о вакцинации и процедурах
- **База знаний** с полезными статьями
- **Каталог товаров и услуг** от партнеров

### 🎨 Пользовательский интерфейс
- **Адаптивный дизайн** для всех устройств
- **Мультиязычность** (Русский, Кыргызча, English)
- **Темная тема** поддержка
- **Красивые анимации** и интерактивные элементы

### 🔐 Безопасность
- **JWT аутентификация**
- **Защищенные маршруты**
- **Валидация данных**

## 🏗️ Архитектура проекта

```
vetcard/
├── client/          # React фронтенд
├── server/          # Django API
├── node-services/   # Node.js микросервисы
└── venv/           # Python виртуальное окружение
```

### 🎯 Технологический стек

#### Frontend (React)
- **React 18** с хуками
- **React Router** для навигации
- **Context API** для управления состоянием
- **Axios** для HTTP запросов
- **CSS Modules** для стилизации

#### Backend (Django)
- **Django 4.2** с REST Framework
- **SQLite** база данных
- **JWT** аутентификация
- **Pillow** для обработки изображений

#### Node.js Services
- **Express.js** API
- **Socket.io** для real-time функций
- **AI логика** для чат-бота

## 🚀 Быстрый старт

### Предварительные требования
- Node.js 16+
- Python 3.8+
- npm или yarn

### Установка

1. **Клонируйте репозиторий**
```bash
git clone https://github.com/your-username/vetcard.git
cd vetcard
```

2. **Установите зависимости**
```bash
# Установка всех зависимостей
npm run install:all

# Или по отдельности:
# Frontend
cd client && npm install

# Backend
cd server && pip install -r requirements.txt

# Node services
cd node-services && npm install
```

3. **Настройте окружение**
```bash
# Создайте .env файлы в каждой папке
cp client/.env.example client/.env
cp server/.env.example server/.env
cp node-services/.env.example node-services/.env
```

4. **Запустите проект**
```bash
# Запуск всех сервисов одновременно
npm run dev

# Или по отдельности:
# Frontend (порт 3000)
cd client && npm start

# Backend (порт 8000)
cd server && python manage.py runserver

# Node services (порт 5000)
cd node-services && npm start
```

## 📁 Структура проекта

### Frontend (`client/`)
```
client/
├── src/
│   ├── components/     # React компоненты
│   ├── pages/         # Страницы приложения
│   ├── context/       # React Context
│   ├── styles/        # CSS стили
│   └── utils/         # Утилиты
├── public/            # Статические файлы
└── package.json
```

### Backend (`server/`)
```
server/
├── vetcard/          # Основное приложение Django
├── pets/            # Приложение для питомцев
├── users/           # Приложение для пользователей
├── api/             # API endpoints
├── static/          # Статические файлы
└── requirements.txt
```

### Node Services (`node-services/`)
```
node-services/
├── src/
│   ├── routes/       # API маршруты
│   ├── services/     # Бизнес-логика
│   └── utils/        # Утилиты
├── logs/            # Логи
└── package.json
```

## 🔧 Разработка

### Доступные скрипты

```bash
# Установка всех зависимостей
npm run install:all

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build

# Запуск только клиента
npm run dev:client

# Запуск только сервера
npm run dev:server

# Запуск только Node services
npm run dev:node
```

### Переменные окружения

#### Frontend (`.env`)
```env
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_NODE_SERVICES_URL=http://localhost:5000
```

#### Backend (`.env`)
```env
SECRET_KEY=your-secret-key
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3
```

#### Node Services (`.env`)
```env
PORT=5000
NODE_ENV=development
```

## 🧪 Тестирование

```bash
# Frontend тесты
cd client && npm test

# Backend тесты
cd server && python manage.py test

# Node services тесты
cd node-services && npm test
```

## 📦 Деплой

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
```

### Backend (Heroku/DigitalOcean)
```bash
cd server
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic
```

### Node Services (Railway/Render)
```bash
cd node-services
npm install
npm start
```

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функции (`git checkout -b feature/amazing-feature`)
3. Зафиксируйте изменения (`git commit -m 'Add amazing feature'`)
4. Отправьте в ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📄 Лицензия

Этот проект лицензирован под MIT License - см. файл [LICENSE](LICENSE) для деталей.

## 👥 Команда

- **Разработчик**: [Ваше имя]
- **Дизайнер**: [Имя дизайнера]
- **Тестировщик**: [Имя тестировщика]

## 📞 Поддержка

Если у вас есть вопросы или предложения, создайте [Issue](https://github.com/your-username/vetcard/issues) или свяжитесь с нами:

- Email: support@vetcard.com
- Telegram: @vetcard_support
- Website: https://vetcard.com

## 🙏 Благодарности

- React команде за отличную библиотеку
- Django Software Foundation за мощный фреймворк
- Сообществу open source за вдохновение

---

**VetCard** - Заботимся о здоровье ваших питомцев! 🐕🐱 