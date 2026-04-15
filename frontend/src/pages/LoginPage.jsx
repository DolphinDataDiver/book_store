import { useState } from "react";
import { useAuth } from "../auth/AuthContext.jsx";

function LoginPage() {
  const { login } = useAuth();
  const [form, setForm] = useState({ username: "user", password: "user" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await login(form.username, form.password);
    } catch (submissionError) {
      setError(submissionError.message || "Could not sign in.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="auth-shell">
      <section className="auth-card">
        <p className="eyebrow">Keycloak Login</p>
        <h1>Sign in before using the store dashboard.</h1>
        <p className="auth-copy">
          Dev credentials:
          <span className="mono"> user:user </span>
          and
          <span className="mono"> admin:admin</span>.
        </p>

        <form className="form-grid auth-form" onSubmit={handleSubmit}>
          <label className="span-2">
            Username
            <input
              value={form.username}
              onChange={(event) =>
                setForm((current) => ({ ...current, username: event.target.value }))
              }
              autoComplete="username"
              required
            />
          </label>
          <label className="span-2">
            Password
            <input
              type="password"
              value={form.password}
              onChange={(event) =>
                setForm((current) => ({ ...current, password: event.target.value }))
              }
              autoComplete="current-password"
              required
            />
          </label>
          <div className="form-actions span-2">
            <button type="submit" className="button primary" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Login"}
            </button>
          </div>
        </form>

        {error ? <p className="auth-error">{error}</p> : null}
      </section>
    </div>
  );
}

export default LoginPage;
