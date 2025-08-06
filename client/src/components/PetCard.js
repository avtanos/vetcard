import React from 'react';
import './PetCard.css';

const PetCard = ({ pet, onEdit, onDelete }) => {
  const getSpeciesIcon = (species) => {
    switch (species) {
      case 'cat':
        return '🐱';
      case 'dog':
        return '🐕';
      default:
        return '🐾';
    }
  };

  const getSpeciesName = (species) => {
    switch (species) {
      case 'cat':
        return 'Кот';
      case 'dog':
        return 'Собака';
      default:
        return 'Другое';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Не указана';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
  };

  const calculateAge = (birthDate) => {
    if (!birthDate) return null;
    const birth = new Date(birthDate);
    const today = new Date();
    const ageInYears = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      return ageInYears - 1;
    }
    return ageInYears;
  };

  const age = calculateAge(pet.birth_date);

  return (
    <div className="pet-card">
      <div className="pet-image">
        {pet.image_url ? (
          <img src={pet.image_url} alt={pet.name} />
        ) : (
          <div className="pet-placeholder">
            {getSpeciesIcon(pet.species)}
          </div>
        )}
      </div>

      <div className="pet-info">
        <div className="pet-header">
          <h3 className="pet-name">{pet.name}</h3>
          <span className="pet-species">{getSpeciesIcon(pet.species)} {getSpeciesName(pet.species)}</span>
        </div>

        <div className="pet-details">
          {pet.breed && (
            <div className="pet-detail">
              <span className="detail-label">Порода:</span>
              <span className="detail-value">{pet.breed}</span>
            </div>
          )}

          {pet.birth_date && (
            <div className="pet-detail">
              <span className="detail-label">Дата рождения:</span>
              <span className="detail-value">
                {formatDate(pet.birth_date)}
                {age !== null && ` (${age} ${age === 1 ? 'год' : age < 5 ? 'года' : 'лет'})`}
              </span>
            </div>
          )}

          {pet.weight_kg && (
            <div className="pet-detail">
              <span className="detail-label">Вес:</span>
              <span className="detail-value">{pet.weight_kg} кг</span>
            </div>
          )}

          {pet.notes && (
            <div className="pet-detail">
              <span className="detail-label">Заметки:</span>
              <span className="detail-value notes">{pet.notes}</span>
            </div>
          )}
        </div>

        <div className="pet-actions">
          <button 
            className="btn btn-outline btn-sm"
            onClick={() => onEdit(pet)}
          >
            ✏️ Редактировать
          </button>
          <button 
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(pet.id)}
          >
            🗑️ Удалить
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetCard; 