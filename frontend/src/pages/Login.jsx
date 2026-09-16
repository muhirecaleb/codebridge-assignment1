import { Link } from "react-router-dom";

const Login = () => {
  return (
    <main className="auth-page">
      <section className="auth-panel" aria-labelledby="login-heading">
        <p className="auth-eyebrow">CodeBridge Academy</p>
        <h1 id="login-heading">Welcome back</h1>
        <p className="auth-intro">Continue building your software skills.</p>
        <form className="auth-form" action="">
          <label htmlFor="login-username">Username</label>
          <input id="login-username" type="text" placeholder="Username" />
          <label htmlFor="login-password">Password</label>
          <input id="login-password" type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
      </section>
      <nav className="auth-links" aria-label="Account navigation">
        <Link to="/register">Create an account</Link>
        <Link to="/">Back to home</Link>
      </nav>
    </main>
  );
};

export default Login;
