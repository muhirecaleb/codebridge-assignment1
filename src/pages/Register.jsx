
import { useState } from 'react';
import './auth.css';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.fullName || !formData.email || !formData.password) {
      alert('Please fill in all fields.');
      return;
    }

    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters.');
      return;
    }

    console.log('Registration data:', formData);


    navigate('/');
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
            minLength={6}
            required
          />

          <button type="submit">Register</button>
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