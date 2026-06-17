import { useState, useEffect } from 'react';
import pets from '../data/pets.js';
import Footer from '../components/Footer.jsx';
import MatchingQuizModal from '../components/MatchingQuizModal.jsx';
import { supabase } from '../lib/supabaseClient.js';

const SAMPLE_MESSAGES = [
  {
    id: 1,
    shelterName: 'Austin Paws Rescue',
    message: 'We received your meeting request for Luna. A shelter volunteer will contact you within 2 business days to confirm the date.',
    date: 'May 12, 2026',
    petName: 'Luna',
  },
  {
    id: 2,
    shelterName: 'Seattle Animal Shelter',
    message: 'Your adoption application for Simba has been approved! Please contact us to arrange the next steps.',
    date: 'May 11, 2026',
    petName: 'Simba',
  },
  {
    id: 3,
    shelterName: 'Brooklyn Animal Rescue',
    message: 'Happy Tails Rescue Center received your meeting request for Milo. We would love to introduce you -- he has been waiting for a loving home!',
    date: 'May 8, 2026',
    petName: 'Milo',
  },
];

const STATUS_DISPLAY = {
  pending: { label: 'Pending Approval', background: '#FEF3C7', color: '#92400E' },
  approved: { label: 'Approved', background: '#D1FAE5', color: '#065F46' },
  rejected: { label: 'Rejected', background: '#FEE2E2', color: '#991B1B' },
};

