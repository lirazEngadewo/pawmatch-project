function TrustFeaturesSection() {
  const features = [
    {
      title: 'Make a Difference',
      description: 'Your adoption gives a pet a loving home and creates a lasting bond.',
    },
    {
      title: 'Safe & Trusted',
      description: 'We highlight caring partners and gentle introductions for every match.',
    },
    {
      title: 'Easy Process',
      description: 'Simple steps, clear guidance, and thoughtful support for your pet journey.',
    },
  ];

  return (
    <section className="trust-section trust-section--beige">
      <div className="trust-inner">
        <div className="section-header trust-header">
          <p className="eyebrow">Why PawMatch</p>
          <h3>Trusted support for every adoption story.</h3>
        </div>
        <div className="trust-grid">
          {features.map((feature) => (
            <article key={feature.title} className="trust-card">
              <div className="trust-icon">✔️</div>
              <h4>{feature.title}</h4>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustFeaturesSection;
