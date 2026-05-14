import pets from '../data/pets.js';
import Footer from '../components/Footer.jsx';

const SAMPLE_REQUESTS = [
  {
    id: 1,
    petName: 'Luna',
    petId: 'luna',
    type: 'Meeting Request',
    date: 'May 12, 2026',
    status: 'Pending Approval',
  },
  {
    id: 2,
    petName: 'Simba',
    petId: 'simba',
    type: 'Adoption Application',
    date: 'May 10, 2026',
    status: 'Approved',
  },
  {
    id: 3,
    petName: 'Milo',
    petId: 'milo',
    type: 'Meeting Request',
    date: 'May 7, 2026',
    status: 'Message from Shelter',
  },
];

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

const STATUS_STYLES = {
  'Pending Approval': { background: '#FEF3C7', color: '#92400E' },
  'Approved':         { background: '#D1FAE5', color: '#065F46' },
  'Message from Shelter': { background: '#DBEAFE', color: '#1E40AF' },
};

function UserProfilePage({ currentUser, favorites, onNavigate }) {
  const favoritePets = (favorites || [])
    .map((id) => pets.find((p) => p.id === id))
    .filter(Boolean);

  const initials = ((currentUser?.firstName?.[0] || '') + (currentUser?.lastName?.[0] || '')).toUpperCase();

  return (
    <main className="page up-page">

      {/* ── Greeting ── */}
      <div className="up-greeting">
        <h1 className="up-greeting-title">Hello, {currentUser?.firstName}</h1>
        <p className="up-greeting-sub">Welcome back to your PawMatch dashboard.</p>
      </div>

      {/* ── User Details ── */}
      <section className="up-section">
        <div className="up-details-card card">
          <div className="up-details-avatar">{initials || '?'}</div>
          <div className="up-details-body">
            <h2 className="up-details-name">{currentUser?.firstName} {currentUser?.lastName}</h2>
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
        <div className="up-requests-list">
          {SAMPLE_REQUESTS.map((req) => {
            const reqPet = pets.find((p) => p.id === req.petId);
            return (
              <div key={req.id} className="up-request-card card">
                {reqPet && (
                  <img src={reqPet.image} alt={req.petName} className="up-request-img" />
                )}
                <div className="up-request-info">
                  <h4 className="up-request-pet">{req.petName}</h4>
                  <p className="up-request-type">{req.type}</p>
                  <p className="up-request-date">Submitted: {req.date}</p>
                </div>
                <span className="up-status-badge" style={STATUS_STYLES[req.status]}>
                  {req.status}
                </span>
              </div>
            );
          })}
        </div>
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

      <Footer />
    </main>
  );
}

export default UserProfilePage;
