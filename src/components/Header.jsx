import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="site-header">
      <Link className="brand" path="/">
        CodeBridge Academy
      </Link>
      <nav aria-label="Main navigation">
       <Link to="/catalog-heading">Catalog</Link>
       <Link to="/login">Login</Link>
       <Link to="/register">Register</Link>
      </nav>
    </header>
  );
};

export default Header;
