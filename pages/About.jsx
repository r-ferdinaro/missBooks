const { NavLink, Outlet } = ReactRouterDOM;

export function About() {
  return (
    <section className="about main-layout">
      <div>
        <h2>About cars and us...</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio dolore
          sapiente, iste animi corporis nisi atque tempora assumenda dolores.
          Nobis nam dolorem rerum illo facilis nemo sit voluptatibus laboriosam
          necessitatibus!
        </p>
      </div>

      <Outlet />

      <nav>
        <NavLink to="product">Product</NavLink>
        <span> | </span>
        <NavLink to="team">Team</NavLink>
      </nav>
    </section>
  );
}
