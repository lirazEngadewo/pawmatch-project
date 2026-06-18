import { useState } from 'react';
import Footer from '../components/Footer.jsx';

const PRESET_AMOUNTS = [10, 50, 100];

function DonationPage({ onNavigate }) {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [message, setMessage] = useState('');
  const [amountError, setAmountError] = useState('');
  const [donated, setDonated] = useState(false);
  const [finalAmount, setFinalAmount] = useState(null);

  const handleAmountClick = (amt) => {
    setSelectedAmount(amt);
    setAmountError('');
    if (amt !== 'custom') setCustomAmount('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedAmount) {
      setAmountError('Please select or enter a donation amount.');
      return;
    }
    if (selectedAmount === 'custom') {
      const val = parseFloat(customAmount);
      if (!customAmount || isNaN(val) || val <= 0) {
        setAmountError('Please enter a valid amount.');
        return;
      }
      setFinalAmount(val);
    } else {
      setFinalAmount(selectedAmount);
    }

    setAmountError('');
    setDonated(true);
    window.scrollTo(0, 0);
  };

  return (
    <main className="page donation-page">
      <section className="donation-hero">
        <div className="donation-hero-icon">🐾</div>
        <h1>Support PawMatch &amp; Help Pets Find Homes</h1>
        <p className="body-copy">
          Your donation helps adoption organizations care for animals waiting for a home.
        </p>
      </section>

      <section className="section donation-form-section">
        {donated ? (
          <div className="card donation-success">
            <div className="donation-success-icon">❤️</div>
            <h2>Thank you for your donation!</h2>
            <p className="donation-success-message">
              {donorName.trim()
                ? `Thank you, ${donorName.trim()}! Your generous contribution of ₪${finalAmount} will help pets find loving homes.`
                : `Your generous contribution of ₪${finalAmount} will help pets find loving homes.`}{' '}
              Every donation makes a real difference.
            </p>
            {message.trim() && (
              <blockquote className="donation-success-quote">"{message.trim()}"</blockquote>
            )}
            <p className="donation-success-note">
              PawMatch is a student project — all donations are simulated and no real payment is processed.
            </p>
            <button
              className="button button-primary"
              onClick={() => onNavigate('landing')}
            >
              Go back home
            </button>
          </div>
        ) : (
          <div className="card donation-form-card">
            <form className="donation-form" onSubmit={handleSubmit} noValidate>
              <div className="donation-field">
                <label className="donation-field-label">Choose a donation amount</label>
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
                    Custom
                  </button>
                </div>
                {selectedAmount === 'custom' && (
                  <input
                    type="number"
                    className="form-input donation-custom-input"
                    value={customAmount}
                    onChange={(e) => { setCustomAmount(e.target.value); setAmountError(''); }}
                    placeholder="Enter amount in ₪"
                    min="1"
                  />
                )}
                {amountError && <span className="contact-field-error">{amountError}</span>}
              </div>

              <label className="contact-label">
                Your name (optional)
                <input
                  type="text"
                  className="form-input"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="Your name"
                />
              </label>

              <label className="contact-label">
                Message to the animals (optional)
                <textarea
                  className="form-input contact-textarea"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write a short message of support..."
                />
              </label>

              <button type="submit" className="button button-primary donation-submit-btn">
                Donate Now ❤️
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
