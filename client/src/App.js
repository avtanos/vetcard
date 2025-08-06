import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MyPets from './pages/MyPets';
import Assistant from './pages/Assistant';
import Partners from './pages/Partners';
import Reminders from './pages/Reminders';
import Articles from './pages/Articles';
import Products from './pages/Products';
import Profile from './pages/Profile';
import PartnerRegisterPage from './pages/PartnerRegisterPage';
import AuthModal from './components/AuthModal';
import LoadingSpinner from './components/LoadingSpinner';
import './styles/common.css';
import './App.css';

// Компонент для защищенных маршрутов
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <LoadingSpinner />
    );
  }
  
  return user ? children : <Navigate to="/" />;
};

// Компонент для публичных маршрутов (только для неавторизованных)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <LoadingSpinner />
    );
  }
  
  return !user ? children : <Navigate to="/" />;
};

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleAuthClick = () => {
    setShowAuthModal(true);
  };

  const handleCloseAuthModal = () => {
    setShowAuthModal(false);
  };

  return (
    <Router>
      <div className="App">
        <Navbar onAuthClick={handleAuthClick} />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home onAuthClick={handleAuthClick} />} />
            
            {/* Приватные маршруты - только для авторизованных */}
            <Route 
              path="/my-pets" 
              element={
                <PrivateRoute>
                  <MyPets />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/assistant" 
              element={
                <PrivateRoute>
                  <Assistant />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/reminders" 
              element={
                <PrivateRoute>
                  <Reminders />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } 
            />
            
            {/* Публичные маршруты - доступны всем */}
            <Route path="/partners" element={<Partners />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/products" element={<Products />} />
            <Route path="/partner-register" element={<PartnerRegisterPage />} />
          </Routes>
        </main>

        <AuthModal 
          isOpen={showAuthModal} 
          onClose={handleCloseAuthModal} 
        />
      </div>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
