import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import MenuLink from './MenuLink';
import classNames from 'classnames';

function Navbar() {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          menuLinks {
            title
            props {
              to
              target
              title
              rel
              className
              id
            }
          }
        }
      }
    }
  `);
  const menuLinks = data.site.siteMetadata.menuLinks;
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navBarMenuClassNames = classNames({
    'navbar-menu': true,
    'is-active': showMobileMenu,
  });
  const burgerClassNames = classNames({
    'navbar-burger burger': true,
    'is-active': showMobileMenu,
  });

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <span
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className={burgerClassNames}
            data-target="navbarMenuHero"
          >
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div id="navbarMenuHero" className={navBarMenuClassNames}>
          <div className="navbar-end">
            {menuLinks.map(link => {
              const { to, ...other } = link.props;
              return (
                <MenuLink
                  {...other}
                  key={to}
                  to={to}
                  className="navbar-item"
                  activeClassName="is-active"
                >
                  {link.title}
                </MenuLink>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
