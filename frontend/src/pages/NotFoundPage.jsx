import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="page">
      <section className="glass-card inner-hero">
        <span className="eyebrow">404</span>
        <h1>That page is not available.</h1>
        <p>The wellness signal is still strong. Head back home and continue your journey.</p>
        <Link to="/" className="btn btn-primary">Return Home</Link>
      </section>
    </div>
  );
}

export default NotFoundPage;
