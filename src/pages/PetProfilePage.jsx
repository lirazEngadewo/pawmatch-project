import { useState } from 'react';
import pets from '../data/pets.js';
import TrustFeaturesSection from '../components/TrustFeaturesSection.jsx';
import Footer from '../components/Footer.jsx';

function PetProfilePage({ selectedPetId, onNavigate, isLoggedIn, favorites, toggleFavorite, requireRegistration }) {
  const pet = pets.find((p) => p.id === selectedPetId) || pets[0];
  const [activeImage, setActiveImage] = useState(pet.image);

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

  // Reset active image when pet changes
  const displayImage = allImages.includes(activeImage) ? activeImage : pet.image;

  return (
    <main className="page page-profile pp-page">

      {/* ── Hero ── */}
      <div className="pp-hero">
        <h1 className="pp-hero-name">{pet.name}</h1>
        <p className="pp-hero-subtitle">
          {pet.age} &middot; {pet.gender} &middot; {pet.breed}
        </p>
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
                <span className="pp-info-label">Age</span>
                <span className="pp-info-value">{pet.age}</span>
              </div>
              <div className="pp-info-item">
                <span className="pp-info-label">Gender</span>
                <span className="pp-info-value">{pet.gender}</span>
              </div>
              <div className="pp-info-item">
                <span className="pp-info-label">Breed</span>
                <span className="pp-info-value">{pet.breed}</span>
              </div>
              <div className="pp-info-item">
                <span className="pp-info-label">Size</span>
                <span className="pp-info-value">{pet.size}</span>
              </div>
              <div className="pp-info-item pp-info-item--wide">
                <span className="pp-info-label">Location</span>
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
                Start Adoption Process
              </button>
              <button
                className={`button ${isFavorite ? 'button-primary' : 'button-secondary'} pp-fav-btn`}
                onClick={handleFavorite}
              >
                {isFavorite ? '♥ Saved to Favorites' : '♡ Save to Favorites'}
              </button>
              <button className="button button-secondary" onClick={handleContact}>
                Contact Shelter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── About ── */}
      <section className="pp-section card">
        <h2 className="pp-section-title">About {pet.name}</h2>
        <p className="pp-about-text">{pet.about}</p>
      </section>

      {/* ── Health & Care ── */}
      <section className="pp-section card">
        <h2 className="pp-section-title">Health &amp; Care</h2>
        <div className="pp-health-grid">
          <div className="pp-health-item">
            <span className="pp-health-label">Vaccination Status</span>
            <span className="pp-health-value">{pet.healthCare.vaccinationStatus}</span>
          </div>
          <div className="pp-health-item">
            <span className="pp-health-label">Energy Level</span>
            <span className="pp-health-value">{pet.healthCare.energyLevel}</span>
          </div>
          <div className="pp-health-item">
            <span className="pp-health-label">Medical History</span>
            <span className="pp-health-value">{pet.healthCare.medicalHistory}</span>
          </div>
          <div className="pp-health-item">
            <span className="pp-health-label">Special Needs</span>
            <span className="pp-health-value">{pet.healthCare.specialNeeds}</span>
          </div>
        </div>
      </section>

      {/* ── Adoption Information ── */}
      <section className="pp-section card">
        <h2 className="pp-section-title">Adoption Information</h2>
        <div className="pp-adoption-grid">
          <div className="pp-adoption-item">
            <span className="pp-health-label">Shelter</span>
            <span className="pp-health-value">{pet.adoptionInfo.shelterName}</span>
          </div>
          <div className="pp-adoption-item">
            <span className="pp-health-label">Address</span>
            <span className="pp-health-value">{pet.adoptionInfo.address}</span>
          </div>
          <div className="pp-adoption-item">
            <span className="pp-health-label">Phone</span>
            <span className="pp-health-value">{pet.adoptionInfo.phone}</span>
          </div>
          <div className="pp-adoption-item">
            <span className="pp-health-label">Adoption Fee</span>
            <span className="pp-health-value">{pet.adoptionInfo.adoptionFee}</span>
          </div>
        </div>
        <div className="pp-requirements">
          <h4 className="pp-requirements-title">Requirements</h4>
          <ul className="pp-requirements-list">
            {pet.adoptionInfo.requirements.map((req) => (
              <li key={req}>{req}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Similar Pets ── */}
      <section className="pp-section">
        <h2 className="pp-section-title">Similar Pets You Might Like</h2>
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
      <Footer />
    </main>
  );
}

export default PetProfilePage;
