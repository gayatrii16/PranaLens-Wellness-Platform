import { Link } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import { heroMetrics, serviceCards, testimonials } from "../data/siteContent";

function HomePage() {
  return (
    <div className="page">
      <section className="hero-grid">
        <div className="hero-copy glass-card">
          <span className="eyebrow">AI-Powered Holistic Wellness Assessment</span>
          <h1>Decode your energy. Design healthier lives and workplaces.</h1>
          <p>
            PranaLens combines AI interpretation, Ayurveda-inspired wellness science, acupressure-informed diagnostics, and human guidance to deliver non-invasive, in-person wellness assessments for individuals and organizations.
          </p>
          <div className="hero-actions">
            <Link to="/auth" className="btn btn-primary">Start Assessment Journey</Link>
            <Link to="/services" className="btn btn-secondary">Explore Services</Link>
          </div>
          <div className="metric-row">
            {heroMetrics.map((metric) => (
              <div key={metric.label} className="metric-card">
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-panel">
          <div className="glass-card hero-visual">
            <div className="hero-orbit">
              <div className="orbit-node">AI Insight</div>
              <div className="orbit-node">Ayurveda</div>
              <div className="orbit-node">Acupressure</div>
              <div className="orbit-node">Lifestyle Design</div>
            </div>
            <div className="signal-card">
              <span>Live Wellness Signal</span>
              <strong>Adaptive Recovery</strong>
              <p>Personalized recommendations generated after guided in-person assessment.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="content-section">
        <SectionTitle eyebrow="Why PranaLens" title="A preventive wellness platform built for modern stress realities" description="We bridge ancient wisdom, modern data interpretation, and service design to help people act before imbalance becomes burnout." />
        <div className="card-grid">
          {serviceCards.map((card) => (
            <article key={card.title} className="glass-card feature-card">
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="content-section split-section">
        <div className="glass-card narrative-card">
          <SectionTitle eyebrow="Vision" title="Preventive wellness that feels premium, personal, and practical" description="Our mission is to make energy intelligence useful for students, professionals, campuses, and organizations navigating high-performance environments." />
          <ul className="bullet-list">
            <li>Non-invasive in-person wellness assessments guided by trained facilitators</li>
            <li>AI-assisted reports that turn signals into readable insights and next steps</li>
            <li>Programs for both individuals and organizational wellness benchmarking</li>
          </ul>
        </div>
        <div className="glass-card stat-stack">
          <div><span>For Individuals</span><strong>Clarity on stress, focus, sleep, and vitality</strong></div>
          <div><span>For Organizations</span><strong>Wellness Index dashboards and targeted intervention planning</strong></div>
          <div><span>For Campuses</span><strong>Student wellbeing insights with action-ready support recommendations</strong></div>
        </div>
      </section>
      <section className="content-section">
        <SectionTitle eyebrow="Social Proof" title="Built like a real wellness startup, trusted like a thoughtful partner" />
        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <article key={item.name} className="glass-card testimonial-card">
              <p>"{item.quote}"</p>
              <strong>{item.name}</strong>
              <span>{item.role}</span>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
