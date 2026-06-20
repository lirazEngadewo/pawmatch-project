import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { translateGender, translateSize, translateAge } from '../utils/petLocale.js';
import IsraelMap from '../components/IsraelMap.jsx';
import TrustFeaturesSection from '../components/TrustFeaturesSection.jsx';
import Footer from '../components/Footer.jsx';
import PetCard from '../components/PetCard.jsx';
import pets from '../data/pets.js';
import useUserPreferences from '../hooks/useUserPreferences.js';
import { calculateMatchPercent, CITY_TO_REGION } from '../utils/matching.js';

const REGIONS = ['Center', 'Sharon', 'Jerusalem', 'Haifa and Krayot', 'Upper Galilee', 'Lower Galilee', 'Shephelah', 'South'];

function HomePage({ onSelectPet, onNavigate, isLoggedIn, favorites, toggleFavorite, requireRegistration, currentUser }) {
  const { t, i18n } = useTranslation();
  const isHe = i18n.language === 'he';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [filtersApplied, setFiltersApplied] = useState(false);
  const resultsRef = useRef(null);

  const userPreferences = useUserPreferences(currentUser);

  useEffect(() => {
    if (filtersApplied && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [filtersApplied]);

  const carouselPets = selectedRegion
    ? pets.filter((p) => CITY_TO_REGION[p.location] === selectedRegion)
    : pets;

  const pet = carouselPets[currentIndex] ?? carouselPets[0] ?? pets[0];
  const matchPercent = calculateMatchPercent(pet, userPreferences);

  const gridPets = pets.filter((p) => {
    if (selectedRegion && CITY_TO_REGION[p.location] !== selectedRegion) return false;
    if (selectedType && p.species !== selectedType) return false;
    if (selectedSize && p.size !== selectedSize) return false;
    return true;
  });

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % carouselPets.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + carouselPets.length) % carouselPets.length);

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
    setCurrentIndex(0);
  };

  const handleApplyFilters = () => setFiltersApplied(true);

  const handleClearFilters = () => {
    setSelectedRegion('');
    setSelectedType('');
    setSelectedSize('');
    setFiltersApplied(false);
    setCurrentIndex(0);
  };

  const handleLike = () => {
    if (!isLoggedIn) { requireRegistration(); return; }
    toggleFavorite(pet.id);
  };

  const handleHeartClick = (petId) => {
    if (!isLoggedIn) { requireRegistration(); return; }
    toggleFavorite(petId);
  };

  const favoritePets = (favorites || [])
    .map((id) => pets.find((p) => p.id === id))
    .filter(Boolean);

  const isCurrentFavorite = favorites?.includes(pet.id);

  return (
    <main className="page-home">

      <div className="hm-header">
        <h1 className="hm-title">{t('home.title')}</h1>
        <p className="hm-subtitle">{t('home.subtitle')}</p>
      </div>

      <div className="hm-dashboard">

        {/* LEFT – main column */}
        <div className="hm-col-main">

          {filtersApplied ? (
            /* ── GRID VIEW ── */
            <div className="hm-results" ref={resultsRef}>
              <div className="hm-results-header">
                <p className="hm-results-count">
                  {t('home.showingPets', { count: gridPets.length })}
                </p>
                <button className="hm-clear-btn" onClick={handleClearFilters}>
                  {t('home.clearFilters')}
                </button>
              </div>

              {gridPets.length === 0 ? (
                <p className="hm-no-results">{t('home.noPetsMatch')}</p>
              ) : (
                <div className="hm-results-grid">
                  {gridPets.map((p) => (
                    <PetCard
                      key={p.id}
                      pet={p}
                      onSelect={onSelectPet}
                      matchPercent={calculateMatchPercent(p, userPreferences)}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* ── SINGLE CARD VIEW ── */
            <>
              <div className="hm-pet-card">
                <div className="hm-image-area">
                  <button className="hm-arrow hm-arrow-left" onClick={handlePrev}>‹</button>
                  <img src={pet.image} alt={pet.name} className="hm-pet-img" />
                  <button className="hm-arrow hm-arrow-right" onClick={handleNext}>›</button>
                </div>

                <div className="hm-info">
                  <div className="hm-name-row">
                    <h2 className="hm-pet-name">{isHe && pet.name_he ? pet.name_he : pet.name}</h2>
                    {matchPercent !== null && (
                      <span className="match-pill">{matchPercent}% match</span>
                    )}
                  </div>

                  <div className="hm-details-grid">
                    <div className="hm-detail">
                      <span className="hm-detail-label">{t('home.labelAge')}</span>
                      <span className="hm-detail-value">{translateAge(pet.age, isHe)}</span>
                    </div>
                    <div className="hm-detail">
                      <span className="hm-detail-label">{t('home.labelGender')}</span>
                      <span className="hm-detail-value">{translateGender(pet.gender, isHe)}</span>
                    </div>
                    <div className="hm-detail">
                      <span className="hm-detail-label">{t('home.labelSize')}</span>
                      <span className="hm-detail-value">{translateSize(pet.size, isHe)}</span>
                    </div>
                    <div className="hm-detail">
                      <span className="hm-detail-label">{t('home.labelLocation')}</span>
                      <span className="hm-detail-value">📍 {pet.location}</span>
                    </div>
                  </div>

                  <div className="tags-row">
                    {(isHe && pet.tags_he ? pet.tags_he : pet.details).slice(0, 3).map((tag, i) => (
                      <span key={i} className="tag">{tag}</span>
                    ))}
                  </div>

                  <button className="hm-profile-btn" onClick={() => onSelectPet(pet.id)}>
                    {t('home.viewFullProfile')}
                  </button>
                </div>
              </div>

              <div className="hm-dots">
                {carouselPets.map((_, i) => (
                  <span key={i} className={`hm-dot${i === currentIndex ? ' active' : ''}`} />
                ))}
              </div>

              <div className="hm-actions">
                <button className="hm-skip-btn" onClick={handleNext}>
                  <span>✕</span> {t('home.skip')}
                </button>
                <button
                  className={`hm-like-btn${isCurrentFavorite ? ' hm-like-btn--active' : ''}`}
                  onClick={handleLike}
                >
                  <span>♥</span> {isCurrentFavorite ? t('home.liked') : t('home.like')}
                </button>
              </div>
            </>
          )}
        </div>

        {/* RIGHT – sidebar */}
        <div className="hm-sidebar">

          <div className="hm-filters-card">
            <h3 className="hm-sidebar-title">{t('home.filtersTitle')}</h3>

            <div className="hm-filter-group">
              <label className="hm-filter-label">{t('home.filterLocation')}</label>
              <select className="hm-filter-select" value={selectedRegion} onChange={handleRegionChange}>
                <option value="">{t('home.allLocations')}</option>
                {REGIONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div className="hm-filter-group">
              <label className="hm-filter-label">{t('home.filterPetType')}</label>
              <select className="hm-filter-select" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                <option value="">{t('home.allTypes')}</option>
                <option value="cat">{t('home.typeCat')}</option>
                <option value="dog">{t('home.typeDog')}</option>
              </select>
            </div>

            <div className="hm-filter-group">
              <label className="hm-filter-label">{t('home.filterSize')}</label>
              <select className="hm-filter-select" value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                <option value="">{t('home.allSizes')}</option>
                <option value="Small">{t('home.sizeSmall')}</option>
                <option value="Medium">{t('home.sizeMedium')}</option>
                <option value="Large">{t('home.sizeLarge')}</option>
              </select>
            </div>

            <button className="hm-apply-btn" onClick={handleApplyFilters}>{t('home.applyFilters')}</button>
            {filtersApplied && (
              <button className="hm-clear-btn hm-clear-btn--sidebar" onClick={handleClearFilters}>
                {t('home.clearFilters')}
              </button>
            )}
          </div>

          <div className="hm-favorites-card">
            <h3 className="hm-sidebar-title">{t('home.favoritesTitle')}</h3>

            {favoritePets.length === 0 ? (
              <p className="hm-fav-empty">
                {isLoggedIn
                  ? t('home.favEmptyLoggedIn')
                  : t('home.favEmptyLoggedOut')}
              </p>
            ) : (
              favoritePets.map((fav) => (
                <div key={fav.id} className="hm-fav-row">
                  <img src={fav.image} alt={fav.name} className="hm-fav-img" />
                  <div className="hm-fav-info">
                    <p className="hm-fav-name">{isHe && fav.name_he ? fav.name_he : fav.name}</p>
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
