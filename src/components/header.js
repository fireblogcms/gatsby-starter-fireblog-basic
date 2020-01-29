import React, { useState } from "react";
import { Link } from "gatsby";
import classNames from "classnames";

function Header({ children }) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navBarMenuClass = classNames({
    "navbar-menu": true,
    "is-active": showMobileMenu
  });

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
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="navbar-burger burger"
                data-target="navbarMenuHeroA"
              >
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
            <div id="navbarMenuHeroA" className={navBarMenuClass}>
              <div className="navbar-end">
                <Link to={"/"} className="navbar-item is-active">
                  Home
                </Link>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
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
