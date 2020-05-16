/*
Reducers:
specify how the application’s state changes in response to actions sent to the store.

This index.js is the parent reducer and to put together every child reducer
we'll use combineReducers().
*/
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { LOGOUT_SUCCESS } from '../actions/types';
import todos from './todos';
import auth from './auth';
import events from './events';
import secrets from './secrets';

const appReducer = combineReducers({
  form: formReducer,
  todos,
  events,
  auth,
  secrets
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_SUCCESS) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;