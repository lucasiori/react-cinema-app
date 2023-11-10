import { SET_ERROR } from '../types';

export const setError = (errorMessage) => async (dispatch) => {
  if (errorMessage) {
    const payload = {
      message: errorMessage.message,
      statusCode: errorMessage.statusCode
    };

    dispatch({ type: SET_ERROR, payload });
  } else {
    dispatch({ type: SET_ERROR, payload: { message: '', statusCode: null } });
  }
};
