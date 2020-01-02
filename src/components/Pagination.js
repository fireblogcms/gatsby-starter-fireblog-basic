import React from "react";
import { Link } from "gatsby";

function Pagination({ totalResults, resultsPerPage }) {
  const pagesNumber = Math.ceil(totalResults / resultsPerPage);
  if (pagesNumber < 2) {
    return null;
  }
  const pagesArray = Array.from({ length: pagesNumber });
  return (
    <nav className="pagination">
      <ul>
        {pagesArray.map((v, i) => {
          i++;
          return (
            <li key={i}>
              <Link key={i} to={i > 1 ? `/pages/${i}` : "/"}>
                {i}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Pagination;
