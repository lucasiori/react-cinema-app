import { MOVIE_API_URL, MOVIE_CREDITS_URL, MOVIE_DETAILS_URL, MOVIE_IMAGES_URL, MOVIE_REVIEWS_URL, MOVIE_VIDEOS_URL, SEARCH_API_URL } from '../../services/movies.service';
import { CLEAR_MOVIE_DETAILS, LOAD_MORE_RESULTS, MOVIE_DETAILS, MOVIE_LIST, MOVIE_TYPE, SET_ERROR, RESPONSE_PAGE, SEARCH_QUERY, SEARCH_RESULTS } from '../types';

export const getMovies = (type, pageNumber) => async (dispatch) => {
  try {
    const response = await getMoviesRequest(type, pageNumber);
    const { results, payload } = response;

    dispatchMethod(MOVIE_LIST, results, dispatch);
    dispatchMethod(RESPONSE_PAGE, payload, dispatch);
  } catch (error) {
    if (error.response) {
      dispatchMethod(SET_ERROR, error.response.data.message, dispatch);
    }
  }
};

export const loadMoreMovies = (type, pageNumber) => async (dispatch) => {
  try {
    const response = await getMoviesRequest(type, pageNumber);
    const { results, payload } = response;

    dispatchMethod(LOAD_MORE_RESULTS, { list: results, page: payload.page, totalPages: payload.totalPages }, dispatch);
  } catch (error) {
    if (error.response) {
      dispatchMethod(SET_ERROR, error.response.data.message, dispatch);
    }
  }
};

export const setResults = (query) => async (dispatch) => {
  try {
    if (query) {
      const movies = await SEARCH_API_URL(query);
      const { results } = movies.data;

      dispatchMethod(SEARCH_RESULTS, results, dispatch);
    } else {
      dispatchMethod(SEARCH_RESULTS, [], dispatch);
    }
  } catch (error) {
    if (error.response) {
      dispatchMethod(SET_ERROR, error.response.data.message, dispatch);
    }
  }
};

export const movieDetails = (id) => async (dispatch) => {
  try {
    const details = await MOVIE_DETAILS_URL(id);
    const credits = await MOVIE_CREDITS_URL(id);
    const images = await MOVIE_IMAGES_URL(id);
    const videos = await MOVIE_VIDEOS_URL(id);
    const reviews = await MOVIE_REVIEWS_URL(id);

    const response = await Promise.all([details, credits, images, videos, reviews])
      .then((values) => Promise.all(values.map((value) => value.data)))
      .then((values) => values);

    dispatchMethod(MOVIE_DETAILS, response, dispatch);
  } catch (error) {
    if (error.response) {
      dispatchMethod(SET_ERROR, error.response.data.message, dispatch);
    }
  }
};

export const clearMovieDetails = () => async (dispatch) => {
  dispatchMethod(CLEAR_MOVIE_DETAILS, [], dispatch);
};

export const setResponsePageNumber = (page, totalPages) => async (dispatch) => {
  const payload = { page, totalPages };
  dispatchMethod(RESPONSE_PAGE, payload, dispatch);
};

export const setMovieType = (type) => async (dispatch) => {
  dispatchMethod(MOVIE_TYPE, type, dispatch);
};

export const setQuery = (query) => async (dispatch) => {
  dispatchMethod(SEARCH_QUERY, query, dispatch);
};

const dispatchMethod = (type, payload, dispatch) => {
  dispatch({ type, payload });
};

const getMoviesRequest = async (type, pageNumber) => {
  const movies = await MOVIE_API_URL(type, pageNumber);
  const { results, page, total_pages } = movies.data;
  const payload = { page, totalPages: total_pages };

  return { results, payload };
};
