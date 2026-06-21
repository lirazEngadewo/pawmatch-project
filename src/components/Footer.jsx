import { Trans, useTranslation } from 'react-i18next';

function Footer({ onNavigate }) {
  const { t } = useTranslation();

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
          <p className="footer-description">{t('footer.description')}</p>
        </div>

        <div className="footer-column">
          <p className="eyebrow">{t('footer.quickLinks')}</p>
          <ul>
            <li><button type="button" className="footer-link" onClick={() => navigate('landing')}>{t('footer.linkHome')}</button></li>
            <li><button type="button" className="footer-link" onClick={() => navigate('home')}>{t('footer.linkBrowsePets')}</button></li>
            <li><button type="button" className="footer-link" onClick={() => navigate('about')}>{t('footer.linkAboutUs')}</button></li>
            <li><button type="button" className="footer-link" onClick={goToContact}>{t('footer.linkContact')}</button></li>
          </ul>
        </div>

        <div className="footer-column">
          <p className="eyebrow">{t('footer.resourcesTitle')}</p>
          <ul>
            <li><button type="button" className="footer-link" onClick={goToHowItWorks}>{t('footer.linkAdoptionGuide')}</button></li>
            <li><button type="button" className="footer-link" onClick={goToPetCareTips}>{t('footer.linkPetCareTips')}</button></li>
            <li><button type="button" className="footer-link" onClick={goToFaq}>{t('footer.linkFaq')}</button></li>
          </ul>
        </div>

        <div className="footer-column">
          <p className="eyebrow">{t('footer.followUs')}</p>
          <div className="social-icons footer-social">
            <a href="#" className="footer-social-link" onClick={(e) => e.preventDefault()} aria-label="Instagram">IG</a>
            <a href="#" className="footer-social-link" onClick={(e) => e.preventDefault()} aria-label="Facebook">FB</a>
            <a href="#" className="footer-social-link" onClick={(e) => e.preventDefault()} aria-label="Twitter">TW</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p><Trans i18nKey="footer.copyright" components={{ ltr: <span dir="ltr" /> }} /></p>
      </div>
    </footer>
  );
}

export default Footer;
