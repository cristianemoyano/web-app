import {
  GET_SECRETS,
  SECRETS_ERROR
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_SECRETS:
      return {
        ...action.payload,
      };
    case SECRETS_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
};
