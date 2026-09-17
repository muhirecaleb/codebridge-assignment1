import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../api/auth";

const Navbar = () => {
  const [user, setUser] = useState(getCurrentUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate("/");
  };

  return (
    <header className="site-header">
      <Link className="brand" to="/">
        CodeBridge Academy
      </Link>
      <nav aria-label="Main navigation" className="main-nav">
        <Link to="/blog">Blog</Link>
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/enrollments">My enrollments</Link>
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
