import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import pets from '../data/pets.js';
import { supabase } from '../lib/supabaseClient.js';
import TrustFeaturesSection from '../components/TrustFeaturesSection.jsx';
import Footer from '../components/Footer.jsx';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const REQUIRED = <span className="rq-required">*</span>;

function RequestsPage({ selectedPetId, onNavigate, isLoggedIn, requireRegistration, favorites, currentUser }) {
  const { t } = useTranslation();

  const favoritePets = (favorites || [])
    .map((id) => pets.find((p) => p.id === id))
    .filter(Boolean);

  const [formPetId, setFormPetId] = useState(
    favoritePets.some((p) => p.id === selectedPetId) ? selectedPetId : (favoritePets[0]?.id || '')
  );
  const selectedFavoritePet = favoritePets.find((p) => p.id === formPetId);

  const [requestType, setRequestType] = useState('meeting');
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '',
    date: '', message: '',
    address: '', housingType: '', otherPets: '', whyAdopt: '', petExperience: '', additionalNotes: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

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

  const isMeeting = requestType === 'meeting';

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = t('requests.errorFullName');
    if (!form.email.trim()) e.email = t('requests.errorEmail');
    else if (!EMAIL_RE.test(form.email)) e.email = t('requests.errorEmailInvalid');
    if (!form.phone.trim()) e.phone = t('requests.errorPhone');

    if (requestType === 'meeting') {
      if (!form.date) e.date = t('requests.errorDate');
      if (!form.message.trim()) e.message = t('requests.errorMessage');
    } else {
      if (!form.address.trim()) e.address = t('requests.errorAddress');
      if (!form.housingType) e.housingType = t('requests.errorHousingType');
      if (!form.otherPets) e.otherPets = t('requests.errorOtherPets');
      if (!form.whyAdopt.trim()) e.whyAdopt = t('requests.errorWhyAdopt');
      if (!form.petExperience.trim()) e.petExperience = t('requests.errorExperience');
    }
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setSubmitError('');
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    const messageLines = [isMeeting ? 'Meeting Request' : 'Adoption Application'];
    messageLines.push(`Full Name: ${form.fullName}`);
    messageLines.push(`Email: ${form.email}`);
    messageLines.push(`Phone: ${form.phone}`);
    if (isMeeting) {
      messageLines.push(`Preferred Date: ${form.date}`);
      messageLines.push(`Message: ${form.message}`);
    } else {
      messageLines.push(`Address: ${form.address}`);
      messageLines.push(`Housing Type: ${form.housingType}`);
      messageLines.push(`Other Pets: ${form.otherPets}`);
      messageLines.push(`Why Adopt: ${form.whyAdopt}`);
      messageLines.push(`Pet Experience: ${form.petExperience}`);
      if (form.additionalNotes.trim()) messageLines.push(`Additional Notes: ${form.additionalNotes}`);
    }

    const insertPayload = {
      user_id: currentUser?.id,
      pet_id: formPetId || null,
      message: messageLines.join('\n'),
    };
    const { error } = await supabase.from('adoption_requests').insert(insertPayload).select();

    if (error) {
      console.error('RequestsPage: failed to submit adoption request', error);
      setSubmitError(`Something went wrong. Please try again. (${error.message})`);
      return;
    }

    setSubmitted(true);
  };

  return (
    <main className="page page-requests">

      <div className="rq-header">
        <p className="eyebrow">{t('requests.eyebrow')}</p>
        <h1 className="rq-title">{t('requests.pageTitle')}</h1>
      </div>

      <div className="rq-options">
        <button
          className={`rq-option-card${isMeeting ? ' rq-option-card--active' : ''}`}
          onClick={() => switchType('meeting')}
          type="button"
        >
          <span className="rq-option-icon">🐾</span>
          <span className="rq-option-label">{t('requests.optionMeetingLabel')}</span>
          <span className="rq-option-desc">{t('requests.optionMeetingDesc')}</span>
        </button>
        <button
          className={`rq-option-card${!isMeeting ? ' rq-option-card--active' : ''}`}
          onClick={() => switchType('adoption')}
          type="button"
        >
          <span className="rq-option-icon">🏠</span>
          <span className="rq-option-label">{t('requests.optionAdoptionLabel')}</span>
          <span className="rq-option-desc">{t('requests.optionAdoptionDesc')}</span>
        </button>
      </div>

      {!submitted ? (
        <div className="rq-form-card card">
          <h2 className="rq-form-title">
            {isMeeting ? t('requests.formTitleMeeting') : t('requests.formTitleAdoption')}
          </h2>
          <form className="rq-form" onSubmit={handleSubmit} noValidate>

            <div className="rq-field">
              <label className="rq-label">{t('requests.labelSelectPet')} {REQUIRED}</label>
              {favoritePets.length === 0 ? (
                <div className="rq-no-favorites">
                  <p className="rq-no-favorites-text">{t('requests.noFavorites')}</p>
                  <button
                    type="button"
                    className="button button-secondary"
                    onClick={() => onNavigate('home')}
                  >
                    {t('requests.browsePets')}
                  </button>
                </div>
              ) : (
                <>
                  <select
                    className="rq-input"
                    value={formPetId}
                    onChange={(e) => setFormPetId(e.target.value)}
                  >
                    {favoritePets.map((fp) => (
                      <option key={fp.id} value={fp.id}>{fp.name}</option>
                    ))}
                  </select>
                  {selectedFavoritePet && (
                    <div className="rq-pet-preview">
                      <img src={selectedFavoritePet.image} alt={selectedFavoritePet.name} className="rq-pet-preview-img" />
                      <span className="rq-pet-preview-name">{selectedFavoritePet.name}</span>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="rq-field">
              <label className="rq-label">{t('requests.labelFullName')} {REQUIRED}</label>
              <input
                type="text"
                className={`rq-input${errors.fullName ? ' rq-input--error' : ''}`}
                placeholder={t('requests.labelFullName')}
                value={form.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
              />
              {errors.fullName && <p className="rq-error-text">{errors.fullName}</p>}
            </div>

            <div className="rq-row">
              <div className="rq-field">
                <label className="rq-label">{t('requests.labelEmail')} {REQUIRED}</label>
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
                <label className="rq-label">{t('requests.labelPhone')} {REQUIRED}</label>
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
                <div className="rq-field">
                  <label className="rq-label">{t('requests.labelDate')} {REQUIRED}</label>
                  <input
                    type="date"
                    className={`rq-input${errors.date ? ' rq-input--error' : ''}`}
                    value={form.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                  />
                  {errors.date && <p className="rq-error-text">{errors.date}</p>}
                </div>

                <div className="rq-field">
                  <label className="rq-label">{t('requests.labelMessage')} {REQUIRED}</label>
                  <textarea
                    className={`rq-input rq-textarea${errors.message ? ' rq-input--error' : ''}`}
                    placeholder={t('requests.placeholderMessage')}
                    value={form.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    rows={5}
                  />
                  {errors.message && <p className="rq-error-text">{errors.message}</p>}
                </div>
              </>
            ) : (
              <>
                <div className="rq-field">
                  <label className="rq-label">{t('requests.labelAddress')} {REQUIRED}</label>
                  <input
                    type="text"
                    className={`rq-input${errors.address ? ' rq-input--error' : ''}`}
                    placeholder="123 Main St, City, State"
                    value={form.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                  />
                  {errors.address && <p className="rq-error-text">{errors.address}</p>}
                </div>

                <div className="rq-row">
                  <div className="rq-field">
                    <label className="rq-label">{t('requests.labelHousingType')} {REQUIRED}</label>
                    <select
                      className={`rq-input${errors.housingType ? ' rq-input--error' : ''}`}
                      value={form.housingType}
                      onChange={(e) => handleChange('housingType', e.target.value)}
                    >
                      <option value="">{t('requests.selectHousingType')}</option>
                      <option value="house">{t('requests.houseWithYard')}</option>
                      <option value="apartment">{t('requests.apartment')}</option>
                      <option value="condo">{t('requests.condoTownhouse')}</option>
                      <option value="other">{t('requests.other')}</option>
                    </select>
                    {errors.housingType && <p className="rq-error-text">{errors.housingType}</p>}
                  </div>
                  <div className="rq-field">
                    <label className="rq-label">{t('requests.labelOtherPets')} {REQUIRED}</label>
                    <select
                      className={`rq-input${errors.otherPets ? ' rq-input--error' : ''}`}
                      value={form.otherPets}
                      onChange={(e) => handleChange('otherPets', e.target.value)}
                    >
                      <option value="">{t('requests.selectOption')}</option>
                      <option value="yes">{t('requests.yes')}</option>
                      <option value="no">{t('requests.no')}</option>
                    </select>
                    {errors.otherPets && <p className="rq-error-text">{errors.otherPets}</p>}
                  </div>
                </div>

                <div className="rq-field">
                  <label className="rq-label">{t('requests.labelWhyAdopt')} {REQUIRED}</label>
                  <textarea
                    className={`rq-input rq-textarea${errors.whyAdopt ? ' rq-input--error' : ''}`}
                    placeholder={t('requests.placeholderWhyAdopt')}
                    value={form.whyAdopt}
                    onChange={(e) => handleChange('whyAdopt', e.target.value)}
                    rows={4}
                  />
                  {errors.whyAdopt && <p className="rq-error-text">{errors.whyAdopt}</p>}
                </div>

                <div className="rq-field">
                  <label className="rq-label">{t('requests.labelExperience')} {REQUIRED}</label>
                  <textarea
                    className={`rq-input rq-textarea${errors.petExperience ? ' rq-input--error' : ''}`}
                    placeholder={t('requests.placeholderExperience')}
                    value={form.petExperience}
                    onChange={(e) => handleChange('petExperience', e.target.value)}
                    rows={4}
                  />
                  {errors.petExperience && <p className="rq-error-text">{errors.petExperience}</p>}
                </div>

                <div className="rq-field">
                  <label className="rq-label">{t('requests.labelAdditionalNotes')}</label>
                  <textarea
                    className="rq-input rq-textarea"
                    placeholder={t('requests.placeholderAdditionalNotes')}
                    value={form.additionalNotes}
                    onChange={(e) => handleChange('additionalNotes', e.target.value)}
                    rows={3}
                  />
                </div>
              </>
            )}

            <button type="submit" className="button button-primary rq-submit-btn">
              {isMeeting ? t('requests.submitMeeting') : t('requests.submitAdoption')}
            </button>
            {submitError && <p className="rq-submit-error">{submitError}</p>}
          </form>
        </div>
      ) : (
        <div className="rq-success-card card">
          <div className="rq-success-icon">✓</div>
          <h2 className="rq-success-heading">
            {isMeeting ? t('requests.successMeeting') : t('requests.successAdoption')}
          </h2>
          <p className="rq-success-body">{t('requests.successBody')}</p>
          <button className="button button-secondary rq-back-btn" onClick={() => onNavigate('home')}>
            {t('requests.backToBrowsing')}
          </button>
        </div>
      )}

      <div className="rq-info-box">
        <span className="rq-info-icon">ℹ️</span>
        <p>{isMeeting ? t('requests.infoMeeting') : t('requests.infoAdoption')}</p>
      </div>

      <TrustFeaturesSection />
      <Footer onNavigate={onNavigate} />
    </main>
  );
}

export default RequestsPage;
