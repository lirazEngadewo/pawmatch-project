// This is frontend-only demo authentication for prototype purposes.
import { useState } from 'react';
import AppHeader from './components/AppHeader.jsx';
import RegistrationModal from './components/RegistrationModal.jsx';
import LandingPage from './pages/LandingPage.jsx';
import HomePage from './pages/HomePage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import PetProfilePage from './pages/PetProfilePage.jsx';
import AdoptionPage from './pages/AdoptionPage.jsx';
import RequestsPage from './pages/RequestsPage.jsx';
import UserProfilePage from './pages/UserProfilePage.jsx';
import AboutUsPage from './pages/AboutUsPage.jsx';
import pets from './data/pets.js';

function App() {
  const [page, setPage] = useState('landing');
  const [selectedPetId, setSelectedPetId] = useState(pets[0]?.id);
  const [showModal, setShowModal] = useState(false);

  // Initialize auth from localStorage
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem('currentUser');
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });

  // Initialize favorites from localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem('favoritePets');
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  const isLoggedIn = currentUser !== null;

  const handleNavigate = (nextPage, petId) => {
    if (petId) setSelectedPetId(petId);
    setPage(nextPage);
    window.scrollTo(0, 0);
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setFavorites([]);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('favoritePets');
    handleNavigate('landing');
  };

  const toggleFavorite = (petId) => {
    setFavorites((prev) => {
      const next = prev.includes(petId)
        ? prev.filter((id) => id !== petId)
        : [...prev, petId];
      localStorage.setItem('favoritePets', JSON.stringify(next));
      return next;
    });
  };

  const requireRegistration = () => {
    if (!isLoggedIn) setShowModal(true);
  };

  return (
    <div className="app-shell">
      <AppHeader
        currentPage={page}
        onNavigate={handleNavigate}
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {page === 'landing' && (
        <LandingPage
          onSelectPet={(id) => handleNavigate('profile', id)}
          onNavigate={handleNavigate}
        />
      )}

      {page === 'home' && (
        <HomePage
          onSelectPet={(id) => handleNavigate('profile', id)}
          isLoggedIn={isLoggedIn}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          requireRegistration={requireRegistration}
        />
      )}

      {page === 'register' && (
        <RegisterPage onNavigate={handleNavigate} onLogin={handleLogin} />
      )}

      {page === 'profile' && (
        <PetProfilePage
          selectedPetId={selectedPetId}
          onNavigate={handleNavigate}
          isLoggedIn={isLoggedIn}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          requireRegistration={requireRegistration}
        />
      )}

      {page === 'adoption' && (
        <AdoptionPage
          isLoggedIn={isLoggedIn}
          requireRegistration={requireRegistration}
        />
      )}

      {page === 'requests' && (
        <RequestsPage
          selectedPetId={selectedPetId}
          onNavigate={handleNavigate}
          isLoggedIn={isLoggedIn}
          requireRegistration={requireRegistration}
        />
      )}

      {page === 'userProfile' && (
        <UserProfilePage
          currentUser={currentUser}
          favorites={favorites}
          onNavigate={handleNavigate}
        />
      )}

      {page === 'about' && <AboutUsPage />}

      {showModal && (
        <RegistrationModal
          onClose={() => setShowModal(false)}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}

export default App;
