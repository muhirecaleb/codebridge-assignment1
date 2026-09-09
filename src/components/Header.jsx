const Header = () => {
  return (
    <header className="site-header">
      <a className="brand" href="/">
        CodeBridge Academy
      </a>
      <nav aria-label="Main navigation">
        <a href="#catalog-heading">Catalog</a>
        <a href="/login">Login</a>
        <a href="/register">Register</a>
      </nav>
    </header>
  );
};

export default Header;
