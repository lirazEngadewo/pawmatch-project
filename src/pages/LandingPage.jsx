import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { translateGender, translateAge } from '../utils/petLocale.js';
import HowItWorksSection from '../components/HowItWorksSection.jsx';
import IsraelMap from '../components/IsraelMap.jsx';
import TrustFeaturesSection from '../components/TrustFeaturesSection.jsx';
import Footer from '../components/Footer.jsx';
import PetCarousel from '../components/PetCarousel.jsx';
import pets from '../data/pets.js';
import useUserPreferences from '../hooks/useUserPreferences.js';

function LandingPage({ onSelectPet, onNavigate, currentUser }) {
  const [heroIndex, setHeroIndex] = useState(0);
  const heroPet = pets[heroIndex];
  const userPreferences = useUserPreferences(currentUser);
  const { t, i18n } = useTranslation();
  const isHe = i18n.language === 'he';
  console.log('LandingPage debug:', { currentUser, userPreferences });

  const handleHeroNext = () => setHeroIndex((prev) => (prev + 1) % pets.length);
  const handleHeroPrev = () => setHeroIndex((prev) => (prev - 1 + pets.length) % pets.length);

  return (
    <main className="page page-landing">

      {/* ── HERO ── */}
      <section className="landing-hero-section">

        <div className="landing-hero-header">
          <h1 className="landing-hero-title">{t('landing.heroTitle')}</h1>
          <p className="landing-hero-subtitle">{t('landing.heroSubtitle')}</p>
        </div>

        <div className="landing-hero-card">
          <div className="landing-hero-image-area">
            <button
              className="landing-carousel-arrow landing-arrow-left"
              onClick={handleHeroPrev}
            >
              ‹
            </button>
            <img
              src={heroPet.image}
              alt={heroPet.name}
              className="landing-hero-img"
            />
            <button
              className="landing-carousel-arrow landing-arrow-right"
              onClick={handleHeroNext}
            >
              ›
            </button>
            <div className="landing-carousel-dots">
              {pets.map((_, i) => (
                <span
                  key={i}
                  className={`landing-dot${i === heroIndex ? ' active' : ''}`}
                />
              ))}
            </div>
          </div>

          <div className="landing-hero-info">
            <h2 className="landing-pet-name">
              {isHe && heroPet.name_he ? heroPet.name_he : heroPet.name}
            </h2>

            <div className="landing-meta-grid">
              <div className="landing-meta-item">
                <p className="meta-label">{t('landing.labelAge')}</p>
                <p className="meta-value">{translateAge(heroPet.age, isHe)}</p>
              </div>
              <div className="landing-meta-item">
                <p className="meta-label">{t('landing.labelGender')}</p>
                <p className="meta-value">{translateGender(heroPet.gender, isHe)}</p>
              </div>
              <div className="landing-meta-item">
                <p className="meta-label">{t('landing.labelBreed')}</p>
                <p className="meta-value">{isHe && heroPet.type_he ? heroPet.type_he : heroPet.type}</p>
              </div>
              <div className="landing-meta-item">
                <p className="meta-label">{t('landing.labelLocation')}</p>
                <p className="meta-value">📍 {heroPet.location}</p>
              </div>
            </div>

            <p className="landing-pet-description">
              {isHe && heroPet.short_description_he ? heroPet.short_description_he : heroPet.description}
            </p>

            <div className="tags-row">
              {(isHe && heroPet.tags_he ? heroPet.tags_he : heroPet.details).map((tag, i) => (
                <span key={i} className="tag">{tag}</span>
              ))}
            </div>

            <button
              className="button button-primary landing-cta"
              onClick={() => onSelectPet(heroPet.id)}
            >
              {t('landing.viewFullProfile')}
            </button>
          </div>
        </div>

      </section>

      {/* ── CTA ── */}
      <section className="section cta-section">
        <div className="cta-content">
          <p className="eyebrow">{t('landing.ctaEyebrow')}</p>
          <h3>{t('landing.ctaTitle')}</h3>
          <p className="body-copy">{t('landing.ctaBody')}</p>
          <button className="button button-primary" onClick={() => onNavigate('home')}>
            {t('landing.ctaButton')}
          </button>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="landing-stats">
        <div className="landing-stat-card">
          <strong>2,500+</strong>
          <span>{t('landing.statAdoptions')}</span>
        </div>
        <div className="landing-stat-card">
          <strong>150+</strong>
          <span>{t('landing.statShelters')}</span>
        </div>
        <div className="landing-stat-card">
          <strong>5,000+</strong>
          <span>{t('landing.statFamilies')}</span>
        </div>
        <div className="landing-stat-card">
          <strong>98%</strong>
          <span>{t('landing.statSatisfaction')}</span>
        </div>
      </div>

      {/* ── TESTIMONIALS ── */}
      <section className="section testimonial-section">
        <div className="section-header">
          <p className="eyebrow">{t('landing.testimonialsEyebrow')}</p>
          <h2>{t('landing.testimonialsTitle')}</h2>
        </div>
        <div className="testimonial-grid">
          <article className="testimonial-card">
            <div className="testimonial-header">
              <img
                src="https://images.unsplash.com/photo-1601979031925-424e53b6caaa?auto=format&fit=crop&w=120&q=80"
                alt={t('landing.testimonial1Name')}
                className="testimonial-avatar"
              />
              <div className="testimonial-copy">
                <h4>{t('landing.testimonial1Name')}</h4>
                <p>{t('landing.testimonial1Role')}</p>
              </div>
            </div>
            <p>{t('landing.testimonial1Text')}</p>
            <div className="star-rating">★★★★★</div>
          </article>
          <article className="testimonial-card">
            <div className="testimonial-header">
              <img
                src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80"
                alt={t('landing.testimonial2Name')}
                className="testimonial-avatar"
              />
              <div className="testimonial-copy">
                <h4>{t('landing.testimonial2Name')}</h4>
                <p>{t('landing.testimonial2Role')}</p>
              </div>
            </div>
            <p>{t('landing.testimonial2Text')}</p>
            <div className="star-rating">★★★★★</div>
          </article>
          <article className="testimonial-card">
            <div className="testimonial-header">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"
                alt={t('landing.testimonial3Name')}
                className="testimonial-avatar"
              />
              <div className="testimonial-copy">
                <h4>{t('landing.testimonial3Name')}</h4>
                <p>{t('landing.testimonial3Role')}</p>
              </div>
            </div>
            <p>{t('landing.testimonial3Text')}</p>
            <div className="star-rating">★★★★★</div>
          </article>
        </div>
      </section>

      {/* ── FEATURED PETS ── */}
      <section className="section featured-section">
        <div className="section-header">
          <p className="eyebrow">{t('landing.featuredEyebrow')}</p>
          <h2>{t('landing.featuredTitle')}</h2>
        </div>
        <PetCarousel
          pets={pets.filter((pet) => pet.id !== 'bella')}
          onSelectPet={onSelectPet}
          userPreferences={userPreferences}
        />
      </section>

      <HowItWorksSection />
      <IsraelMap />
      <TrustFeaturesSection />

      <section className="donation-cta-section">
        <div className="donation-cta-content">
          <h2>{t('landing.donationCtaTitle')}</h2>
          <p className="donation-cta-text">{t('landing.donationCtaText')}</p>
          <button
            className="button button-primary"
            onClick={() => onNavigate('donation')}
          >
            {t('landing.donationCtaButton')}
          </button>
          <p className="donation-cta-note">{t('landing.donationCtaNote')}</p>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </main>
  );
}

export default LandingPage;
