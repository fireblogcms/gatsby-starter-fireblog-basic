import React from "react";
import { Link } from "gatsby";

function Header({ children }) {
  return (
    <section className="hero is-primary is-bold">
      <div className="hero-head">
        <nav className="navbar">
          <div className="container">
            <div className="navbar-brand">
              <Link to={"/"} className="navbar-item">
                <img src="/images/logo.png" alt="Logo" />
              </Link>
              <span
                className="navbar-burger burger"
                data-target="navbarMenuHeroA"
              >
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
            <div id="navbarMenuHeroA" className="navbar-menu">
              <div className="navbar-end">
                <Link to={"/"} className="navbar-item is-active">
                  Home
                </Link>
                <a
                  target="_blank"
                  href="https://fireblogcms.com"
                  className="navbar-item"
                >
                  Fireblog
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div className="hero-body">
        <div className="container has-text-centered">{children}</div>
      </div>
    </section>
  );
}

export default Header;
