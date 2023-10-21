import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

import './Grid.scss';
import Rating from '../rating/Rating';
import LazyImage from '../../lazy-image/LazyImage';
import { IMAGE_URL } from '../../../services/movies.service';

const Grid = ({ list }) => {
  const [movieData, setMovieData] = useState([]);

  const formatMovieTitle = (title) => {
    const titleStr = title.toLowerCase();
    return titleStr.replace(/ /g, '-');
  };

  useEffect(() => {
    setMovieData(list);
  }, [list]);

  return (
    <>
      <div className="grid">
        {movieData.map((data) => (
          <div key={uuidv4()}>
            <LazyImage className="grid-cell" src={`${IMAGE_URL}${data.poster_path}`} alt="placeholder">
              <div className="grid-read-more">
                <button className="grid-cell-button">
                  <Link to={`/${data.id}/${formatMovieTitle(data.title)}/details`}>Read More</Link>
                </button>
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
          </div>
        ))}
      </div>
    </>
  );
};

Grid.propTypes = {
  list: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  list: state.movies.list
});

export default connect(mapStateToProps, {})(Grid);
