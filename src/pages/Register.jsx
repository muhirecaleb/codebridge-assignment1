import './auth.css';
import { Link } from "react-router-dom";


const Register = () => {
  return (
    <main className="auth-page">
      <section className="auth-panel" aria-labelledby="register-heading">
        <p className="auth-eyebrow">CodeBridge Academy</p>
        <h1 id="register-heading">Start learning</h1>
        <p className="auth-intro">
          Create an account and begin your next project.
        </p>
        <form className="auth-form" action="">
          <label htmlFor="register-username">Username</label>
          <input id="register-username" type="text" placeholder="Username" />
          <label htmlFor="register-password">Password</label>
          <input
            id="register-password"
            type="password"
            placeholder="Password"
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
