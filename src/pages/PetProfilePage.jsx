import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import pets from '../data/pets.js';
import TrustFeaturesSection from '../components/TrustFeaturesSection.jsx';
import Footer from '../components/Footer.jsx';
import useUserPreferences from '../hooks/useUserPreferences.js';
import { calculateMatchPercent } from '../utils/matching.js';

function PetProfilePage({ selectedPetId, onNavigate, isLoggedIn, favorites, toggleFavorite, requireRegistration, currentUser }) {
  const { t } = useTranslation();
  const pet = pets.find((p) => p.id === selectedPetId) || pets[0];
  const [activeImage, setActiveImage] = useState(pet.image);
  const userPreferences = useUserPreferences(currentUser);
  const matchPercent = calculateMatchPercent(pet, userPreferences);

  const allImages = [pet.image, ...pet.galleryImages];
  const isFavorite = favorites?.includes(pet.id);
  const similarPets = pet.similarPetIds
    .map((id) => pets.find((p) => p.id === id))
    .filter(Boolean);

  const handleFavorite = () => {
    if (!isLoggedIn) { requireRegistration(); return; }
    toggleFavorite(pet.id);
  };

  const handleAdopt = () => {
    if (!isLoggedIn) { requireRegistration(); return; }
    onNavigate('requests');
  };

  const handleContact = () => {
    if (!isLoggedIn) { requireRegistration(); return; }
    onNavigate('requests');
  };

  const handleSimilarHeart = (e, petId) => {
    e.stopPropagation();
    if (!isLoggedIn) { requireRegistration(); return; }
    toggleFavorite(petId);
  };

  const displayImage = allImages.includes(activeImage) ? activeImage : pet.image;

  return (
    <main className="page page-profile pp-page">

      {/* ── Hero ── */}
      <div className="pp-hero">
        <div className="pp-hero-top">
          <div>
            <h1 className="pp-hero-name">{pet.name}</h1>
            <p className="pp-hero-subtitle">
              {pet.age} &middot; {pet.gender} &middot; {pet.breed}
            </p>
          </div>
          {matchPercent !== null && (
            <span className="match-pill">{matchPercent}% match</span>
          )}
        </div>
      </div>

      {/* ── Two-column layout ── */}
      <div className="pp-layout">

        {/* LEFT – gallery */}
        <div className="pp-gallery">
          <div className="pp-main-img-wrap">
            <img src={displayImage} alt={pet.name} className="pp-main-img" />
          </div>
          <div className="pp-thumbs">
            {allImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${pet.name} ${i + 1}`}
                className={`pp-thumb${displayImage === img ? ' pp-thumb--active' : ''}`}
                onClick={() => setActiveImage(img)}
              />
            ))}
          </div>
        </div>

        {/* RIGHT – quick info card */}
        <div className="pp-sidebar">
          <div className="pp-quick-card">

            <div className="pp-info-grid">
              <div className="pp-info-item">
                <span className="pp-info-label">{t('petProfile.labelAge')}</span>
                <span className="pp-info-value">{pet.age}</span>
              </div>
              <div className="pp-info-item">
                <span className="pp-info-label">{t('petProfile.labelGender')}</span>
                <span className="pp-info-value">{pet.gender}</span>
              </div>
              <div className="pp-info-item">
                <span className="pp-info-label">{t('petProfile.labelBreed')}</span>
                <span className="pp-info-value">{pet.breed}</span>
              </div>
              <div className="pp-info-item">
                <span className="pp-info-label">{t('petProfile.labelSize')}</span>
                <span className="pp-info-value">{pet.size}</span>
              </div>
              <div className="pp-info-item pp-info-item--wide">
                <span className="pp-info-label">{t('petProfile.labelLocation')}</span>
                <span className="pp-info-value">📍 {pet.location}</span>
              </div>
            </div>

            <div className="tags-row">
              {pet.details.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>

            <div className="pp-action-stack">
              <button className="button button-primary" onClick={handleAdopt}>
                {t('petProfile.startAdoption')}
              </button>
              <button
                className={`button ${isFavorite ? 'button-primary' : 'button-secondary'} pp-fav-btn`}
                onClick={handleFavorite}
              >
                {isFavorite ? t('petProfile.savedToFavorites') : t('petProfile.saveToFavorites')}
              </button>
              <button className="button button-secondary" onClick={handleContact}>
                {t('petProfile.contactShelter')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── About ── */}
      <section className="pp-section card">
        <h2 className="pp-section-title">{t('petProfile.aboutTitle', { name: pet.name })}</h2>
        <p className="pp-about-text">{pet.about}</p>
      </section>

      {/* ── Health & Care ── */}
      <section className="pp-section card">
        <h2 className="pp-section-title">{t('petProfile.healthTitle')}</h2>
        <div className="pp-health-grid">
          <div className="pp-health-item">
            <span className="pp-health-label">{t('petProfile.labelVaccination')}</span>
            <span className="pp-health-value">{pet.healthCare.vaccinationStatus}</span>
          </div>
          <div className="pp-health-item">
            <span className="pp-health-label">{t('petProfile.labelEnergy')}</span>
            <span className="pp-health-value">{pet.healthCare.energyLevel}</span>
          </div>
          <div className="pp-health-item">
            <span className="pp-health-label">{t('petProfile.labelMedicalHistory')}</span>
            <span className="pp-health-value">{pet.healthCare.medicalHistory}</span>
          </div>
          <div className="pp-health-item">
            <span className="pp-health-label">{t('petProfile.labelSpecialNeeds')}</span>
            <span className="pp-health-value">{pet.healthCare.specialNeeds}</span>
          </div>
        </div>
      </section>

      {/* ── Adoption Information ── */}
      <section className="pp-section card">
        <h2 className="pp-section-title">{t('petProfile.adoptionTitle')}</h2>
        <div className="pp-adoption-grid">
          <div className="pp-adoption-item">
            <span className="pp-health-label">{t('petProfile.labelShelter')}</span>
            <span className="pp-health-value">{pet.adoptionInfo.shelterName}</span>
          </div>
          <div className="pp-adoption-item">
            <span className="pp-health-label">{t('petProfile.labelAddress')}</span>
            <span className="pp-health-value">{pet.adoptionInfo.address}</span>
          </div>
          <div className="pp-adoption-item">
            <span className="pp-health-label">{t('petProfile.labelPhone')}</span>
            <span className="pp-health-value">{pet.adoptionInfo.phone}</span>
          </div>
          <div className="pp-adoption-item">
            <span className="pp-health-label">{t('petProfile.labelFee')}</span>
            <span className="pp-health-value">{pet.adoptionInfo.adoptionFee}</span>
          </div>
        </div>
        <div className="pp-requirements">
          <h4 className="pp-requirements-title">{t('petProfile.requirementsTitle')}</h4>
          <ul className="pp-requirements-list">
            {pet.adoptionInfo.requirements.map((req) => (
              <li key={req}>{req}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Similar Pets ── */}
      <section className="pp-section">
        <h2 className="pp-section-title">{t('petProfile.similarTitle')}</h2>
        <div className="pp-similar-grid">
          {similarPets.map((sp) => (
            <div
              key={sp.id}
              className="pp-similar-card"
              onClick={() => onNavigate('profile', sp.id)}
            >
              <img src={sp.image} alt={sp.name} className="pp-similar-img" />
              <div className="pp-similar-info">
                <div className="pp-similar-top">
                  <div>
                    <h4 className="pp-similar-name">{sp.name}</h4>
                    <p className="pp-similar-meta">{sp.breed} &middot; {sp.age}</p>
                  </div>
                  <button
                    className={`pp-similar-heart${favorites?.includes(sp.id) ? ' pp-similar-heart--active' : ''}`}
                    onClick={(e) => handleSimilarHeart(e, sp.id)}
                    aria-label={`Save ${sp.name} to favorites`}
                  >
                    ♥
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <TrustFeaturesSection />
      <Footer onNavigate={onNavigate} />
    </main>
  );
}

export default PetProfilePage;
