import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer.jsx';

function ResourcesPage({ onNavigate }) {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);

  const TIPS = [
    { icon: '🏠', titleKey: 'resources.tip1Title', descKey: 'resources.tip1Desc' },
    { icon: '🍽️', titleKey: 'resources.tip2Title', descKey: 'resources.tip2Desc' },
    { icon: '🏥', titleKey: 'resources.tip3Title', descKey: 'resources.tip3Desc' },
    { icon: '🎾', titleKey: 'resources.tip4Title', descKey: 'resources.tip4Desc' },
    { icon: '❤️', titleKey: 'resources.tip5Title', descKey: 'resources.tip5Desc' },
    { icon: '🛁', titleKey: 'resources.tip6Title', descKey: 'resources.tip6Desc' },
  ];

  const FAQS = [
    { qKey: 'resources.faq1Q', aKey: 'resources.faq1A' },
    { qKey: 'resources.faq2Q', aKey: 'resources.faq2A' },
    { qKey: 'resources.faq3Q', aKey: 'resources.faq3A' },
    { qKey: 'resources.faq4Q', aKey: 'resources.faq4A' },
    { qKey: 'resources.faq5Q', aKey: 'resources.faq5A' },
    { qKey: 'resources.faq6Q', aKey: 'resources.faq6A' },
    { qKey: 'resources.faq7Q', aKey: 'resources.faq7A' },
    { qKey: 'resources.faq8Q', aKey: 'resources.faq8A' },
  ];

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <main className="page resources-page">

      <section className="resources-intro">
        <p className="eyebrow">{t('resources.eyebrow')}</p>
        <h1>{t('resources.pageTitle')}</h1>
        <p className="body-copy">{t('resources.pageSubtitle')}</p>
      </section>

      <section id="pet-care-tips" className="section tips-section">
        <div className="section-header">
          <h2>{t('resources.tipsTitle')}</h2>
          <p className="body-copy">{t('resources.tipsSubtitle')}</p>
        </div>
        <div className="tips-grid">
          {TIPS.map((tip) => (
            <div key={tip.titleKey} className="card tip-card">
              <div className="tip-icon">{tip.icon}</div>
              <h3 className="tip-title">{t(tip.titleKey)}</h3>
              <p className="tip-desc">{t(tip.descKey)}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="section faq-section">
        <div className="section-header">
          <h2>{t('resources.faqTitle')}</h2>
          <p className="body-copy">{t('resources.faqSubtitle')}</p>
        </div>
        <div className="faq-list">
          {FAQS.map((item, i) => (
            <div key={i} className={`faq-item${openIndex === i ? ' faq-item--open' : ''}`}>
              <button
                type="button"
                className="faq-question"
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
              >
                <span>{t(item.qKey)}</span>
                <span className="faq-chevron">{openIndex === i ? '▲' : '▼'}</span>
              </button>
              {openIndex === i && (
                <div className="faq-answer">
                  <p>{t(item.aKey)}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </main>
  );
}

export default ResourcesPage;
