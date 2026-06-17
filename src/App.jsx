import { useState, useEffect, useRef } from 'react';
import { supabase } from './lib/supabaseClient.js';
import AppHeader from './components/AppHeader.jsx';
import RegistrationModal from './components/RegistrationModal.jsx';
import MatchingQuizModal from './components/MatchingQuizModal.jsx';
import LandingPage from './pages/LandingPage.jsx';
import HomePage from './pages/HomePage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import PetProfilePage from './pages/PetProfilePage.jsx';
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
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [sessionExpiredMessage, setSessionExpiredMessage] = useState('');
  const [toast, setToast] = useState(null);
  const isManualLogout = useRef(false);

  // Favorites must be declared before the auth effect that calls setFavorites
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem('favoritePets');
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setCurrentUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' && !isManualLogout.current) {
        // Session expired automatically — redirect with message
        setCurrentUser(null);
        setAvatarUrl(null);
        setFavorites([]);
        localStorage.removeItem('favoritePets');
        setSessionExpiredMessage('Your session expired. Please log in again.');
        setPage('register');
        window.scrollTo(0, 0);
      } else {
        setCurrentUser(session?.user ?? null);
      }
      if (event === 'SIGNED_OUT') isManualLogout.current = false;
      // Clear the session-expired banner once the user successfully signs in
      if (event === 'SIGNED_IN') {
        Promise.resolve().then(() => setSessionExpiredMessage(''));
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const isLoggedIn = currentUser !== null;

  const handleNavigate = (nextPage, petId) => {
    if (petId) setSelectedPetId(petId);
    setPage(nextPage);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (!currentUser) { setAvatarUrl(null); return; }
    supabase
      .from('profiles')
      .select('avatar_url')
      .eq('user_id', currentUser.id)
      .maybeSingle()
      .then(({ data }) => setAvatarUrl(data?.avatar_url ?? null));
  }, [currentUser]);

  const handleLogout = async () => {
    isManualLogout.current = true;
    await supabase.auth.signOut();
    setAvatarUrl(null);
    setFavorites([]);
    localStorage.removeItem('favoritePets');
    handleNavigate('landing');
  };

  const toggleFavorite = (petId) => {
    const next = favorites.includes(petId)
      ? favorites.filter((id) => id !== petId)
      : [...favorites, petId];
    try {
      localStorage.setItem('favoritePets', JSON.stringify(next));
    } catch {
      showToast('Could not save favorite. Please try again.');
      return;
    }
    setFavorites(next);
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
        avatarUrl={avatarUrl}
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
          onNavigate={handleNavigate}
          isLoggedIn={isLoggedIn}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          requireRegistration={requireRegistration}
          currentUser={currentUser}
        />
      )}

      {page === 'register' && (
        <RegisterPage
          onNavigate={handleNavigate}
          onSignUpSuccess={() => setShowQuizModal(true)}
          sessionExpiredMessage={sessionExpiredMessage}
        />
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
          onAvatarChange={setAvatarUrl}
        />
      )}

      {page === 'about' && <AboutUsPage onNavigate={handleNavigate} />}

      {showModal && (
        <RegistrationModal
          onClose={() => setShowModal(false)}
          onNavigate={handleNavigate}
        />
      )}

      {toast && <div className="app-toast">{toast}</div>}

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
