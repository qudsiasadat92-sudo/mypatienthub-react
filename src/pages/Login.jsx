import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+\-\s]{7,15}$/;

function isValidIdentifier(value) {
  return EMAIL_PATTERN.test(value) || PHONE_PATTERN.test(value);
}

export default function Login() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ identifier: false, password: false });
  const [showBanner, setShowBanner] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    const identifierError = !identifier.trim() || !isValidIdentifier(identifier.trim());
    const passwordError = !password || password.length < 6;

    setErrors({ identifier: identifierError, password: passwordError });

    if (identifierError || passwordError) {
      setShowBanner(true);
      return;
    }

    setShowBanner(false);
    // Demo redirect — replace with a real authentication call
    navigate("/dashboard");
  }

  return (
    <div className="login-page">
      <section className="login-hero">
        <h1>Welcome to MyPatientHUB!</h1>
        <p>We provide smart healthcare services in your hands.</p>
      </section>

      <div className="login-card">
        <h2>Sign in to MyPatientHUB</h2>

        <div className="social-row">
          <button className="social-btn" title="Sign in with Facebook">
            🅕
          </button>
          <button className="social-btn" title="Sign in with Google">
            G
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {showBanner && (
            <div className="form-error-banner show">
              Please fix the errors below and try again.
            </div>
          )}

          <input
            type="text"
            placeholder="Email or Phone number"
            className={errors.identifier ? "input-error" : ""}
            value={identifier}
            onChange={(e) => {
              setIdentifier(e.target.value);
              setErrors((prev) => ({ ...prev, identifier: false }));
            }}
          />
          {errors.identifier && (
            <div className="field-error show">Please enter a valid email or phone number.</div>
          )}

          <input
            type="password"
            placeholder="Please enter your password"
            className={errors.password ? "input-error" : ""}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({ ...prev, password: false }));
            }}
          />
          {errors.password && (
            <div className="field-error show">Password must be at least 6 characters.</div>
          )}

          <button type="submit" className="gradient-btn pink">
            SIGN IN
          </button>

          <div className="login-meta">
            <a href="#!">Forgot password?</a>
            <label>
              <input type="checkbox" /> Remember me
            </label>
          </div>

          <div className="divider">or</div>

          <a href="#!" className="gradient-btn blue" style={{ display: "block", textAlign: "center" }}>
            SIGN UP
          </a>
        </form>
      </div>

      <footer className="login-footer">
        <a href="#!">Google Play Store APP</a>
        <a href="#!">App Store APP</a>
        <a href="#!">About MyPatientHUB</a>
        <a href="#!">About Us</a>
        <a href="#!">Our Blog</a>
      </footer>
    </div>
  );
}
