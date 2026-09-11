import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="site-header">
      <Link className="brand" to="/">
        CodeBridge Academy
      </Link>
      <nav aria-label="Main navigation" className="main-nav">
        <Link to="/catalog-heading">Catalog</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
    </header>
  );
};

export default Navbar;
