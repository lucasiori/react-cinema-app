/* eslint-disable multiline-ternary */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';

import './Header.scss';
import logo from '../../assets/cinema-logo.svg';
import { clearMovieDetails, getMovies, setMovieType, setResponsePageNumber, setQuery, setResults } from '../../redux/actions/movies';
import { pathUrl } from '../../redux/actions/routes';
import { setError } from '../../redux/actions/errors';

const HEADER_LIST = [
  {
    id: 1,
    iconClass: 'fas fa-film',
    name: 'Now Playing',
    type: 'now_playing'
  },
  {
    id: 2,
    iconClass: 'fas fa-fire',
    name: 'Popular',
    type: 'popular'
  },
  {
    id: 3,
    iconClass: 'fas fa-star',
    name: 'Top Rated',
    type: 'top_rated'
  },
  {
    id: 4,
    iconClass: 'fas fa-plus-square',
    name: 'Upcoming',
    type: 'upcoming'
  }
];

const Header = ({ page, totalPages, routesArray, path, url, errors, clearMovieDetails, getMovies, setMovieType, setResponsePageNumber, setQuery, setResults, pathUrl, setError }) => {
  const history = useHistory();
  const location = useLocation();
  const detailsRoute = useRouteMatch('/:id/:name/details');

  const [navClass, setNavClass] = useState(false);
  const [menuClass, setMenuClass] = useState(false);
  const [type, setType] = useState('now_playing');
  const [search, setSearch] = useState('');
  const [disableSearch, setDisableSearch] = useState(false);
  const [showHeader, setShowHeader] = useState(true);

  const toggleMenu = () => {
    setNavClass(!navClass);
    setMenuClass(!menuClass);

    if (navClass) {
      document.body.classList.remove('header-nav-open');
    } else {
      document.body.classList.add('header-nav-open');
    }
  };

  const setMovieTypeUrl = (type) => {
    setDisableSearch(false);
    setType(type);
    setMovieType(type);

    if (location.pathname !== '/') {
      clearMovieDetails();
      history.push('/');
    }
  };

  const onSearchChange = (event) => {
    setSearch(event.target.value);
    setQuery(event.target.value);
    setResults(event.target.value);
  };

  const navigateToMainPage = () => {
    setDisableSearch(false);
    clearMovieDetails();
    history.push('/');
  };

  useEffect(() => {
    if (path && !errors.message && !errors.statusCode) {
      getMovies(type, page);
      setResponsePageNumber(page, totalPages);

      if (detailsRoute || location.pathname === '/') {
        setShowHeader(true);
      }

      if (location.pathname !== '/' && location.key) {
        setDisableSearch(true);
      }
    }
  }, [type, disableSearch, location, path, errors]);

  useEffect(() => {
    if (routesArray.length) {
      if (!path && !url) {
        pathUrl('/', '/');
        setError({ message: `Page with pathname ${location.pathname} not found`, statusCode: 404 });

        const error = new Error(`Page with pathname ${location.pathname} not found with status code 404.`);
        throw error;
      }
    }
  }, [path, url, routesArray]);

  useEffect(() => {
    if (errors.message || errors.statusCode) {
      pathUrl('/', '/');
      setError({ message: errors.message, statusCode: errors.statusCode });

      const error = new Error(`${errors.message} With status code ${errors.statusCode}`);
      throw error;
    }
  }, [errors]);

  return showHeader ? (
    <div className="header-nav-wrapper">
      <div className="header-bar" />
      <div className="header-navbar">
        <div className="header-image" onClick={() => navigateToMainPage()}>
          <img src={logo} alt="" />
        </div>

        <div id="header-mobile-menu" className={`header-menu-toggle ${menuClass ? 'is-active' : ''}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <ul className={`header-nav ${navClass ? 'header-mobile-nav' : ''}`}>
          {HEADER_LIST.map((data) => (
            <li key={data.id} className={`header-nav-item ${data.type === type ? 'active-item' : ''}`} onClick={() => setMovieTypeUrl(data.type)}>
              <span className="header-list-name">
                <i className={data.iconClass}></i>
              </span>
              &nbsp;
              <span className="header-list-name">{data.name}</span>
            </li>
          ))}

          <input type="text" className={`search-input ${disableSearch ? 'disabled' : ''}`} placeholder="Search for a movie" value={search} onChange={onSearchChange} />
        </ul>
      </div>
    </div>
  ) : null;
};

Header.propTypes = {
  page: PropTypes.number,
  totalPages: PropTypes.number,
  routesArray: PropTypes.array,
  path: PropTypes.string,
  url: PropTypes.string,
  errors: PropTypes.object,
  clearMovieDetails: PropTypes.func,
  getMovies: PropTypes.func,
  setMovieType: PropTypes.func,
  setResponsePageNumber: PropTypes.func,
  setQuery: PropTypes.func,
  setResults: PropTypes.func,
  pathUrl: PropTypes.func,
  setError: PropTypes.func
};

const mapStateToProps = (state) => ({
  page: state.movies.page,
  totalPages: state.movies.totalPages,
  routesArray: state.routes.routesArray,
  path: state.routes.path,
  url: state.routes.url,
  errors: state.errors
});

export default connect(mapStateToProps, { clearMovieDetails, getMovies, setMovieType, setResponsePageNumber, setQuery, setResults, pathUrl, setError })(Header);
