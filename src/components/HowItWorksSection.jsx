import { useTranslation } from 'react-i18next';

function HowItWorksSection() {
  const { t } = useTranslation();

  const steps = [
    { icon: '🐾', titleKey: 'howItWorks.step1Title', descKey: 'howItWorks.step1Desc' },
    { icon: '💛', titleKey: 'howItWorks.step2Title', descKey: 'howItWorks.step2Desc' },
    { icon: '🏡', titleKey: 'howItWorks.step3Title', descKey: 'howItWorks.step3Desc' },
  ];

  return (
    <section id="how-it-works" className="how-it-works-section">
      <div className="section-header how-header">
        <p className="eyebrow">{t('howItWorks.eyebrow')}</p>
        <h2>{t('howItWorks.title')}</h2>
      </div>

      <div className="how-it-works-grid">
        {steps.map((step) => (
          <article key={step.titleKey} className="how-step">
            <div className="how-icon">{step.icon}</div>
            <h3>{t(step.titleKey)}</h3>
            <p>{t(step.descKey)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default HowItWorksSection;
