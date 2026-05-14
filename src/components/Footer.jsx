function Footer() {
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
            <li>Home</li>
            <li>About Us</li>
            <li>Contact</li>
          </ul>
        </div>

        <div className="footer-column">
          <p className="eyebrow">Resources</p>
          <ul>
            <li>Adoption Guide</li>
            <li>Pet Care Tips</li>
            <li>FAQ</li>
          </ul>
        </div>

        <div className="footer-column">
          <p className="eyebrow">Follow Us</p>
          <div className="social-icons footer-social">
            <span>IG</span>
            <span>FB</span>
            <span>TW</span>
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
