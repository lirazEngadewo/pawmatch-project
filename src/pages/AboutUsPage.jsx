import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import TrustFeaturesSection from '../components/TrustFeaturesSection.jsx';
import Footer from '../components/Footer.jsx';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function AboutUsPage({ onNavigate }) {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', subject: '', phone: '', message: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) setFieldErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!form.name.trim()) errors.name = t('about.errorNameRequired');
    if (!form.email.trim()) errors.email = t('about.errorEmailRequired');
    else if (!EMAIL_RE.test(form.email)) errors.email = t('about.errorEmailInvalid');
    if (!form.subject.trim()) errors.subject = t('about.errorSubjectRequired');
    if (!form.message.trim()) errors.message = t('about.errorMessageRequired');

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setSuccess(true);
    setForm({ name: '', email: '', subject: '', phone: '', message: '' });
    setFieldErrors({});
  };

  return (
    <main className="page page-about">

      <section className="about-intro">
        <p className="eyebrow">{t('about.eyebrow')}</p>
        <h1>{t('about.pageTitle')}</h1>
        <p className="body-copy">{t('about.intro')}</p>
      </section>

      <section className="section about-story-section">
        <div className="about-story-grid">
          <div className="card about-story-card">
            <h2>{t('about.storyTitle')}</h2>
            <div className="about-story-body">
              <p>{t('about.story1')}</p>
              <p>{t('about.story2')}</p>
              <p>{t('about.story3')}</p>
              <p>{t('about.story4')}</p>
              <p>{t('about.story5')}</p>
            </div>
          </div>

          <div className="about-story-photo-col">
            <img
              src="/bruno.jpg"
              alt="Bruno the dog"
              onError={(e) => console.error('Bruno photo failed to load:', e.target.src)}
            />
          </div>
        </div>
      </section>

      <section id="contact" className="cta-section">
        <div className="contact-inner">
          <div className="contact-header">
            <p className="eyebrow">{t('about.contactEyebrow')}</p>
            <h2>{t('about.contactTitle')}</h2>
            <p className="body-copy">{t('about.contactBody')}</p>
          </div>

          {success ? (
            <p className="contact-success">{t('about.contactSuccess')}</p>
          ) : (
            <form className="contact-form" onSubmit={handleContactSubmit} noValidate>
              <div className="contact-form-row">
                <label className="contact-label">
                  {t('about.labelFullName')}
                  <input
                    type="text"
                    placeholder={t('about.placeholderFullName')}
                    className={`form-input${fieldErrors.name ? ' rq-input--error' : ''}`}
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                  />
                  {fieldErrors.name && <span className="contact-field-error">{fieldErrors.name}</span>}
                </label>
                <label className="contact-label">
                  {t('about.labelEmail')}
                  <input
                    type="email"
                    placeholder={t('about.placeholderEmail')}
                    className={`form-input${fieldErrors.email ? ' rq-input--error' : ''}`}
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                  {fieldErrors.email && <span className="contact-field-error">{fieldErrors.email}</span>}
                </label>
              </div>
              <div className="contact-form-row">
                <label className="contact-label">
                  {t('about.labelSubject')}
                  <input
                    type="text"
                    placeholder={t('about.placeholderSubject')}
                    className={`form-input${fieldErrors.subject ? ' rq-input--error' : ''}`}
                    value={form.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                  />
                  {fieldErrors.subject && <span className="contact-field-error">{fieldErrors.subject}</span>}
                </label>
                <label className="contact-label">
                  {t('about.labelPhone')}
                  <input
                    type="tel"
                    placeholder={t('about.placeholderPhone')}
                    className="form-input"
                    value={form.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                  />
                </label>
              </div>
              <label className="contact-label">
                {t('about.labelMessage')}
                <textarea
                  placeholder={t('about.placeholderMessage')}
                  className={`form-input contact-textarea${fieldErrors.message ? ' rq-input--error' : ''}`}
                  value={form.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                />
                {fieldErrors.message && <span className="contact-field-error">{fieldErrors.message}</span>}
              </label>
              <button type="submit" className="button button-primary">{t('about.sendMessage')}</button>
            </form>
          )}
        </div>
      </section>

      <TrustFeaturesSection />
      <Footer onNavigate={onNavigate} />
    </main>
  );
}

export default AboutUsPage;
