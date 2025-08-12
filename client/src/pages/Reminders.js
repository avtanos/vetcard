import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import LoadingSpinner from '../components/LoadingSpinner';
import './Reminders.css';

const Reminders = () => {
  const { t } = useLanguage();
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newReminder, setNewReminder] = useState({
    title: '',
    petId: '',
    date: '',
    time: '',
    type: 'vaccination',
    description: ''
  });

  const reminderTypes = [
    { value: 'vaccination', label: 'Вакцинация', icon: '💉', color: '#e74c3c' },
    { value: 'checkup', label: 'Осмотр', icon: '🏥', color: '#3498db' },
    { value: 'grooming', label: 'Груминг', icon: '✂️', color: '#9b59b6' },
    { value: 'shopping', label: 'Покупки', icon: '🛒', color: '#f39c12' },
    { value: 'medication', label: 'Лекарства', icon: '💊', color: '#e67e22' },
    { value: 'other', label: 'Другое', icon: '📝', color: '#95a5a6' }
  ];

  const mockPets = [
    { id: 1, name: 'Бобик', type: 'dog' },
    { id: 2, name: 'Мурзик', type: 'cat' }
  ];

  useEffect(() => {
    const mockReminders = [
      {
        id: 1,
        title: 'Вакцинация от бешенства',
        petName: 'Бобик',
        date: '2024-02-15',
        time: '10:00',
        type: 'vaccination',
        status: 'planned',
        description: 'Ежегодная вакцинация от бешенства'
      },
      {
        id: 2,
        title: 'Стрижка когтей',
        petName: 'Мурзик',
        date: '2024-02-10',
        time: '14:30',
        type: 'grooming',
        status: 'done',
        description: 'Подстричь когти'
      },
      {
        id: 3,
        title: 'Проверка здоровья',
        petName: 'Бобик',
        date: '2024-02-20',
        time: '11:00',
        type: 'checkup',
        status: 'planned',
        description: 'Плановый осмотр у ветеринара'
      },
      {
        id: 4,
        title: 'Покупка корма',
        petName: 'Мурзик',
        date: '2024-02-08',
        time: '16:00',
        type: 'shopping',
        status: 'done',
        description: 'Купить корм для кошек'
      }
    ];

    setTimeout(() => {
      setReminders(mockReminders);
      setLoading(false);
    }, 1000);
  }, []);

  const getTypeIcon = (type) => {
    const reminderType = reminderTypes.find(t => t.value === type);
    return reminderType ? reminderType.icon : '📝';
  };

  const getTypeColor = (type) => {
    const reminderType = reminderTypes.find(t => t.value === type);
    return reminderType ? reminderType.color : '#95a5a6';
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'planned': return 'Запланировано';
      case 'done': return 'Выполнено';
      case 'overdue': return 'Просрочено';
      default: return 'Неизвестно';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'planned': return '#3498db';
      case 'done': return '#27ae60';
      case 'overdue': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const handleAddReminder = (e) => {
    e.preventDefault();
    const reminder = {
      id: Date.now(),
      ...newReminder,
      status: 'planned'
    };
    setReminders([...reminders, reminder]);
    setNewReminder({
      title: '',
      petId: '',
      date: '',
      time: '',
      type: 'vaccination',
      description: ''
    });
    setShowAddForm(false);
  };

  const handleStatusChange = (reminderId, newStatus) => {
    setReminders(reminders.map(reminder => 
      reminder.id === reminderId 
        ? { ...reminder, status: newStatus }
        : reminder
    ));
  };

  const handleDeleteReminder = (reminderId) => {
    setReminders(reminders.filter(reminder => reminder.id !== reminderId));
  };

  if (loading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <div className="reminders-container">
      <div className="reminders-header">
        <h1>{t('reminders')}</h1>
        <p>Управляйте напоминаниями о важных событиях для ваших питомцев</p>
        <button 
          className="add-reminder-btn"
          onClick={() => setShowAddForm(true)}
        >
          ➕ Добавить напоминание
        </button>
      </div>

      {showAddForm && (
        <div className="add-reminder-form">
          <h3>Новое напоминание</h3>
          <form onSubmit={handleAddReminder}>
            <div className="form-row">
              <div className="form-group">
                <label>Название</label>
                <input
                  type="text"
                  value={newReminder.title}
                  onChange={(e) => setNewReminder({...newReminder, title: e.target.value})}
                  placeholder="Введите название напоминания"
                  required
                />
              </div>
              <div className="form-group">
                <label>Питомец</label>
                <select
                  value={newReminder.petId}
                  onChange={(e) => setNewReminder({...newReminder, petId: e.target.value})}
                  required
                >
                  <option value="">Выберите питомца</option>
                  {mockPets.map(pet => (
                    <option key={pet.id} value={pet.id}>{pet.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Дата</label>
                <input
                  type="date"
                  value={newReminder.date}
                  onChange={(e) => setNewReminder({...newReminder, date: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Время</label>
                <input
                  type="time"
                  value={newReminder.time}
                  onChange={(e) => setNewReminder({...newReminder, time: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Тип</label>
                <select
                  value={newReminder.type}
                  onChange={(e) => setNewReminder({...newReminder, type: e.target.value})}
                >
                  {reminderTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.icon} {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Описание</label>
              <textarea
                value={newReminder.description}
                onChange={(e) => setNewReminder({...newReminder, description: e.target.value})}
                placeholder="Дополнительная информация"
                rows="3"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                Добавить напоминание
              </button>
              <button 
                type="button" 
                className="btn-secondary"
                onClick={() => setShowAddForm(false)}
              >
                Отмена
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="reminders-stats">
        <div className="stat-card">
          <span className="stat-number">{reminders.length}</span>
          <span className="stat-label">Всего напоминаний</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{reminders.filter(r => r.status === 'planned').length}</span>
          <span className="stat-label">Запланировано</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{reminders.filter(r => r.status === 'done').length}</span>
          <span className="stat-label">Выполнено</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{reminders.filter(r => r.status === 'overdue').length}</span>
          <span className="stat-label">Просрочено</span>
        </div>
      </div>

      <div className="reminders-list">
        {reminders.map(reminder => (
          <div key={reminder.id} className="reminder-card">
            <div className="reminder-header">
              <div className="reminder-icon" style={{ backgroundColor: getTypeColor(reminder.type) }}>
                {getTypeIcon(reminder.type)}
              </div>
              <div className="reminder-info">
                <h3 className="reminder-title">{reminder.title}</h3>
                <p className="reminder-pet">Питомец: {reminder.petName}</p>
                <p className="reminder-date">
                  📅 {new Date(reminder.date).toLocaleDateString()} в {reminder.time}
                </p>
              </div>
              <div className="reminder-status">
                <span 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(reminder.status) }}
                >
                  {getStatusLabel(reminder.status)}
                </span>
              </div>
            </div>
            
            {reminder.description && (
              <p className="reminder-description">{reminder.description}</p>
            )}
            
            <div className="reminder-actions">
              <select
                value={reminder.status}
                onChange={(e) => handleStatusChange(reminder.id, e.target.value)}
                className="status-select"
              >
                <option value="planned">Запланировано</option>
                <option value="done">Выполнено</option>
                <option value="overdue">Просрочено</option>
              </select>
              
              <button 
                className="action-btn edit"
                onClick={() => {/* Редактирование */}}
              >
                ✏️ Редактировать
              </button>
              
              <button 
                className="action-btn delete"
                onClick={() => handleDeleteReminder(reminder.id)}
              >
                🗑️ Удалить
              </button>
            </div>
          </div>
        ))}
      </div>

      {reminders.length === 0 && (
        <div className="no-reminders">
          <p>У вас пока нет напоминаний</p>
          <button 
            className="add-first-btn"
            onClick={() => setShowAddForm(true)}
          >
            Создать первое напоминание
          </button>
        </div>
      )}
    </div>
  );
};

export default Reminders; 