import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './Paginate.scss';

const Paginate = (props) => {
  const { currentPage, totalPages, paginate } = props;

  const [page, setPage] = useState();
  const [totalPageNumber, setTotalPageNumber] = useState();

  useEffect(() => {
    setPage(currentPage);
    setTotalPageNumber(totalPages);
  }, [currentPage, totalPages]);

  return (
    <>
      <span className="page-count">
        {page} - {totalPageNumber}
      </span>
      <button className={`paginate-button ${page === 1 ? 'disable' : ''}`} onClick={() => paginate('prev')}>
        Prev
      </button>
      <button className={`paginate-button ${page === totalPageNumber ? 'disable' : ''}`} onClick={() => paginate('next')}>
        Next
      </button>
    </>
  );
};

Paginate.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired
};

export default Paginate;
