import TrustFeaturesSection from '../components/TrustFeaturesSection.jsx';
import Footer from '../components/Footer.jsx';

function AdoptionPage({ isLoggedIn, requireRegistration }) {
  return (
    <main className="page page-adoption">
      <section className="section intro-card card">
        <div>
          <p className="eyebrow">Adoption request</p>
          <h2>Send a meeting request with care.</h2>
          <p className="body-copy">
            We keep adoption simple and friendly. Submit a request and a team member will help you plan the next steps.
          </p>
        </div>
      </section>

      <section className="card adoption-card">
        <div>
          <h3>Meeting request details</h3>
          <ul>
            <li>Friendly introduction to the pet and caregiver</li>
            <li>Support for questions about daily life and special needs</li>
            <li>Clear next step for a safe and happy adoption</li>
          </ul>
        </div>

        <div className="request-panel">
          <label>
            Your name
            <input type="text" placeholder="Ari" />
          </label>
          <label>
            Preferred meeting day
            <select>
              <option>Saturday morning</option>
              <option>Sunday afternoon</option>
              <option>Weekday evening</option>
            </select>
          </label>
          <label>
            Note to the rescue team
            <textarea placeholder="I would love to meet a calm cat or a gentle dog..." />
          </label>
          <button
            className="button button-primary"
            onClick={() => { if (!isLoggedIn) requireRegistration(); }}
          >
            Send request
          </button>
        </div>
      </section>

      <TrustFeaturesSection />
      <Footer />
    </main>
  );
}

export default AdoptionPage;
