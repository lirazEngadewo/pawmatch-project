import { useState } from 'react';
import IsraelMap from '../components/IsraelMap.jsx';
import TrustFeaturesSection from '../components/TrustFeaturesSection.jsx';
import Footer from '../components/Footer.jsx';
import pets from '../data/pets.js';
import useUserPreferences from '../hooks/useUserPreferences.js';
import { calculateMatchPercent } from '../utils/matching.js';

function HomePage({ onSelectPet, onNavigate, isLoggedIn, favorites, toggleFavorite, requireRegistration, currentUser }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const pet = pets[currentIndex];
  const userPreferences = useUserPreferences(currentUser);
  const matchPercent = calculateMatchPercent(pet, userPreferences);
  console.log('HomePage debug:', { currentUser, userPreferences, pet: pet.id, matchPercent });

  const handleNext = () => setCurrentIndex((p) => (p + 1) % pets.length);
  const handlePrev = () => setCurrentIndex((p) => (p - 1 + pets.length) % pets.length);

  const handleLike = () => {
    if (!isLoggedIn) { requireRegistration(); return; }
    toggleFavorite(pet.id);
  };

  const handleHeartClick = (petId) => {
    if (!isLoggedIn) { requireRegistration(); return; }
    toggleFavorite(petId);
  };

  // Build favorites list from real data
  const favoritePets = (favorites || [])
    .map((id) => pets.find((p) => p.id === id))
    .filter(Boolean);

  const isCurrentFavorite = favorites?.includes(pet.id);

  return (
    <main className="page-home">

      {/* ── Page title ── */}
      <div className="hm-header">
        <h1 className="hm-title">Find your new best friend</h1>
        <p className="hm-subtitle">Swipe, match, and change a life.</p>
      </div>

      {/* ── Dashboard grid ── */}
      <div className="hm-dashboard">

        {/* LEFT – matching column */}
        <div className="hm-col-main">

          {/* Pet card */}
          <div className="hm-pet-card">

            {/* Image side */}
            <div className="hm-image-area">
              <button className="hm-arrow hm-arrow-left" onClick={handlePrev}>‹</button>
              <img
                src={pet.image}
                alt={pet.name}
                className="hm-pet-img"
              />
              <button className="hm-arrow hm-arrow-right" onClick={handleNext}>›</button>
            </div>

            {/* Info side */}
            <div className="hm-info">
              <div className="hm-name-row">
                <h2 className="hm-pet-name">{pet.name}</h2>
                {matchPercent !== null && (
                  <span className="match-pill">{matchPercent}% match</span>
                )}
              </div>

              <div className="hm-details-grid">
                <div className="hm-detail">
                  <span className="hm-detail-label">Age</span>
                  <span className="hm-detail-value">{pet.age}</span>
                </div>
                <div className="hm-detail">
                  <span className="hm-detail-label">Gender</span>
                  <span className="hm-detail-value">{pet.gender}</span>
                </div>
                <div className="hm-detail">
                  <span className="hm-detail-label">Size</span>
                  <span className="hm-detail-value">{pet.size}</span>
                </div>
                <div className="hm-detail">
                  <span className="hm-detail-label">Location</span>
                  <span className="hm-detail-value">📍 {pet.location}</span>
                </div>
              </div>

              <div className="tags-row">
                {pet.details.slice(0, 3).map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>

              <button
                className="hm-profile-btn"
                onClick={() => onSelectPet(pet.id)}
              >
                View Full Profile
              </button>
            </div>
          </div>

          {/* Dots */}
          <div className="hm-dots">
            {pets.map((_, i) => (
              <span key={i} className={`hm-dot${i === currentIndex ? ' active' : ''}`} />
            ))}
          </div>

          {/* Skip / Like */}
          <div className="hm-actions">
            <button className="hm-skip-btn" onClick={handleNext}>
              <span>✕</span> Skip
            </button>
            <button
              className={`hm-like-btn${isCurrentFavorite ? ' hm-like-btn--active' : ''}`}
              onClick={handleLike}
            >
              <span>♥</span> {isCurrentFavorite ? 'Liked!' : 'Like'}
            </button>
          </div>
        </div>

        {/* RIGHT – sidebar */}
        <div className="hm-sidebar">

          {/* Filters */}
          <div className="hm-filters-card">
            <h3 className="hm-sidebar-title">Filters</h3>

            <div className="hm-filter-group">
              <label className="hm-filter-label">Location</label>
              <select className="hm-filter-select">
                <option>All locations</option>
                <option>Brooklyn, NY</option>
                <option>Austin, TX</option>
                <option>Portland, OR</option>
                <option>Seattle, WA</option>
              </select>
            </div>

            <div className="hm-filter-group">
              <label className="hm-filter-label">Pet Type</label>
              <select className="hm-filter-select">
                <option>All types</option>
                <option>Cat</option>
                <option>Dog</option>
              </select>
            </div>

            <div className="hm-filter-group">
              <label className="hm-filter-label">Size</label>
              <select className="hm-filter-select">
                <option>All sizes</option>
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div>

            <button className="hm-apply-btn">Apply Filters</button>
          </div>

          {/* Favorites */}
          <div className="hm-favorites-card">
            <h3 className="hm-sidebar-title">Your Favorites</h3>

            {favoritePets.length === 0 ? (
              <p className="hm-fav-empty">
                {isLoggedIn
                  ? 'Like a pet to add them here.'
                  : 'Sign in to save your favorites.'}
              </p>
            ) : (
              favoritePets.map((fav) => (
                <div key={fav.id} className="hm-fav-row">
                  <img src={fav.image} alt={fav.name} className="hm-fav-img" />
                  <div className="hm-fav-info">
                    <p className="hm-fav-name">{fav.name}</p>
                    <p className="hm-fav-type">{fav.type}</p>
                  </div>
                  <span
                    className="hm-fav-heart"
                    onClick={() => handleHeartClick(fav.id)}
                    style={{ cursor: 'pointer' }}
                  >♥</span>
                </div>
              ))
            )}
          </div>

          <IsraelMap height="350px" compact />
        </div>
      </div>

      <TrustFeaturesSection />
      <Footer onNavigate={onNavigate} />
    </main>
  );
}

export default HomePage;
