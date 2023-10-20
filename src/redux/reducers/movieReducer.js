import { LOAD_MORE_RESULTS, MOVIE_LIST, MOVIE_TYPE, RESPONSE_PAGE, SEARCH_QUERY, SEARCH_RESULTS } from '../types';

const initialState = {
  list: [],
  page: 1,
  totalPages: 0,
  movieType: 'now_playing',
  searchQuery: '',
  searchResults: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MOVIE_LIST:
      return { ...state, list: action.payload };
    case RESPONSE_PAGE:
      return {
        ...state,
        page: action.payload.page,
        totalPages: action.payload.totalPages
      };
    case LOAD_MORE_RESULTS:
      return {
        ...state,
        list: [...state.list, ...action.payload.list],
        page: action.payload.page,
        totalPages: action.payload.totalPages
      };
    case MOVIE_TYPE:
      return { ...state, movieType: action.payload };
    case SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };
    case SEARCH_RESULTS:
      return { ...state, searchResults: action.payload };
    default:
      return state;
  }
};
