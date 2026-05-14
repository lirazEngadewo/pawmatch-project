function HowItWorksSection() {
  const steps = [
    {
      icon: '🐾',
      title: 'Browse Pets',
      description: 'Explore warm profiles with personality notes and helpful adoption details.',
    },
    {
      icon: '💛',
      title: 'Find Your Match',
      description: 'Choose pets that feel right for your home and lifestyle with confidence.',
    },
    {
      icon: '🏡',
      title: 'Adopt & Love',
      description: 'Connect with the rescue team, schedule a visit, and welcome your new friend.',
    },
  ];

  return (
    <section id="how-it-works" className="how-it-works-section">
      <div className="section-header how-header">
        <p className="eyebrow">How PawMatch Works</p>
        <h2>Three simple steps to find your new best friend</h2>
      </div>

      <div className="how-it-works-grid">
        {steps.map((step) => (
          <article key={step.title} className="how-step">
            <div className="how-icon">{step.icon}</div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default HowItWorksSection;
