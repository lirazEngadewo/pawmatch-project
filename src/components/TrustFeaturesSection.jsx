import { useTranslation } from 'react-i18next';

function TrustFeaturesSection() {
  const { t } = useTranslation();

  const features = [
    { titleKey: 'trust.feature1Title', descKey: 'trust.feature1Desc' },
    { titleKey: 'trust.feature2Title', descKey: 'trust.feature2Desc' },
    { titleKey: 'trust.feature3Title', descKey: 'trust.feature3Desc' },
  ];

  return (
    <section className="trust-section trust-section--beige">
      <div className="trust-inner">
        <div className="section-header trust-header">
          <p className="eyebrow">{t('trust.eyebrow')}</p>
          <h3>{t('trust.title')}</h3>
        </div>
        <div className="trust-grid">
          {features.map((feature) => (
            <article key={feature.titleKey} className="trust-card">
              <div className="trust-icon">✔️</div>
              <h4>{t(feature.titleKey)}</h4>
              <p>{t(feature.descKey)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustFeaturesSection;
