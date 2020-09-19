import React from 'react';
import { Link } from 'gatsby';

/**
 * MenuLink is like Link from gatbsy, but handling also
 * external urls.
 */

// Since DOM elements <a> cannot receive activeClassName
// and partiallyActive, destructure the prop here and
// pass it only to GatsbyLink
const MenuLink = ({
  children,
  to,
  activeClassName,
  partiallyActive,
  ...other
}) => {
  // Tailor the following test to your environment.
  // This example assumes that any internal link (intended for Gatsby)
  // will start with exactly one slash, and that anything else is external.
  const internal = /^\/(?!\/)/.test(to);
  // Use Gatsby Link for internal links, and <a> for others
  if (internal) {
    return (
      <Link
        to={to}
        activeClassName={activeClassName}
        partiallyActive={partiallyActive}
        {...other}
      >
        {children}
      </Link>
    );
  }
  return (
    <a {...other} href={to} rel="noopener">
      {children}
    </a>
  );
};
export default MenuLink;