function UserProfilePage({ currentUser, favorites, onNavigate }) {
  const [userPreferences, setUserPreferences] = useState(null);
  const [prefsLoaded, setPrefsLoaded] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);

  const refreshPreferences = () => {
    if (!currentUser) return;
    supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', currentUser.id)
      .maybeSingle()
      .then(({ data }) => {
        setUserPreferences(data ?? null);
        setPrefsLoaded(true);
      });
  };

  useEffect(() => {
    refreshPreferences();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    console.log('UserProfilePage: fetching adoption requests for user_id =', currentUser?.id);

    const query = currentUser
      ? supabase
          .from('adoption_requests')
          .select('*')
          .eq('user_id', currentUser.id)
          .order('created_at', { ascending: false })
      : Promise.resolve({ data: [], error: null });

    query.then(({ data, error }) => {
      console.log('UserProfilePage: adoption requests query result', { data, error });
      if (error) {
        console.error('UserProfilePage: failed to load adoption requests', error);
      }
      setRequests(data ?? []);
    });
  }, [currentUser]);

  const hasCompletedQuiz = Boolean(userPreferences?.completed);

  const favoritePets = (favorites || [])
    .map((id) => pets.find((p) => p.id === id))
    .filter(Boolean);

  const initials = ((currentUser?.user_metadata?.first_name?.[0] || '') + (currentUser?.user_metadata?.last_name?.[0] || '')).toUpperCase();

  return (
    <main className="page up-page">

      {/* ── Greeting ── */}
      <div className="up-greeting">
        <h1 className="up-greeting-title">Hello, {currentUser?.user_metadata?.first_name}</h1>
        <p className="up-greeting-sub">Welcome back to your PawMatch dashboard.</p>
      </div>

      {/* ── Matching Quiz Banner ── */}
      {prefsLoaded && !hasCompletedQuiz && (
        <div className="up-quiz-banner card">
          <p className="up-quiz-banner-text">
            Complete your matching quiz for personalized recommendations.
          </p>
          <button className="button button-primary" onClick={() => setShowQuizModal(true)}>
            Take the Quiz
          </button>
        </div>
      )}

      {/* ── User Details ── */}
      <section className="up-section">
        <div className="up-details-card card">
          <div className="up-details-avatar">{initials || '?'}</div>
          <div className="up-details-body">
            <h2 className="up-details-name">{currentUser?.user_metadata?.first_name} {currentUser?.user_metadata?.last_name}</h2>
            <div className="up-details-grid">
              <div className="up-detail-item">
                <span className="up-detail-label">Email</span>
                <span className="up-detail-value">{currentUser?.email}</span>
              </div>
              <div className="up-detail-item">
                <span className="up-detail-label">Account Status</span>
                <span className="up-detail-value up-status-active">Active</span>
              </div>
              <div className="up-detail-item">
                <span className="up-detail-label">Member Type</span>
                <span className="up-detail-value">PawMatch Adopter</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Matching Preferences ── */}
      {hasCompletedQuiz && (
        <section className="up-section">
          <h2 className="up-section-title">Your Matching Preferences</h2>
          <div className="up-prefs-card card">
            <p className="up-quiz-banner-text">
              You've completed the matching quiz. Update your answers anytime to refine your pet recommendations.
            </p>
            <button className="button button-primary" onClick={() => setShowQuizModal(true)}>
              Edit Preferences
            </button>
          </div>
        </section>
      )}

      {/* ── Favorite Pets ── */}
      <section className="up-section">
        <h2 className="up-section-title">Your Favorite Pets</h2>
        {favoritePets.length === 0 ? (
          <div className="up-empty card">
            <p className="up-empty-text">No favorite pets yet. Browse pets and save your favorites!</p>
            <button className="button button-primary" onClick={() => onNavigate('home')}>
              Browse Pets
            </button>
          </div>
        ) : (
          <div className="up-pet-grid">
            {favoritePets.map((pet) => (
              <div key={pet.id} className="up-pet-card card">
                <img src={pet.image} alt={pet.name} className="up-pet-img" />
                <div className="up-pet-body">
                  <h3 className="up-pet-name">{pet.name}</h3>
                  <p className="up-pet-meta">{pet.breed} &middot; {pet.age}</p>
                  <p className="up-pet-location">📍 {pet.location}</p>
                  <button
                    className="button button-primary up-pet-btn"
                    onClick={() => onNavigate('profile', pet.id)}
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Requests ── */}
      <section className="up-section">
        <h2 className="up-section-title">Your Requests</h2>
        {requests.length === 0 ? (
          <div className="up-empty card">
            <p className="up-empty-text">No requests yet. Browse pets and reach out to get started!</p>
            <button className="button button-primary" onClick={() => onNavigate('home')}>
              Browse Pets
            </button>
          </div>
        ) : (
          <div className="up-requests-list">
            {requests.map((req) => {
              const reqPet = pets.find((p) => p.id === req.pet_id);
              const requestTypeLabel = (req.message || '').split('\n')[0] || 'Request';
              const submittedDate = new Date(req.created_at).toLocaleDateString('en-US', {
                month: 'long', day: 'numeric', year: 'numeric',
              });
              const statusInfo = STATUS_DISPLAY[req.status] || { label: req.status, background: '#E5E7EB', color: '#374151' };
              return (
                <div key={req.id} className="up-request-card card">
                  {reqPet && (
                    <img src={reqPet.image} alt={reqPet.name} className="up-request-img" />
                  )}
                  <div className="up-request-info">
                    <h4 className="up-request-pet">{reqPet?.name || 'Unknown pet'}</h4>
                    <p className="up-request-type">{requestTypeLabel}</p>
                    <p className="up-request-date">Submitted: {submittedDate}</p>
                  </div>
                  <span className="up-status-badge" style={{ background: statusInfo.background, color: statusInfo.color }}>
                    {statusInfo.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ── Shelter Messages ── */}
      <section className="up-section">
        <h2 className="up-section-title">Messages from Shelters</h2>
        <div className="up-messages-list">
          {SAMPLE_MESSAGES.map((msg) => (
            <div key={msg.id} className="up-message-card card">
              <div className="up-message-header">
                <div className="up-message-icon">🏠</div>
                <div className="up-message-meta">
                  <p className="up-message-shelter">{msg.shelterName}</p>
                  <p className="up-message-date">{msg.date}</p>
                </div>
                {msg.petName && (
                  <span className="up-message-pet-tag">{msg.petName}</span>
                )}
              </div>
              <p className="up-message-text">{msg.message}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer onNavigate={onNavigate} />

      {showQuizModal && (
        <MatchingQuizModal
          currentUser={currentUser}
          initialPreferences={userPreferences}
          onClose={() => setShowQuizModal(false)}
          onComplete={() => { setShowQuizModal(false); refreshPreferences(); }}
        />
      )}
    </main>
  );
}

export default UserProfilePage;
