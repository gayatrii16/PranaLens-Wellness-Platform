import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="site-header">
      <Link to="/" className="brand">
        <img src="/logo-mark.svg" alt="PranaLens logo" className="brand-mark" />
        <div>
          <strong>PranaLens</strong>
          <span>Wellness Intelligence</span>
        </div>
      </Link>
      <nav className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/knowledge-hub">Knowledge Hub</NavLink>
        {isAuthenticated && <NavLink to="/dashboard">Dashboard</NavLink>}
      </nav>
      <div className="nav-actions">
        {isAuthenticated ? (
          <>
            <Link to="/profile" className="nav-chip">
              {user?.fullName?.split(" ")[0] || "Profile"}
            </Link>
            <button className="btn btn-secondary" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/auth" className="nav-chip">
              Login
            </Link>
            <Link to="/auth" className="btn btn-primary">
              Get Started
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;
