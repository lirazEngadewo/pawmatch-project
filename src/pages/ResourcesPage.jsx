import { useState } from 'react';
import Footer from '../components/Footer.jsx';

const TIPS = [
  {
    icon: '🏠',
    title: 'Prepare your home',
    desc: 'Pet-proof your space before bringing them home. Secure loose cables, remove toxic plants, and set up a cozy corner just for them.',
  },
  {
    icon: '🍽️',
    title: 'Nutrition matters',
    desc: 'Feed age-appropriate food recommended by your vet. Puppies, kittens, adults, and seniors all have different nutritional needs.',
  },
  {
    icon: '🏥',
    title: 'First vet visit',
    desc: 'Schedule a check-up within the first week of adoption. Your vet will review vaccines, run a health check, and answer any concerns.',
  },
  {
    icon: '🎾',
    title: 'Exercise & play',
    desc: 'Daily activity keeps pets healthy and happy. Dogs need walks; cats need interactive play. Even 15 minutes a day makes a big difference.',
  },
  {
    icon: '❤️',
    title: 'Patience is key',
    desc: 'Give your pet time to adjust to their new environment. Most animals need 2–4 weeks to settle in — go at their pace, not yours.',
  },
  {
    icon: '🛁',
    title: 'Grooming routine',
    desc: 'Regular brushing and bathing keeps your pet comfortable and healthy. Long-haired breeds may need daily brushing to prevent matting.',
  },
];

const FAQS = [
  {
    q: 'How long does the adoption process take?',
    a: 'The process typically takes 3–7 business days from submitting your application. This includes a review of your adoption request, a brief phone interview, and coordination with the shelter. Some organizations may complete it faster.',
  },
  {
    q: 'What documents do I need to adopt?',
    a: 'You will need a valid government-issued ID and proof of address. Some shelters may also ask for a rental agreement (to confirm pets are allowed) or a reference from a vet if you have owned pets before.',
  },
  {
    q: 'Can I return a pet if it doesn\'t work out?',
    a: 'Yes. Responsible adoption organizations always accept returns — no questions asked. The pet\'s wellbeing comes first. Contact the shelter directly and they will guide you through the process.',
  },
  {
    q: 'Is there an adoption fee?',
    a: 'Fees vary by organization and typically range from ₪150 to ₪500. The fee usually covers vaccinations, spaying/neutering, microchipping, and a health check. It is a small fraction of what these services actually cost.',
  },
  {
    q: 'Can I adopt if I live in an apartment?',
    a: 'Absolutely. Many cats and small-to-medium dogs thrive in apartments. The key is matching the pet\'s energy level to your lifestyle and ensuring you can commit to regular walks and enrichment activities.',
  },
  {
    q: 'What if I have other pets at home?',
    a: 'Let the shelter know during your application. Many pets have been tested with other animals, and the staff can recommend a good match. A supervised introduction at home is always recommended for the first meeting.',
  },
  {
    q: 'How do I know which pet is right for me?',
    a: 'Take our matching quiz! It factors in your home type, lifestyle, energy level, and preferences to calculate a match percentage for every pet. You can also browse profiles and filter by region to find pets nearby.',
  },
  {
    q: 'What support does PawMatch offer after adoption?',
    a: 'PawMatch stays in touch after the adoption. You can reach us through the Contact page for advice, questions, or if you need help settling in your new pet. We also share tips and updates through our community.',
  },
];

function ResourcesPage({ onNavigate }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <main className="page resources-page">

      <section className="resources-intro">
        <p className="eyebrow">Resources</p>
        <h1>Everything You Need</h1>
        <p className="body-copy">
          Guides, tips, and answers to help you and your new pet have the best start together.
        </p>
      </section>

      <section id="pet-care-tips" className="section tips-section">
        <div className="section-header">
          <h2>Pet Care Tips</h2>
          <p className="body-copy">Everything you need to know to give your new pet the best start</p>
        </div>
        <div className="tips-grid">
          {TIPS.map((tip) => (
            <div key={tip.title} className="card tip-card">
              <div className="tip-icon">{tip.icon}</div>
              <h3 className="tip-title">{tip.title}</h3>
              <p className="tip-desc">{tip.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="section faq-section">
        <div className="section-header">
          <h2>Frequently Asked Questions</h2>
          <p className="body-copy">Answers to the most common questions about adopting through PawMatch</p>
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
                <span>{item.q}</span>
                <span className="faq-chevron">{openIndex === i ? '▲' : '▼'}</span>
              </button>
              {openIndex === i && (
                <div className="faq-answer">
                  <p>{item.a}</p>
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
