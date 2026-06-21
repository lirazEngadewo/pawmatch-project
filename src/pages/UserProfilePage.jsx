import { useState, useEffect, useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';
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

function UserProfilePage({ currentUser, favorites, onNavigate, onAvatarChange }) {
  const { t, i18n } = useTranslation();
  const isHe = i18n.language === 'he';
  const [profile, setProfile] = useState(null);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [avatarError, setAvatarError] = useState('');
  const fileInputRef = useRef(null);
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

  useEffect(() => {
    if (!currentUser) return;
    supabase
      .from('profiles')
      .select('full_name, avatar_url, bio')
      .eq('user_id', currentUser.id)
      .maybeSingle()
      .then(({ data }) => setProfile(data ?? null));
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

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarError('');

    if (!file.type.startsWith('image/')) {
      setAvatarError(t('userProfile.avatarErrorType'));
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setAvatarError(t('userProfile.avatarErrorSize'));
      return;
    }

    setAvatarUploading(true);
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(`${currentUser.id}/avatar`, file, { upsert: true });

    if (uploadError) {
      setAvatarUploading(false);
      setAvatarError(t('userProfile.avatarErrorUpload'));
      return;
    }

    const { data: urlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(`${currentUser.id}/avatar`);

    const publicUrl = `${urlData.publicUrl}?t=${Date.now()}`;

    await supabase
      .from('profiles')
      .upsert({ user_id: currentUser.id, avatar_url: publicUrl }, { onConflict: 'user_id' });
    setProfile((prev) => ({ ...prev, avatar_url: publicUrl }));
    onAvatarChange?.(publicUrl);
    setAvatarUploading(false);
  };

  const displayName = profile?.full_name || `${currentUser?.user_metadata?.first_name ?? ''} ${currentUser?.user_metadata?.last_name ?? ''}`.trim();
  const initials = displayName.split(' ').map((w) => w[0] || '').slice(0, 2).join('').toUpperCase();

  const statusColors = {
    pending: { background: '#FEF3C7', color: '#92400E' },
    approved: { background: '#D1FAE5', color: '#065F46' },
    rejected: { background: '#FEE2E2', color: '#991B1B' },
  };

  const getStatusLabel = (status) => {
    if (status === 'pending') return t('userProfile.statusPending');
    if (status === 'approved') return t('userProfile.statusApproved');
    if (status === 'rejected') return t('userProfile.statusRejected');
    return status;
  };

  return (
    <main className="page up-page">

      {/* ── Greeting ── */}
      <div className="up-greeting">
        <h1 className="up-greeting-title">{t('userProfile.greetingTitle', { name: displayName.split(' ')[0] || 'there' })}</h1>
        <p className="up-greeting-sub"><Trans i18nKey="userProfile.greetingSub" components={{ ltr: <span dir="ltr" /> }} /></p>
      </div>

      {/* ── Matching Quiz Banner ── */}
      {prefsLoaded && !hasCompletedQuiz && (
        <div className="up-quiz-banner card">
          <p className="up-quiz-banner-text">{t('userProfile.quizBannerText')}</p>
          <button className="button button-primary" onClick={() => setShowQuizModal(true)}>
            {t('userProfile.takeQuiz')}
          </button>
        </div>
      )}

      {/* ── User Details ── */}
      <section className="up-section">
        <div className="up-details-card card">
          <div className="up-avatar-wrap">
            {profile?.avatar_url
              ? <img src={profile.avatar_url} alt="Profile" className="up-avatar-img" />
              : <div className="up-details-avatar">{initials || '?'}</div>
            }
            <button
              type="button"
              className="up-avatar-camera"
              aria-label="Change profile picture"
              disabled={avatarUploading}
              onClick={() => fileInputRef.current?.click()}
            >
              {avatarUploading ? '…' : '📷'}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleAvatarChange}
            />
          </div>
          <div className="up-details-body">
            <h2 className="up-details-name">{displayName || '—'}</h2>
            {avatarError && <p className="up-avatar-error">{avatarError}</p>}
            <div className="up-details-grid">
              <div className="up-detail-item">
                <span className="up-detail-label">{t('userProfile.labelEmail')}</span>
                <span className="up-detail-value">{currentUser?.email}</span>
              </div>
              <div className="up-detail-item">
                <span className="up-detail-label">{t('userProfile.labelAccountStatus')}</span>
                <span className="up-detail-value up-status-active">{t('userProfile.statusActive')}</span>
              </div>
              <div className="up-detail-item">
                <span className="up-detail-label">{t('userProfile.labelMemberType')}</span>
                <span className="up-detail-value"><Trans i18nKey="userProfile.memberTypeValue" components={{ ltr: <span dir="ltr" /> }} /></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Matching Preferences ── */}
      {hasCompletedQuiz && (
        <section className="up-section">
          <h2 className="up-section-title">{t('userProfile.prefsTitle')}</h2>
          <div className="up-prefs-card card">
            <p className="up-quiz-banner-text">{t('userProfile.prefsText')}</p>
            <button className="button button-primary" onClick={() => setShowQuizModal(true)}>
              {t('userProfile.editPrefs')}
            </button>
          </div>
        </section>
      )}

      {/* ── Favorite Pets ── */}
      <section className="up-section">
        <h2 className="up-section-title">{t('userProfile.favoritesTitle')}</h2>
        {favoritePets.length === 0 ? (
          <div className="up-empty card">
            <p className="up-empty-text">{t('userProfile.favEmptyText')}</p>
            <button className="button button-primary" onClick={() => onNavigate('home')}>
              {t('userProfile.browsePets')}
            </button>
          </div>
        ) : (
          <div className="up-pet-grid">
            {favoritePets.map((pet) => (
              <div key={pet.id} className="up-pet-card card">
                <img src={pet.image} alt={pet.name} className="up-pet-img" />
                <div className="up-pet-body">
                  <h3 className="up-pet-name">{isHe && pet.name_he ? pet.name_he : pet.name}</h3>
                  <p className="up-pet-meta">{isHe && pet.breed_he ? pet.breed_he : pet.breed} &middot; {pet.age}</p>
                  <p className="up-pet-location">📍 {isHe && pet.location_he ? pet.location_he : pet.location}</p>
                  <button
                    className="button button-primary up-pet-btn"
                    onClick={() => onNavigate('profile', pet.id)}
                  >
                    {t('userProfile.viewProfile')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Requests ── */}
      <section className="up-section">
        <h2 className="up-section-title">{t('userProfile.requestsTitle')}</h2>
        {requests.length === 0 ? (
          <div className="up-empty card">
            <p className="up-empty-text">{t('userProfile.reqEmptyText')}</p>
            <button className="button button-primary" onClick={() => onNavigate('home')}>
              {t('userProfile.browsePets')}
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
              const colors = statusColors[req.status] || { background: '#E5E7EB', color: '#374151' };
              return (
                <div key={req.id} className="up-request-card card">
                  {reqPet && (
                    <img src={reqPet.image} alt={reqPet.name} className="up-request-img" />
                  )}
                  <div className="up-request-info">
                    <h4 className="up-request-pet">{isHe && reqPet?.name_he ? reqPet.name_he : (reqPet?.name || '—')}</h4>
                    <p className="up-request-type">{requestTypeLabel}</p>
                    <p className="up-request-date">{t('userProfile.submitted', { date: submittedDate })}</p>
                  </div>
                  <span className="up-status-badge" style={{ background: colors.background, color: colors.color }}>
                    {getStatusLabel(req.status)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ── Shelter Messages ── */}
      <section className="up-section">
        <h2 className="up-section-title">{t('userProfile.messagesTitle')}</h2>
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
