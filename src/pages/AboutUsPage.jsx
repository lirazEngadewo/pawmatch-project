import TrustFeaturesSection from '../components/TrustFeaturesSection.jsx';
import Footer from '../components/Footer.jsx';

function AboutUsPage() {
  const handleContactSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main className="page page-about">

      <section className="about-intro">
        <p className="eyebrow">About PawMatch</p>
        <h1>About Us</h1>
        <p className="body-copy">
          We believe every pet deserves a loving home — and every adopter deserves a warm, clear, and simple path to get there.
        </p>
      </section>

      <section className="section about-story-section">
        <div className="about-story-grid">
          <div className="about-story-image">
            <img
              src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80"
              alt="Bruno the dog"
            />
          </div>

          <div className="card about-story-card">
            <h2>Our Story</h2>
            <div className="about-story-body">
              <p>PawMatch was created from a personal journey and a deep love for animals. I'm a student, and I built this website during my degree after realizing how difficult and confusing the adoption process can be.</p>
              <p>During the war, I adopted my dog Bruno, the brown dog in the photo. Bruno was found wandering in northern Israel, without a home and without anyone knowing where he belonged. When I met him, I understood how many animals are waiting in shelters and rescue organizations, hoping someone will notice them and give them a chance.</p>
              <p>The adoption itself was one of the most meaningful decisions I have made, but the process was also difficult, unclear, and sometimes overwhelming. I felt that people who want to adopt should not have to struggle with scattered information, complicated forms, and confusing communication.</p>
              <p>That experience became the reason behind PawMatch. I wanted to create a platform that makes pet adoption warmer, simpler, and more accessible — both for adopters and for the animals waiting for a home.</p>
              <p>PawMatch is more than a student project. It is a small mission to help more pets find loving families and to make the adoption journey easier, clearer, and more human.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="cta-section">
        <div className="contact-inner">
          <div className="contact-header">
            <p className="eyebrow">Get in Touch</p>
            <h2>Contact Us</h2>
            <p className="body-copy">
              Have a question, suggestion, or want to help more pets find a home? We'd love to hear from you.
            </p>
          </div>

          <form className="contact-form" onSubmit={handleContactSubmit}>
            <div className="contact-form-row">
              <label className="contact-label">
                Full Name
                <input type="text" placeholder="Your full name" className="form-input" />
              </label>
              <label className="contact-label">
                Email
                <input type="email" placeholder="your@email.com" className="form-input" />
              </label>
            </div>
            <div className="contact-form-row">
              <label className="contact-label">
                Subject
                <input type="text" placeholder="How can we help?" className="form-input" />
              </label>
              <label className="contact-label">
                Phone Number
                <input type="tel" placeholder="Phone (optional)" className="form-input" />
              </label>
            </div>
            <label className="contact-label">
              Message
              <textarea
                placeholder="Tell us how we can help or share your adoption story..."
                className="form-input contact-textarea"
              />
            </label>
            <button type="submit" className="button button-primary">Send Message</button>
          </form>
        </div>
      </section>

      <TrustFeaturesSection />
      <Footer />
    </main>
  );
}

export default AboutUsPage;
