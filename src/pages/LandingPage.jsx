import { useState } from 'react';
import PetCard from '../components/PetCard.jsx';
import HowItWorksSection from '../components/HowItWorksSection.jsx';
import IsraelMap from '../components/IsraelMap.jsx';
import TrustFeaturesSection from '../components/TrustFeaturesSection.jsx';
import Footer from '../components/Footer.jsx';
import pets from '../data/pets.js';
import useUserPreferences from '../hooks/useUserPreferences.js';
import { calculateMatchPercent } from '../utils/matching.js';

function LandingPage({ onSelectPet, onNavigate, currentUser }) {
  const [heroIndex, setHeroIndex] = useState(0);
  const heroPet = pets[heroIndex];
  const userPreferences = useUserPreferences(currentUser);
  console.log('LandingPage debug:', { currentUser, userPreferences });

  const handleHeroNext = () => setHeroIndex((prev) => (prev + 1) % pets.length);
  const handleHeroPrev = () => setHeroIndex((prev) => (prev - 1 + pets.length) % pets.length);

  return (
    <main className="page page-landing">

      {/* ── HERO ── */}
      <section className="landing-hero-section">

        <div className="landing-hero-header">
          <h1 className="landing-hero-title">Meet Your Future Best Friend</h1>
          <p className="landing-hero-subtitle">
            Swipe through our featured pets ready for adoption
          </p>
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
            <h2 className="landing-pet-name">{heroPet.name}</h2>

            <div className="landing-meta-grid">
              <div className="landing-meta-item">
                <p className="meta-label">Age</p>
                <p className="meta-value">{heroPet.age}</p>
              </div>
              <div className="landing-meta-item">
                <p className="meta-label">Gender</p>
                <p className="meta-value">{heroPet.gender}</p>
              </div>
              <div className="landing-meta-item">
                <p className="meta-label">Breed</p>
                <p className="meta-value">{heroPet.type}</p>
              </div>
              <div className="landing-meta-item">
                <p className="meta-label">Location</p>
                <p className="meta-value">📍 {heroPet.location}</p>
              </div>
            </div>

            <p className="landing-pet-description">{heroPet.description}</p>

            <div className="tags-row">
              {heroPet.details.map((tag, i) => (
                <span key={i} className="tag">{tag}</span>
              ))}
            </div>

            <button
              className="button button-primary landing-cta"
              onClick={() => onSelectPet(heroPet.id)}
            >
              View Full Profile →
            </button>
          </div>
        </div>

      </section>

      {/* ── CTA ── */}
      <section className="section cta-section">
        <div className="cta-content">
          <p className="eyebrow">Ready to find your perfect match?</p>
          <h3>Start your adoption journey with PawMatch.</h3>
          <p className="body-copy">
            Discover warm profiles, trusted partners, and a simple adoption experience designed for families.
          </p>
          <button className="button button-primary" onClick={() => onNavigate('home')}>
            Start Your Journey Today
          </button>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="landing-stats">
        <div className="landing-stat-card">
          <strong>2,500+</strong>
          <span>Successful Adoptions</span>
        </div>
        <div className="landing-stat-card">
          <strong>150+</strong>
          <span>Shelter Partners</span>
        </div>
        <div className="landing-stat-card">
          <strong>5,000+</strong>
          <span>Happy Families</span>
        </div>
        <div className="landing-stat-card">
          <strong>98%</strong>
          <span>Satisfaction Rate</span>
        </div>
      </div>

      {/* ── TESTIMONIALS ── */}
      <section className="section testimonial-section">
        <div className="section-header">
          <p className="eyebrow">What Adopters Love</p>
          <h2>Kind stories from families who found their pet.</h2>
        </div>
        <div className="testimonial-grid">
          <article className="testimonial-card">
            <div className="testimonial-header">
              <img
                src="https://images.unsplash.com/photo-1601979031925-424e53b6caaa?auto=format&fit=crop&w=120&q=80"
                alt="Sara"
                className="testimonial-avatar"
              />
              <div className="testimonial-copy">
                <h4>Sara</h4>
                <p>New dog mom</p>
              </div>
            </div>
            <p>"PawMatch made adoption feel calm and personal. We found our perfect dog in just a few clicks."</p>
            <div className="star-rating">★★★★★</div>
          </article>
          <article className="testimonial-card">
            <div className="testimonial-header">
              <img
                src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80"
                alt="Daniel"
                className="testimonial-avatar"
              />
              <div className="testimonial-copy">
                <h4>Daniel</h4>
                <p>Cat dad</p>
              </div>
            </div>
            <p>"The pet previews helped me understand every animal's personality. Milo fits right in."</p>
            <div className="star-rating">★★★★★</div>
          </article>
          <article className="testimonial-card">
            <div className="testimonial-header">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"
                alt="Mia"
                className="testimonial-avatar"
              />
              <div className="testimonial-copy">
                <h4>Mia</h4>
                <p>Family adopter</p>
              </div>
            </div>
            <p>"Every step felt warm and thoughtful. We love our new family member and the support team was great."</p>
            <div className="star-rating">★★★★★</div>
          </article>
        </div>
      </section>

      {/* ── FEATURED PETS ── */}
      <section className="section featured-section">
        <div className="section-header">
          <p className="eyebrow">Featured Friends</p>
          <h2>Pets who are ready to meet you.</h2>
        </div>
        <div className="grid-list">
          {pets.filter((pet) => pet.id !== 'bella').map((pet) => {
            const matchPercent = calculateMatchPercent(pet, userPreferences);
            console.log('LandingPage matchPercent:', pet.name, matchPercent);
            return (
              <PetCard
                key={pet.id}
                pet={pet}
                onSelect={onSelectPet}
                matchPercent={matchPercent}
              />
            );
          })}
        </div>
      </section>

      <HowItWorksSection />
      <IsraelMap />
      <TrustFeaturesSection />

      <section className="donation-cta-section">
        <div className="donation-cta-content">
          <h2>Want to make a difference?</h2>
          <p className="donation-cta-text">Support the animals waiting for a home</p>
          <button
            className="button button-primary"
            onClick={() => onNavigate('donation')}
          >
            Donate to PawMatch ❤️
          </button>
          <p className="donation-cta-note">
            All donations go directly to the adoption organizations participating in PawMatch
          </p>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </main>
  );
}

export default LandingPage;
