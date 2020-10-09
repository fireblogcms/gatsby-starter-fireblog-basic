import React from 'react';
import Navbar from './Navbar';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

function Header({ title, location, subtitle = null }) {
  let headerContent;
  let classNames = '';
  // on Homepage, blog title must be a h1
  if (location.pathname === '/') {
    headerContent = (
      <div>
        <h1 className="title is-1">{title}</h1>
        {subtitle && <div className="subtitle">{subtitle}</div>}
      </div>
    );
  }
  // on others pages, h1 will be used by post title, so
  // blog title became a link.
  else {
    classNames = 'is-small';
    headerContent = (
      <div>
        <div className="title is-1">
          <Link to="/">{title}</Link>
        </div>
      </div>
    );
  }
  return (
    <section className={`hero ${classNames}`}>
      <div className="hero-head">
        <Navbar />
      </div>
      <div className="hero-body">
        <div className="container">{headerContent}</div>
      </div>
    </section>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  location: PropTypes.object.isRequired,
};

export default Header;
