import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({ pageSize, pageCount, activePage, handlePage }) => {
  const page = Math.ceil(pageCount / pageSize);
  const pages = _.range(1, page + 1);
  if (page === 1) return null;
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map((page) => (
          <li
            className={activePage === page ? "page-item active" : "page-item"}
            key={page}
          >
            <a className="page-link" onClick={() => handlePage(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  pageSize: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  handlePage: PropTypes.func.isRequired,
};

export default Pagination;
