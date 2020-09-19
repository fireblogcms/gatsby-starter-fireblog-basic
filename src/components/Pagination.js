import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function Pagination({ totalItems, resultsPerPage, location }) {
  const pagesNumber = Math.ceil(totalItems / resultsPerPage);
  // Only one page, do not display pagination at all.
  if (pagesNumber < 2) {
    return null;
  }
  const pagesArray = Array.from({ length: pagesNumber });
  return (
    <nav
      className="pagination is-centered"
      role="navigation"
      aria-label="pagination"
    >
      <ul className="pagination-list">
        {pagesArray.map((v, i) => {
          i++;
          return (
            <li key={i}>
              <Link
                className={classNames('pagination-link', {
                  'is-current': i === getCurrentPage(location),
                })}
                key={i}
                to={i > 1 ? `/pages/${i}` : '/'}
              >
                {i}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function getCurrentPage(location) {
  let currentPage = 1;
  if (location.pathname.indexOf('/pages/') === 0) {
    const parts = location.pathname.split('/');
    currentPage = parts[2];
  }
  return parseInt(currentPage);
}

Pagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
  resultsPerPage: PropTypes.number.isRequired,
  location: PropTypes.object.isRequired,
};

export default Pagination;
