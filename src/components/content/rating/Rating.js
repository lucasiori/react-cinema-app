import React, { Fragment, useEffect, useRef, useState } from 'react';
import PropTyes from 'prop-types';

import './Rating.scss';

const Rating = ({ rating, totalStars, className }) => {
  const [numberOfStars, setNumberOfStars] = useState([]);
  const ratingRef = useRef();

  useEffect(() => {
    setNumberOfStars([...Array(totalStars).keys()].map((index) => index + 1));
    let percentage;

    if (rating <= 5) {
      percentage = (rating / 5) * 100;
    } else {
      percentage = (rating / 10) * 100;
    }

    const startPercentage = `${Math.floor(percentage)}%`;
    ratingRef.current.style.width = startPercentage;
  }, [rating, totalStars]);

  return (
    <div className="star-rating">
      <div className={`back-stars ${className}`}>
        {numberOfStars.map((index) => (
          <Fragment key={index}>
            <i className="fa fa-star" aria-hidden="true" />
          </Fragment>
        ))}

        <div ref={ratingRef} className={`front-stars ${className}`}>
          {numberOfStars.map((index) => (
            <Fragment key={index}>
              <i className="fa fa-star" aria-hidden="true" />
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

Rating.propTypes = {
  rating: PropTyes.number.isRequired,
  totalStars: PropTyes.number.isRequired,
  className: PropTyes.string
};

export default Rating;
