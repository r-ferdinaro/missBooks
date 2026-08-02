const { NavLink } = ReactRouterDOM;

export function AppHeader({ page = "home", onSetPage }) {
  return (
    <header className="app-header full main-layout">
      <section className="header-container">
        <h1>MissBooks</h1>
        <nav>
          <NavLink to="/">Home</NavLink>
          <span> | </span>
          <NavLink to="/about">About</NavLink>
          <span> | </span>
          <NavLink to="/books">Books</NavLink>
        </nav>
      </section>
    </header>
  );
}
