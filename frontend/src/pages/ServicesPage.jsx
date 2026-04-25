import { Link } from "react-router-dom";

function ServicesPage() {
  return (
    <div className="page">
      <section className="inner-hero glass-card">
        <span className="eyebrow">Services</span>
        <h1>Wellness services for people, teams, and institutions.</h1>
        <p>Choose an individual assessment pathway or deploy PranaLens as an organizational wellness intelligence layer.</p>
      </section>
      <section className="content-section split-section">
        <div className="glass-card service-column">
          <h2>Personal Wellness Experience</h2>
          <ul className="bullet-list">
            <li>Holistic wellness assessment with guided questionnaire and practitioner review</li>
            <li>Energy, stress, sleep, digestion, and focus scoring</li>
            <li>Personalized report with lifestyle, nutrition, and mindfulness suggestions</li>
          </ul>
          <Link to="/assessment" className="btn btn-primary">Take Assessment</Link>
        </div>
        <div className="glass-card service-column">
          <h2>Wellness Index Program</h2>
          <ul className="bullet-list">
            <li>Wellness Index for teams, campuses, and institutions</li>
            <li>Aggregate trend dashboard for burnout risk and resilience patterns</li>
            <li>Custom intervention strategy workshops and follow-up plans</li>
          </ul>
          <Link to="/book" className="btn btn-secondary">Book Consultation</Link>
        </div>
      </section>
    </div>
  );
}

export default ServicesPage;
