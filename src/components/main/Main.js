import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Main.scss';
import MainContent from '../content/main-content/MainContent';
import Spinner from '../spinner/Spinner';
import SearchResults from '../content/search-results/SearchResults';
import { loadMoreMovies, setResponsePageNumber } from '../../redux/actions/movies';
import { pathUrl } from '../../redux/actions/routes';

const Main = ({ page, totalPages, movieType, searchResults, match, errors, loadMoreMovies, setResponsePageNumber, pathUrl }) => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(page);

  const mainRef = useRef();
  const bottomLineRef = useRef();

  const fetchData = () => {
    let pageNumber = currentPage;

    if (page < totalPages) {
      pageNumber += 1;

      setCurrentPage(pageNumber);
      loadMoreMovies(movieType, pageNumber);
    }
  };

  const handleScroll = () => {
    const containerHeight = mainRef.current.getBoundingClientRect().height;
    const { top: bottomLineTop } = bottomLineRef.current.getBoundingClientRect();

    if (bottomLineTop <= containerHeight) {
      fetchData();
    }
  };

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    pathUrl(match.path, match.url);
    setResponsePageNumber(currentPage, totalPages);
  }, [currentPage, totalPages]);

  return (
    <>
      {!errors.message && !errors.statusCode && (
        <div ref={mainRef} className="main" onScroll={() => handleScroll()}>
          {loading ? <Spinner /> : <>{searchResults && searchResults.length === 0 ? <MainContent /> : <SearchResults />}</>}
          <div ref={bottomLineRef} />
        </div>
      )}
    </>
  );
};

Main.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  movieType: PropTypes.string.isRequired,
  searchResults: PropTypes.array.isRequired,
  match: PropTypes.object,
  errors: PropTypes.object,
  loadMoreMovies: PropTypes.func.isRequired,
  setResponsePageNumber: PropTypes.func.isRequired,
  pathUrl: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  page: state.movies.page,
  totalPages: state.movies.totalPages,
  movieType: state.movies.movieType,
  searchResults: state.movies.searchResults,
  errors: state.errors
});

export default connect(mapStateToProps, { loadMoreMovies, setResponsePageNumber, pathUrl })(Main);
