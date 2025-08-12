import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Переводы
const translations = {
  ru: {
    // Общие
    back: 'Назад',
    loading: 'Загрузка...',
    error: 'Ошибка',
    success: 'Успешно',
    cancel: 'Отмена',
    save: 'Сохранить',
    edit: 'Редактировать',
    delete: 'Удалить',
    add: 'Добавить',
    search: 'Поиск',
    filter: 'Фильтр',
    clear: 'Очистить',
    submit: 'Отправить',
    close: 'Закрыть',
    
    // Навигация
    home: 'Главная',
    myPets: 'Мои питомцы',
    assistant: 'AI-ассистент',
    partners: 'Партнеры',
    reminders: 'Напоминания',
    articles: 'Статьи',
    products: 'Товары',
    profile: 'Профиль',
    login: 'Войти',
    register: 'Регистрация',
    logout: 'Выйти',
    
    // Главная страница
    heroTitle: 'VetCard — умный помощник по здоровью питомцев',
    heroSubtitle: 'Цифровая медицинская карта, напоминания и AI‑советы — всё в одном месте',
    getStarted: 'Начать',
    learnMore: 'Узнать больше',
    
    // Регистрация партнеров
    partnerRegistration: 'Регистрация партнера',
    partnerRegistrationSubtitle: 'Присоединяйтесь к нашей сети ветеринарных клиник, зоомагазинов и груминг-салонов',
    whyBecomePartner: 'Почему стоит стать партнером?',
    clientBaseGrowth: 'Рост клиентской базы',
    clientBaseGrowthDesc: 'Получите доступ к тысячам владельцев домашних животных',
    targetedAdvertising: 'Таргетированная реклама',
    targetedAdvertisingDesc: 'Показывайте ваши услуги именно тем, кто в них нуждается',
    reputationBoost: 'Повышение репутации',
    reputationBoostDesc: 'Отзывы и рейтинги помогут привлечь новых клиентов',
    easyManagement: 'Удобное управление',
    easyManagementDesc: 'Простая система управления записями и клиентами',
    haveQuestions: 'Остались вопросы?',
    contactForInfo: 'Свяжитесь с нами для получения дополнительной информации',
    
    // Форма регистрации партнера
    basicInfo: 'Основная информация',
    organizationInfo: 'Информация об организации',
    services: 'Услуги',
    selectServices: 'Выберите услуги, которые предоставляет ваша организация',
    firstName: 'Имя',
    lastName: 'Фамилия',
    email: 'Email',
    phone: 'Телефон',
    username: 'Логин',
    password: 'Пароль',
    confirmPassword: 'Подтвердите пароль',
    organizationName: 'Название организации',
    organizationType: 'Тип организации',
    city: 'Город',
    address: 'Адрес',
    description: 'Описание организации',
    website: 'Веб-сайт',
    workingHours: 'Часы работы',
    
    // Типы организаций
    clinic: 'Ветеринарная клиника',
    shop: 'Зоомагазин',
    grooming: 'Груминг-салон',
    
    // Услуги
    therapy: 'Терапия',
    surgery: 'Хирургия',
    vaccination: 'Вакцинация',
    diagnostics: 'Диагностика',
    groomingService: 'Груминг',
    food: 'Корма',
    accessories: 'Аксессуары',
    toys: 'Игрушки',
    vitamins: 'Витамины',
    emergency: 'Экстренная помощь',
    
    // Партнеры
    partnersTitle: 'Наши партнеры',
    partnersSubtitle: 'Найдите проверенных ветеринаров, зоомагазины и груминг-салоны рядом с вами',
    becomePartner: 'Стать партнером',
    bookAppointment: 'Записаться',
    getDirections: 'Маршрут',
    reviews: 'Отзывы',
    totalPartners: 'Всего партнеров',
    clinics: 'Клиники',
    shops: 'Магазины',
    groomingSalons: 'Груминг-салоны',
    
    // Контакты
    emailContact: 'partners@vetcard.kg',
    phoneContact: '+996 (555) 123-456',
    telegramContact: 'Telegram: @vetcard_support',
    
    // Плейсхолдеры
    enterName: 'Введите ваше имя',
    enterLastName: 'Введите вашу фамилию',
    enterEmail: 'example@email.com',
    enterPhone: '+996 (555) 123-456',
    enterUsername: 'Введите логин',
    enterPassword: 'Минимум 8 символов',
    confirmPasswordPlaceholder: 'Повторите пароль',
    enterOrgName: 'Например: Ветеринарная клиника "Добрый доктор"',
    enterCity: 'Введите город',
    enterAddress: 'Улица, дом, офис',
    enterDescription: 'Расскажите о вашей организации, услугах, опыте...',
    enterWebsite: 'https://example.com',
    enterWorkingHours: 'Например: Пн-Пт 9:00-18:00, Сб 10:00-16:00',
    
    // Валидация
    required: 'обязательно',
    minLength: 'должно содержать минимум {length} символа',
    invalidEmail: 'Введите корректный email',
    invalidPhone: 'Введите корректный номер телефона',
    passwordsNotMatch: 'Пароли не совпадают',
    selectAtLeastOneService: 'Выберите хотя бы одну услугу',
    
    // Сообщения
    registrationSuccess: 'Регистрация успешна!',
    registrationError: 'Ошибка регистрации. Попробуйте еще раз.',
    loginError: 'Ошибка входа. Проверьте ваши данные.',
    
    // Кнопки
    registerBtn: 'Зарегистрироваться',
    registering: 'Регистрация...',
    loginBtn: 'Войти',
    loggingIn: 'Вход...',
    alreadyHaveAccount: 'Уже есть аккаунт?',
    createAccount: 'Создать аккаунт',
    partnerRegistrationBtn: '🏢 Регистрация партнера',
  },
  
  ky: {
    // Общие
    back: 'Артка',
    loading: 'Жүктөлүүдө...',
    error: 'Ката',
    success: 'Ийгиликтүү',
    cancel: 'Жокко чыгаруу',
    save: 'Сактоо',
    edit: 'Оңдоо',
    delete: 'Жок кылуу',
    add: 'Кошуу',
    search: 'Издөө',
    filter: 'Фильтр',
    clear: 'Тазалоо',
    submit: 'Жиберүү',
    close: 'Жабуу',
    
    // Навигация
    home: 'Башкы бет',
    myPets: 'Менин үй жаныбарларым',
    assistant: 'AI-жардамчы',
    partners: 'Өнөктөштөр',
    reminders: 'Эскертүүлөр',
    articles: 'Маалыматтар',
    products: 'Мамлекеттер',
    profile: 'Профиль',
    loginBtn: 'Кирүү',
    registerBtn: 'Катталуу',
    logout: 'Чыгуу',
    
    // Главная страница
    heroTitle: 'VetCard — үй жаныбарларынын ден соолугунун акылдуу жардамчысы',
    heroSubtitle: 'Сандык медициналык карта, эскертүүлөр жана AI‑кеңештер — баары бир жерде',
    getStarted: 'Баштоо',
    learnMore: 'Көбүрөөк билүү',
    
    // Регистрация партнеров
    partnerRegistration: 'Өнөктөштүн катталуусу',
    partnerRegistrationSubtitle: 'Ветеринардык клиникалардын, зоомагазиндердин жана груминг-салондорунун тармагына кошулуңуз',
    whyBecomePartner: 'Эмне үчүн өнөктөш болуу керек?',
    clientBaseGrowth: 'Кардарлар базасынын өсүшү',
    clientBaseGrowthDesc: 'Мингдеген үй жаныбарларынын ээлерине кириш алыңыз',
    targetedAdvertising: 'Багытталган жарнама',
    targetedAdvertisingDesc: 'Кызматтарыңызды аларга керек болгондорго көрсөтүңүз',
    reputationBoost: 'Атак-даңкты жогорулатуу',
    reputationBoostDesc: 'Пикирлер жана рейтингтер жаңы кардарларды тартууга жардам берет',
    easyManagement: 'Ыңгайлуу башкаруу',
    easyManagementDesc: 'Жазмаларды жана кардарларды башкаруунун жөнөкөй системасы',
    haveQuestions: 'Суроолоруңуз барбы?',
    contactForInfo: 'Кошумча маалымат алуу үчүн биз менен байланышыңыз',
    
    // Форма регистрации партнера
    basicInfo: 'Негизги маалымат',
    organizationInfo: 'Уюм тууралуу маалымат',
    services: 'Кызматтар',
    selectServices: 'Уюмуңуз көрсөткөн кызматтарды тандаңыз',
    firstName: 'Аты',
    lastName: 'Фамилиясы',
    email: 'Email',
    phone: 'Телефон',
    username: 'Логин',
    password: 'Сыр сөз',
    confirmPassword: 'Сыр сөздү ырастаңыз',
    organizationName: 'Уюмдун аталышы',
    organizationType: 'Уюмдун түрү',
    city: 'Шаар',
    address: 'Дарек',
    description: 'Уюм тууралуу сүрөттөмө',
    website: 'Веб-сайт',
    workingHours: 'Жумуш сааттары',
    
    // Типы организаций
    clinic: 'Ветеринардык клиника',
    shop: 'Зоомагазин',
    grooming: 'Груминг-салон',
    
    // Услуги
    therapy: 'Терапия',
    surgery: 'Хирургия',
    vaccination: 'Вакцинация',
    diagnostics: 'Диагностика',
    groomingService: 'Груминг',
    food: 'Азык-түлүк',
    accessories: 'Аксессуарлар',
    toys: 'Оюнчуктар',
    vitamins: 'Витаминдер',
    emergency: 'Шашырт жардам',
    
    // Партнеры
    partnersTitle: 'Биздин өнөктөштөр',
    partnersSubtitle: 'Жакындагы текшерилген ветеринарларды, зоомагазиндерди жана груминг-салондорду табыңыз',
    becomePartner: 'Өнөктөш болуу',
    bookAppointment: 'Жолугушууга жазылуу',
    getDirections: 'Маршрут',
    reviews: 'Пикирлер',
    totalPartners: 'Бардык өнөктөштөр',
    clinics: 'Клиникалар',
    shops: 'Магазиндер',
    groomingSalons: 'Груминг-салондор',
    
    // Контакты
    emailContact: 'partners@vetcard.kg',
    phoneContact: '+996 (555) 123-456',
    telegramContact: 'Telegram: @vetcard_support',
    
    // Плейсхолдеры
    enterName: 'Атыңызды киргизиңиз',
    enterLastName: 'Фамилияңызды киргизиңиз',
    enterEmail: 'example@email.com',
    enterPhone: '+996 (555) 123-456',
    enterUsername: 'Логинди киргизиңиз',
    enterPassword: 'Кеминде 8 белги',
    confirmPasswordPlaceholder: 'Сыр сөздү кайталаңыз',
    enterOrgName: 'Мисалы: "Жакшы дарыгер" ветеринардык клиникасы',
    enterCity: 'Шаарды киргизиңиз',
    enterAddress: 'Көчө, үй, кеңсе',
    enterDescription: 'Уюмуңуз, кызматтарыңыз, тажрыйбаңыз тууралуу айтыңыз...',
    enterWebsite: 'https://example.com',
    enterWorkingHours: 'Мисалы: Дш-Жм 9:00-18:00, Шб 10:00-16:00',
    
    // Валидация
    required: 'милдеттүү',
    minLength: 'кеминде {length} белги болушу керек',
    invalidEmail: 'Туура email киргизиңиз',
    invalidPhone: 'Туура телефон номерин киргизиңиз',
    passwordsNotMatch: 'Сыр сөздөр дал келбейт',
    selectAtLeastOneService: 'Кеминде бир кызматты тандаңыз',
    
    // Сообщения
    registrationSuccess: 'Катталуу ийгиликтүү!',
    registrationError: 'Катталуу катасы. Кайра аракет кылыңыз.',
    loginError: 'Кирүү катасы. Маалыматтарыңызды текшериңиз.',
    
    // Кнопки
    register: 'Катталуу',
    registering: 'Катталууда...',
    login: 'Кирүү',
    loggingIn: 'Кирүүдө...',
    alreadyHaveAccount: 'Эми аккаунтыңыз барбы?',
    createAccount: 'Аккаунт түзүү',
    partnerRegistrationBtn: '🏢 Өнөктөштүн катталуусу',
  },
  
  en: {
    // General
    back: 'Back',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    add: 'Add',
    search: 'Search',
    filter: 'Filter',
    clear: 'Clear',
    submit: 'Submit',
    close: 'Close',
    
    // Navigation
    home: 'Home',
    myPets: 'My Pets',
    assistant: 'AI Assistant',
    partners: 'Partners',
    reminders: 'Reminders',
    articles: 'Articles',
    products: 'Products',
    profile: 'Profile',
    loginBtn: 'Login',
    registerBtn: 'Register',
    logout: 'Logout',
    
    // Home page
    heroTitle: 'VetCard — smart pet health assistant',
    heroSubtitle: 'Digital medical card, reminders and AI advice — all in one place',
    getStarted: 'Get Started',
    learnMore: 'Learn More',
    
    // Partner registration
    partnerRegistration: 'Partner Registration',
    partnerRegistrationSubtitle: 'Join our network of veterinary clinics, pet shops and grooming salons',
    whyBecomePartner: 'Why become a partner?',
    clientBaseGrowth: 'Client base growth',
    clientBaseGrowthDesc: 'Get access to thousands of pet owners',
    targetedAdvertising: 'Targeted advertising',
    targetedAdvertisingDesc: 'Show your services to those who need them',
    reputationBoost: 'Reputation boost',
    reputationBoostDesc: 'Reviews and ratings help attract new clients',
    easyManagement: 'Easy management',
    easyManagementDesc: 'Simple system for managing appointments and clients',
    haveQuestions: 'Have questions?',
    contactForInfo: 'Contact us for additional information',
    
    // Partner registration form
    basicInfo: 'Basic Information',
    organizationInfo: 'Organization Information',
    services: 'Services',
    selectServices: 'Select services provided by your organization',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    phone: 'Phone',
    username: 'Username',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    organizationName: 'Organization Name',
    organizationType: 'Organization Type',
    city: 'City',
    address: 'Address',
    description: 'Organization Description',
    website: 'Website',
    workingHours: 'Working Hours',
    
    // Organization types
    clinic: 'Veterinary Clinic',
    shop: 'Pet Shop',
    grooming: 'Grooming Salon',
    
    // Services
    therapy: 'Therapy',
    surgery: 'Surgery',
    vaccination: 'Vaccination',
    diagnostics: 'Diagnostics',
    groomingService: 'Grooming',
    food: 'Pet Food',
    accessories: 'Accessories',
    toys: 'Toys',
    vitamins: 'Vitamins',
    emergency: 'Emergency Care',
    
    // Partners
    partnersTitle: 'Our Partners',
    partnersSubtitle: 'Find trusted veterinarians, pet shops and grooming salons near you',
    becomePartner: 'Become a Partner',
    bookAppointment: 'Book Appointment',
    getDirections: 'Get Directions',
    reviews: 'Reviews',
    totalPartners: 'Total Partners',
    clinics: 'Clinics',
    shops: 'Shops',
    groomingSalons: 'Grooming Salons',
    
    // Contacts
    emailContact: 'partners@vetcard.kg',
    phoneContact: '+996 (555) 123-456',
    telegramContact: 'Telegram: @vetcard_support',
    
    // Placeholders
    enterName: 'Enter your first name',
    enterLastName: 'Enter your last name',
    enterEmail: 'example@email.com',
    enterPhone: '+996 (555) 123-456',
    enterUsername: 'Enter username',
    enterPassword: 'Minimum 8 characters',
    confirmPasswordPlaceholder: 'Repeat password',
    enterOrgName: 'For example: "Good Doctor" Veterinary Clinic',
    enterCity: 'Enter city',
    enterAddress: 'Street, house, office',
    enterDescription: 'Tell about your organization, services, experience...',
    enterWebsite: 'https://example.com',
    enterWorkingHours: 'For example: Mon-Fri 9:00-18:00, Sat 10:00-16:00',
    
    // Validation
    required: 'required',
    minLength: 'must contain at least {length} characters',
    invalidEmail: 'Enter a valid email',
    invalidPhone: 'Enter a valid phone number',
    passwordsNotMatch: 'Passwords do not match',
    selectAtLeastOneService: 'Select at least one service',
    
    // Messages
    registrationSuccess: 'Registration successful!',
    registrationError: 'Registration error. Please try again.',
    loginError: 'Login error. Check your data.',
    
    // Buttons
    registering: 'Registering...',
    loggingIn: 'Logging in...',
    alreadyHaveAccount: 'Already have an account?',
    createAccount: 'Create Account',
    partnerRegistrationBtn: '🏢 Partner Registration',
  }
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('ru');

  const t = (key, params = {}) => {
    let translation = translations[currentLanguage][key] || translations.ru[key] || key;
    
    // Заменяем параметры в строке
    Object.keys(params).forEach(param => {
      translation = translation.replace(`{${param}}`, params[param]);
    });
    
    return translation;
  };

  const changeLanguage = (language) => {
    setCurrentLanguage(language);
  };

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    availableLanguages: ['ru', 'ky', 'en']
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}; 