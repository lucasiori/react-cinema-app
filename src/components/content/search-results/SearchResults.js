import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import '../grid/Grid.scss';
import './SearchResults.scss';
import Rating from '../rating/Rating';
import LazyImage from '../../lazy-image/LazyImage';
import { IMAGE_URL } from '../../../services/movies.service';

const SearchResults = ({ searchResults, searchQuery }) => {
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    setMovieData(searchResults);
  }, [searchResults]);

  return (
    <div className="search-key-word">
      <div className="grid-search-title">
        <span className="grid-text1">Your search keyword:</span>
        {''}
        <span className="grid-text2">{searchQuery}</span>
      </div>

      <div className="grid">
        {movieData.map((data) => (
          <Fragment key={uuidv4()}>
            {data.poster_path && (
              <LazyImage className="grid-cell" src={`${IMAGE_URL}${data.poster_path}`} alt="placeholder">
                <div className="grid-read-more">
                  <button className="grid-cell-button">Read More</button>
                </div>

                <div className="grid-detail">
                  <span className="grid-detail-title">{data.title}</span>
                  <div className="grid-detail-rating">
                    <Rating rating={data.vote_average} totalStars={10} />
                    &nbsp;&nbsp;
                    <div className="grid-vote-average">{data.vote_average}</div>
                  </div>
                </div>
              </LazyImage>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

SearchResults.propTypes = {
  searchResults: PropTypes.array.isRequired,
  searchQuery: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  searchResults: state.movies.searchResults,
  searchQuery: state.movies.searchQuery
});

export default connect(mapStateToProps, {})(SearchResults);
