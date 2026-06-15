import { useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient.js';
import AppHeader from './components/AppHeader.jsx';
import RegistrationModal from './components/RegistrationModal.jsx';
import MatchingQuizModal from './components/MatchingQuizModal.jsx';
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
  const [showQuizModal, setShowQuizModal] = useState(false);

  // Current user from Supabase Auth session
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setCurrentUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setFavorites([]);
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
          currentUser={currentUser}
        />
      )}

      {page === 'home' && (
        <HomePage
          onSelectPet={(id) => handleNavigate('profile', id)}
          isLoggedIn={isLoggedIn}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          requireRegistration={requireRegistration}
          currentUser={currentUser}
        />
      )}

      {page === 'register' && (
        <RegisterPage onNavigate={handleNavigate} onSignUpSuccess={() => setShowQuizModal(true)} />
      )}

      {page === 'profile' && (
        <PetProfilePage
          selectedPetId={selectedPetId}
          onNavigate={handleNavigate}
          isLoggedIn={isLoggedIn}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          requireRegistration={requireRegistration}
          currentUser={currentUser}
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
          favorites={favorites}
          currentUser={currentUser}
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

      {showQuizModal && currentUser && (
        <MatchingQuizModal
          currentUser={currentUser}
          onClose={() => setShowQuizModal(false)}
          onComplete={() => setShowQuizModal(false)}
        />
      )}
    </div>
  );
}

export default App;
