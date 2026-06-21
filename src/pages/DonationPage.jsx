import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import Footer from '../components/Footer.jsx';

const PRESET_AMOUNTS = [10, 50, 100];

function DonationPage({ onNavigate }) {
  const { t } = useTranslation();
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [message, setMessage] = useState('');
  const [amountError, setAmountError] = useState('');
  const [nameError, setNameError] = useState('');
  const [messageError, setMessageError] = useState('');
  const [donated, setDonated] = useState(false);
  const [finalAmount, setFinalAmount] = useState(null);

  const handleAmountClick = (amt) => {
    setSelectedAmount(amt);
    setAmountError('');
    if (amt !== 'custom') setCustomAmount('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;

    if (!selectedAmount) {
      setAmountError(t('donation.errorNoAmount'));
      valid = false;
    } else if (selectedAmount === 'custom') {
      const val = parseFloat(customAmount);
      if (!customAmount || isNaN(val) || val <= 0) {
        setAmountError(t('donation.errorInvalidAmount'));
        valid = false;
      } else {
        setAmountError('');
      }
    } else {
      setAmountError('');
    }

    if (!donorName.trim()) {
      setNameError(t('donation.errorNoName'));
      valid = false;
    } else {
      setNameError('');
    }

    if (!message.trim()) {
      setMessageError(t('donation.errorNoMessage'));
      valid = false;
    } else {
      setMessageError('');
    }

    if (!valid) return;

    setFinalAmount(selectedAmount === 'custom' ? parseFloat(customAmount) : selectedAmount);
    setDonated(true);
    window.scrollTo(0, 0);
  };

  return (
    <main className="page donation-page">
      <section className="donation-hero">
        <div className="donation-hero-icon">🐾</div>
        <h1><Trans i18nKey="donation.heroTitle" components={{ ltr: <span dir="ltr" /> }} /></h1>
        <p className="body-copy">{t('donation.heroSubtitle')}</p>
      </section>

      <section className="section donation-form-section">
        {donated ? (
          <div className="card donation-success">
            <div className="donation-success-icon">❤️</div>
            <h2>{t('donation.thankYou')}</h2>
            <p className="donation-success-message">
              {donorName.trim()
                ? t('donation.successWithName', { name: donorName.trim(), amount: finalAmount })
                : t('donation.successNoName', { amount: finalAmount })}{' '}
              {t('donation.everyDonation')}
            </p>
            {message.trim() && (
              <blockquote className="donation-success-quote">"{message.trim()}"</blockquote>
            )}
            <p className="donation-success-note"><Trans i18nKey="donation.simulatedNote" components={{ ltr: <span dir="ltr" /> }} /></p>
            <button
              className="button button-primary"
              onClick={() => onNavigate('landing')}
            >
              {t('donation.goHome')}
            </button>
          </div>
        ) : (
          <div className="card donation-form-card">
            <form className="donation-form" onSubmit={handleSubmit} noValidate>
              <div className="donation-field">
                <label className="donation-field-label">{t('donation.chooseAmount')}</label>
                <div className="donation-amounts">
                  {PRESET_AMOUNTS.map((amt) => (
                    <button
                      type="button"
                      key={amt}
                      className={`quiz-option${selectedAmount === amt ? ' quiz-option--active' : ''}`}
                      onClick={() => handleAmountClick(amt)}
                    >
                      ₪{amt}
                    </button>
                  ))}
                  <button
                    type="button"
                    className={`quiz-option${selectedAmount === 'custom' ? ' quiz-option--active' : ''}`}
                    onClick={() => handleAmountClick('custom')}
                  >
                    {t('donation.customAmount')}
                  </button>
                </div>
                {selectedAmount === 'custom' && (
                  <input
                    type="number"
                    className="form-input donation-custom-input"
                    value={customAmount}
                    onChange={(e) => { setCustomAmount(e.target.value); setAmountError(''); }}
                    placeholder={t('donation.placeholderCustom')}
                    min="1"
                  />
                )}
                {amountError && <span className="contact-field-error">{amountError}</span>}
              </div>

              <div className="donation-field">
                <label className="contact-label">
                  {t('donation.labelName')}
                  <input
                    type="text"
                    className="form-input"
                    value={donorName}
                    onChange={(e) => { setDonorName(e.target.value); setNameError(''); }}
                    placeholder={t('donation.placeholderName')}
                  />
                </label>
                {nameError && <span className="contact-field-error">{nameError}</span>}
              </div>

              <div className="donation-field">
                <label className="contact-label">
                  {t('donation.labelMessage')}
                  <textarea
                    className="form-input contact-textarea"
                    value={message}
                    onChange={(e) => { setMessage(e.target.value); setMessageError(''); }}
                    placeholder={t('donation.placeholderMessage')}
                  />
                </label>
                {messageError && <span className="contact-field-error">{messageError}</span>}
              </div>

              <button type="submit" className="button button-primary donation-submit-btn">
                {t('donation.donateNow')}
              </button>
            </form>
          </div>
        )}
      </section>

      <Footer onNavigate={onNavigate} />
    </main>
  );
}

export default DonationPage;
