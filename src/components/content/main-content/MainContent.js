import React from 'react';

import './MainContent.scss';
import Slideshow from '../slide-show/Slideshow';

const images = [
  { url: 'https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg' },
  { url: 'https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg' },
  { url: 'https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg' }
];

const MainContent = () => {
  return (
    <div className="main-content">
      <Slideshow images={images} auto showArrows />

      <div className="grid-movie-title">
        <div className="movie-type">Now Playing</div>
        <div className="paginate">Paginate</div>
      </div>

      {/* display grid component */}
    </div>
  );
};

export default MainContent;
