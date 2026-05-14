import { useState } from 'react';
import pets from '../data/pets.js';
import TrustFeaturesSection from '../components/TrustFeaturesSection.jsx';
import Footer from '../components/Footer.jsx';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const REQUIRED = <span className="rq-required">*</span>;

function RequestsPage({ selectedPetId, onNavigate, isLoggedIn, requireRegistration }) {
  const pet = pets.find((p) => p.id === selectedPetId) || pets[0];

  const [requestType, setRequestType] = useState('meeting');
  const [form, setForm] = useState({
    // shared
    fullName: '', email: '', phone: '',
    // meeting
    date: '', message: '',
    // adoption
    address: '', housingType: '', otherPets: '', whyAdopt: '', petExperience: '', additionalNotes: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  if (!isLoggedIn) {
    requireRegistration();
    return null;
  }

  const switchType = (type) => {
    setRequestType(type);
    setErrors({});
    setSubmitted(false);
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required.';
    if (!form.email.trim()) e.email = 'Email is required.';
    else if (!EMAIL_RE.test(form.email)) e.email = 'Please enter a valid email address.';
    if (!form.phone.trim()) e.phone = 'Phone number is required.';

    if (requestType === 'meeting') {
      if (!form.date) e.date = 'Preferred meeting date is required.';
      if (!form.message.trim()) e.message = 'Message is required.';
    } else {
      if (!form.address.trim()) e.address = 'Address is required.';
      if (!form.housingType) e.housingType = 'Please select a housing type.';
      if (!form.otherPets) e.otherPets = 'Please answer this question.';
      if (!form.whyAdopt.trim()) e.whyAdopt = 'Please tell us why you want to adopt.';
      if (!form.petExperience.trim()) e.petExperience = 'Please describe your experience with pets.';
    }
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setSubmitted(true);
  };

  const isMeeting = requestType === 'meeting';

  return (
    <main className="page page-requests">

      {/* Title */}
      <div className="rq-header">
        <p className="eyebrow">Adoption request</p>
        <h1 className="rq-title">Start Your Adoption Journey</h1>
      </div>

      {/* Pet summary card */}
      <div className="rq-pet-card card">
        <img src={pet.image} alt={pet.name} className="rq-pet-img" />
        <div className="rq-pet-info">
          <h3 className="rq-pet-name">{pet.name}</h3>
          <p className="rq-pet-meta">{pet.age} &middot; {pet.gender} &middot; {pet.breed}</p>
          <p className="rq-pet-location">📍 {pet.location}</p>
        </div>
      </div>

      {/* Option selector */}
      <div className="rq-options">
        <button
          className={`rq-option-card${isMeeting ? ' rq-option-card--active' : ''}`}
          onClick={() => switchType('meeting')}
          type="button"
        >
          <span className="rq-option-icon">🐾</span>
          <span className="rq-option-label">Request a Meeting</span>
          <span className="rq-option-desc">Schedule a time to meet the pet at the shelter.</span>
        </button>
        <button
          className={`rq-option-card${!isMeeting ? ' rq-option-card--active' : ''}`}
          onClick={() => switchType('adoption')}
          type="button"
        >
          <span className="rq-option-icon">🏠</span>
          <span className="rq-option-label">Adoption Application</span>
          <span className="rq-option-desc">Submit a formal adoption application.</span>
        </button>
      </div>

      {/* Form or success */}
      {!submitted ? (
        <div className="rq-form-card card">
          <h2 className="rq-form-title">
            {isMeeting ? 'Meeting Request Details' : 'Adoption Application Details'}
          </h2>
          <form className="rq-form" onSubmit={handleSubmit} noValidate>

            {/* Shared: Full Name */}
            <div className="rq-field">
              <label className="rq-label">Full Name {REQUIRED}</label>
              <input
                type="text"
                className={`rq-input${errors.fullName ? ' rq-input--error' : ''}`}
                placeholder="Your full name"
                value={form.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
              />
              {errors.fullName && <p className="rq-error-text">{errors.fullName}</p>}
            </div>

            {/* Shared: Email + Phone */}
            <div className="rq-row">
              <div className="rq-field">
                <label className="rq-label">Email {REQUIRED}</label>
                <input
                  type="email"
                  className={`rq-input${errors.email ? ' rq-input--error' : ''}`}
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                />
                {errors.email && <p className="rq-error-text">{errors.email}</p>}
              </div>
              <div className="rq-field">
                <label className="rq-label">Phone {REQUIRED}</label>
                <input
                  type="tel"
                  className={`rq-input${errors.phone ? ' rq-input--error' : ''}`}
                  placeholder="+1 (555) 000-0000"
                  value={form.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                />
                {errors.phone && <p className="rq-error-text">{errors.phone}</p>}
              </div>
            </div>

            {isMeeting ? (
              <>
                {/* Meeting: Date */}
                <div className="rq-field">
                  <label className="rq-label">Preferred Meeting Date {REQUIRED}</label>
                  <input
                    type="date"
                    className={`rq-input${errors.date ? ' rq-input--error' : ''}`}
                    value={form.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                  />
                  {errors.date && <p className="rq-error-text">{errors.date}</p>}
                </div>

                {/* Meeting: Message */}
                <div className="rq-field">
                  <label className="rq-label">Message / Notes {REQUIRED}</label>
                  <textarea
                    className={`rq-input rq-textarea${errors.message ? ' rq-input--error' : ''}`}
                    placeholder="Tell us why you'd like to meet this pet, any questions you have, or anything else we should know..."
                    value={form.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    rows={5}
                  />
                  {errors.message && <p className="rq-error-text">{errors.message}</p>}
                </div>
              </>
            ) : (
              <>
                {/* Adoption: Address */}
                <div className="rq-field">
                  <label className="rq-label">Address {REQUIRED}</label>
                  <input
                    type="text"
                    className={`rq-input${errors.address ? ' rq-input--error' : ''}`}
                    placeholder="123 Main St, City, State"
                    value={form.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                  />
                  {errors.address && <p className="rq-error-text">{errors.address}</p>}
                </div>

                {/* Adoption: Housing + Other Pets */}
                <div className="rq-row">
                  <div className="rq-field">
                    <label className="rq-label">Housing Type {REQUIRED}</label>
                    <select
                      className={`rq-input${errors.housingType ? ' rq-input--error' : ''}`}
                      value={form.housingType}
                      onChange={(e) => handleChange('housingType', e.target.value)}
                    >
                      <option value="">Select housing type</option>
                      <option value="house">House with yard</option>
                      <option value="apartment">Apartment</option>
                      <option value="condo">Condo / Townhouse</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.housingType && <p className="rq-error-text">{errors.housingType}</p>}
                  </div>
                  <div className="rq-field">
                    <label className="rq-label">Do you have other pets? {REQUIRED}</label>
                    <select
                      className={`rq-input${errors.otherPets ? ' rq-input--error' : ''}`}
                      value={form.otherPets}
                      onChange={(e) => handleChange('otherPets', e.target.value)}
                    >
                      <option value="">Select an option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                    {errors.otherPets && <p className="rq-error-text">{errors.otherPets}</p>}
                  </div>
                </div>

                {/* Adoption: Why adopt */}
                <div className="rq-field">
                  <label className="rq-label">Why do you want to adopt this pet? {REQUIRED}</label>
                  <textarea
                    className={`rq-input rq-textarea${errors.whyAdopt ? ' rq-input--error' : ''}`}
                    placeholder="Tell us what makes you the right home for this pet..."
                    value={form.whyAdopt}
                    onChange={(e) => handleChange('whyAdopt', e.target.value)}
                    rows={4}
                  />
                  {errors.whyAdopt && <p className="rq-error-text">{errors.whyAdopt}</p>}
                </div>

                {/* Adoption: Experience */}
                <div className="rq-field">
                  <label className="rq-label">Experience with pets {REQUIRED}</label>
                  <textarea
                    className={`rq-input rq-textarea${errors.petExperience ? ' rq-input--error' : ''}`}
                    placeholder="Describe any previous experience owning or caring for pets..."
                    value={form.petExperience}
                    onChange={(e) => handleChange('petExperience', e.target.value)}
                    rows={4}
                  />
                  {errors.petExperience && <p className="rq-error-text">{errors.petExperience}</p>}
                </div>

                {/* Adoption: Additional Notes (optional) */}
                <div className="rq-field">
                  <label className="rq-label">Additional Notes</label>
                  <textarea
                    className="rq-input rq-textarea"
                    placeholder="Anything else you'd like us to know? (optional)"
                    value={form.additionalNotes}
                    onChange={(e) => handleChange('additionalNotes', e.target.value)}
                    rows={3}
                  />
                </div>
              </>
            )}

            <button type="submit" className="button button-primary rq-submit-btn">
              {isMeeting ? 'Request Meeting' : 'Submit Adoption Application'}
            </button>
          </form>
        </div>
      ) : (
        <div className="rq-success-card card">
          <div className="rq-success-icon">✓</div>
          <h2 className="rq-success-heading">
            {isMeeting
              ? 'Your meeting request was submitted successfully!'
              : 'Your adoption application was submitted successfully!'}
          </h2>
          <p className="rq-success-body">We'll be in touch soon to confirm the details with you.</p>
          <button className="button button-secondary rq-back-btn" onClick={() => onNavigate('home')}>
            Back to browsing
          </button>
        </div>
      )}

      {/* Important info box — updates with mode */}
      <div className="rq-info-box">
        <span className="rq-info-icon">ℹ️</span>
        <p>
          {isMeeting
            ? 'You must meet the pet and receive approval before submitting an adoption request.'
            : 'Applications are reviewed by the shelter before approval.'}
        </p>
      </div>

      <TrustFeaturesSection />
      <Footer />
    </main>
  );
}

export default RequestsPage;
