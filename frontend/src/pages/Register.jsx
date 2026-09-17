import { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { getApiErrorMessage, register, saveAuth } from "../api/auth";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const { data } = await register({
        full_name: formData.fullName,
        email: formData.email,
        password: formData.password,
      });
      saveAuth(data);
      navigate("/");
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-panel" aria-labelledby="register-heading">
        <p className="auth-eyebrow">CodeBridge Academy</p>

        <h1 id="register-heading">Start learning</h1>

        <p className="auth-intro">
          Create an account and begin your next project.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="register-fullName">Full Name</label>
          <input
            id="register-fullName"
            name="fullName"
            type="text"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <label htmlFor="register-email">Email</label>
          <input
            id="register-email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="register-password">Password</label>
          <input
            id="register-password"
            name="password"
            type="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            minLength={8}
            required
          />
          {error && (
            <p className="auth-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Register"}
          </button>
        </form>
      </section>

      <nav className="auth-links" aria-label="Account navigation">
        <Link to="/login">Already have an account?</Link>
        <Link to="/">Back to home</Link>
      </nav>
    </main>
  );
};

export default Register;
