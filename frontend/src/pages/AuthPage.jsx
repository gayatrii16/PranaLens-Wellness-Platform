import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const initialSignup = {
  fullName: "",
  email: "",
  password: "",
  role: "Student",
  organization: ""
};

function AuthPage() {
  const navigate = useNavigate();
  const { login, signup, isLoading } = useAuth();
  const [mode, setMode] = useState("login");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState(initialSignup);
  const [message, setMessage] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await login(loginForm);
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      await signup(signupForm);
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="page auth-grid">
      <section className="glass-card auth-panel">
        <span className="eyebrow">Welcome</span>
        <h1>Access your wellness platform</h1>
        <p>Create an account to complete assessments, track your wellness history, and book guided sessions.</p>
        <div className="mode-toggle">
          <button type="button" className={mode === "login" ? "active" : ""} onClick={() => setMode("login")}>Login</button>
          <button type="button" className={mode === "signup" ? "active" : ""} onClick={() => setMode("signup")}>Sign Up</button>
        </div>
        {mode === "login" ? (
          <form className="auth-form" onSubmit={handleLogin}>
            <label>
              Email
              <input type="email" value={loginForm.email} onChange={(event) => setLoginForm({ ...loginForm, email: event.target.value })} required />
            </label>
            <label>
              Password
              <input type="password" value={loginForm.password} onChange={(event) => setLoginForm({ ...loginForm, password: event.target.value })} required />
            </label>
            <p className="hint-text">Demo user: aarav@pranalens.com / Demo@123</p>
            {message && <p className="feedback-text">{message}</p>}
            <button className="btn btn-primary" disabled={isLoading}>{isLoading ? "Logging in..." : "Login"}</button>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleSignup}>
            <label>
              Full Name
              <input type="text" value={signupForm.fullName} onChange={(event) => setSignupForm({ ...signupForm, fullName: event.target.value })} required />
            </label>
            <label>
              Email
              <input type="email" value={signupForm.email} onChange={(event) => setSignupForm({ ...signupForm, email: event.target.value })} required />
            </label>
            <label>
              Password
              <input type="password" value={signupForm.password} onChange={(event) => setSignupForm({ ...signupForm, password: event.target.value })} required />
            </label>
            <label>
              Role
              <select value={signupForm.role} onChange={(event) => setSignupForm({ ...signupForm, role: event.target.value })}>
                <option>Student</option>
                <option>Working Professional</option>
                <option>Corporate Leader</option>
                <option>Institution Admin</option>
              </select>
            </label>
            <label>
              Organization
              <input type="text" value={signupForm.organization} onChange={(event) => setSignupForm({ ...signupForm, organization: event.target.value })} placeholder="Optional" />
            </label>
            {message && <p className="feedback-text">{message}</p>}
            <button className="btn btn-primary" disabled={isLoading}>{isLoading ? "Creating account..." : "Create Account"}</button>
          </form>
        )}
      </section>
      <section className="glass-card auth-sidecard">
        <h2>What you unlock</h2>
        <ul className="bullet-list">
          <li>Interactive wellness assessment and score generation</li>
          <li>AI-assisted recommendations across lifestyle, food, and mindfulness</li>
          <li>Appointment booking for in-person interpretation sessions</li>
          <li>Assessment history and progress tracking dashboard</li>
        </ul>
      </section>
    </div>
  );
}

export default AuthPage;
