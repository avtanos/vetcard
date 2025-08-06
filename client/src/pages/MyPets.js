import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import LoadingSpinner from '../components/LoadingSpinner';
import PetForm from '../components/PetForm';
import PetCard from '../components/PetCard';
import './MyPets.css';

const MyPets = () => {
  const { token } = useAuth();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingPet, setEditingPet] = useState(null);

  const fetchPets = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8000/api/pets/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPets(data.results || data);
      } else if (response.status === 401) {
        // Если токен недействителен, очищаем ошибку и перенаправляем на логин
        setError('');
        setPets([]);
      } else {
        setError('Ошибка загрузки питомцев');
      }
    } catch (error) {
      console.error('Error fetching pets:', error);
      setError('Ошибка сети');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchPets();
  }, [fetchPets]);

  const handleAddPet = async (petData) => {
    try {
      const response = await fetch('http://localhost:8000/api/pets/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(petData),
      });

      if (response.ok) {
        const newPet = await response.json();
        setPets([...pets, newPet]);
        setShowForm(false);
        setEditingPet(null);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка добавления питомца');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditPet = async (petId, petData) => {
    try {
      const response = await fetch(`http://localhost:8000/api/pets/${petId}/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(petData),
      });

      if (response.ok) {
        const updatedPet = await response.json();
        setPets(pets.map(pet => pet.id === petId ? updatedPet : pet));
        setShowForm(false);
        setEditingPet(null);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка обновления питомца');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeletePet = async (petId) => {
    if (!window.confirm('Вы уверены, что хотите удалить этого питомца?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/pets/${petId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setPets(pets.filter(pet => pet.id !== petId));
      } else {
        setError('Ошибка удаления питомца');
      }
    } catch (error) {
      setError('Ошибка сети');
    }
  };

  const handleEdit = (pet) => {
    setEditingPet(pet);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingPet(null);
    setError('');
  };

  if (loading) {
    return (
      <div className="mypets-page">
        <div className="container">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="mypets-page">
      <div className="container">
        <div className="pets-header">
          <h1>Мои питомцы</h1>
          <button 
            className="btn btn-primary"
            onClick={() => setShowForm(true)}
          >
            + Добавить питомца
          </button>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {showForm && (
          <div className="form-overlay">
            <div className="form-modal">
              <PetForm
                pet={editingPet}
                onSubmit={editingPet ? handleEditPet : handleAddPet}
                onCancel={handleCancel}
              />
            </div>
          </div>
        )}

        {pets.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🐾</div>
            <h3>У вас пока нет питомцев</h3>
            <p>Добавьте первого питомца, чтобы начать вести его медицинскую карту</p>
            <button 
              className="btn btn-primary"
              onClick={() => setShowForm(true)}
            >
              Добавить питомца
            </button>
          </div>
        ) : (
          <div className="pets-grid">
            {pets.map(pet => (
              <PetCard
                key={pet.id}
                pet={pet}
                onEdit={() => handleEdit(pet)}
                onDelete={() => handleDeletePet(pet.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPets; 