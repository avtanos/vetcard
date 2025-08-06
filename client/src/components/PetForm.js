import React, { useState, useEffect } from 'react';
import FileUpload from './FileUpload';
import './PetForm.css';

const PetForm = ({ pet, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    species: 'cat',
    breed: '',
    birth_date: '',
    weight_kg: '',
    notes: '',
    image_url: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (pet) {
      setFormData({
        name: pet.name || '',
        species: pet.species || 'cat',
        breed: pet.breed || '',
        birth_date: pet.birth_date || '',
        weight_kg: pet.weight_kg || '',
        notes: pet.notes || '',
        image_url: pet.image_url || ''
      });
    }
  }, [pet]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Очищаем ошибку для этого поля
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setErrors(prev => ({
      ...prev,
      file: ''
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Имя питомца обязательно';
    }
    
    if (formData.weight_kg && (isNaN(formData.weight_kg) || parseFloat(formData.weight_kg) <= 0)) {
      newErrors.weight_kg = 'Вес должен быть положительным числом';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const submitData = {
        ...formData,
        weight_kg: formData.weight_kg ? parseFloat(formData.weight_kg) : null
      };
      
      if (pet) {
        await onSubmit(pet.id, submitData);
      } else {
        await onSubmit(submitData);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pet-form">
      <div className="form-header">
        <h2>{pet ? 'Редактировать питомца' : 'Добавить питомца'}</h2>
        <button className="close-btn" onClick={onCancel}>×</button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Имя питомца *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Введите имя питомца"
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="species">Вид</label>
            <select
              id="species"
              name="species"
              value={formData.species}
              onChange={handleChange}
            >
              <option value="cat">Кот</option>
              <option value="dog">Собака</option>
              <option value="other">Другое</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="breed">Порода</label>
            <input
              type="text"
              id="breed"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              placeholder="Введите породу"
            />
          </div>

          <div className="form-group">
            <label htmlFor="birth_date">Дата рождения</label>
            <input
              type="date"
              id="birth_date"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="weight_kg">Вес (кг)</label>
            <input
              type="number"
              id="weight_kg"
              name="weight_kg"
              value={formData.weight_kg}
              onChange={handleChange}
              placeholder="0.0"
              step="0.1"
              min="0"
              className={errors.weight_kg ? 'error' : ''}
            />
            {errors.weight_kg && <span className="error-text">{errors.weight_kg}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="image_url">Фото (URL)</label>
            <input
              type="url"
              id="image_url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="https://example.com/photo.jpg"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Загрузить фото</label>
          <FileUpload
            onFileSelect={handleFileSelect}
            accept="image/*"
            placeholder="Перетащите фото питомца или нажмите для выбора"
          />
          {selectedFile && (
            <div className="file-preview">
              <div className="file-preview-item">
                <div className="file-preview-icon">🖼️</div>
                <div className="file-preview-info">
                  <div className="file-preview-name">{selectedFile.name}</div>
                  <div className="file-preview-size">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                </div>
                <button
                  type="button"
                  className="file-preview-remove"
                  onClick={() => setSelectedFile(null)}
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="notes">Особые пометки</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Аллергии, хронические заболевания, особенности поведения..."
            rows="4"
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-outline"
            onClick={onCancel}
            disabled={loading}
          >
            Отмена
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Сохранение...' : (pet ? 'Обновить' : 'Добавить')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PetForm; 