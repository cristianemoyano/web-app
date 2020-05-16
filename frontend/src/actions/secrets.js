import axios from "axios";

import { GET_SECRETS, SECRETS_ERROR } from './types';

// GET SECRETS
export const getSecrets = () => async (dispatch, getState) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.get('/api/secrets/', config);
    dispatch({
      type: GET_SECRETS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SECRETS_ERROR,
      payload: err.response,
    });
  }

};
