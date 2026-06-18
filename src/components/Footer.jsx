function Footer({ onNavigate }) {
  const navigate = (page) => {
    onNavigate?.(page);
    window.scrollTo(0, 0);
  };

  const goToContact = () => {
    onNavigate?.('about');
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const goToHowItWorks = () => {
    onNavigate?.('landing');
    setTimeout(() => {
      document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const goToPetCareTips = () => {
    onNavigate?.('resources');
    setTimeout(() => {
      document.getElementById('pet-care-tips')?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const goToFaq = () => {
    onNavigate?.('resources');
    setTimeout(() => {
      document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  return (
    <footer className="footer">
      <div className="footer-top footer-grid">
        <div className="footer-brand">
          <div className="brand-logo small">🐾</div>
          <h3>PawMatch</h3>
          <p className="footer-description">
            Connecting kind people with warm, friendly pets through an easy and caring adoption experience.
          </p>
        </div>

        <div className="footer-column">
          <p className="eyebrow">Quick Links</p>
          <ul>
            <li><button type="button" className="footer-link" onClick={() => navigate('landing')}>Home</button></li>
            <li><button type="button" className="footer-link" onClick={() => navigate('home')}>Browse Pets</button></li>
            <li><button type="button" className="footer-link" onClick={() => navigate('about')}>About Us</button></li>
            <li><button type="button" className="footer-link" onClick={goToContact}>Contact</button></li>
          </ul>
        </div>

        <div className="footer-column">
          <p className="eyebrow">Resources</p>
          <ul>
            <li><button type="button" className="footer-link" onClick={goToHowItWorks}>Adoption Guide</button></li>
            <li><button type="button" className="footer-link" onClick={goToPetCareTips}>Pet Care Tips</button></li>
            <li><button type="button" className="footer-link" onClick={goToFaq}>FAQ</button></li>
          </ul>
        </div>

        <div className="footer-column">
          <p className="eyebrow">Follow Us</p>
          <div className="social-icons footer-social">
            <a href="#" className="footer-social-link" onClick={(e) => e.preventDefault()} aria-label="Instagram">IG</a>
            <a href="#" className="footer-social-link" onClick={(e) => e.preventDefault()} aria-label="Facebook">FB</a>
            <a href="#" className="footer-social-link" onClick={(e) => e.preventDefault()} aria-label="Twitter">TW</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 PawMatch. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
