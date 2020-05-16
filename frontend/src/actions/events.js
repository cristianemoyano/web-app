import axios from "axios";

import { reset } from 'redux-form';
import history from '../history';
import { tokenConfig } from './auth';
import { GET_EVENTS, GET_EVENT, ADD_EVENT, DELETE_EVENT, EDIT_EVENT, EVENT_ERROR } from './types';

// GET EVENTS
export const getEvents = () => async (dispatch, getState) => {

  try {
    const res = await axios.get('/api/events/', tokenConfig(getState));
    dispatch({
      type: GET_EVENTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: err.response,
    });
  }

};

// GET EVENT
export const getEvent = id => async (dispatch, getState) => {
  try {
    const res = await axios.get(`/api/events/${id}/`, tokenConfig(getState));
    dispatch({
      type: GET_EVENT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: err.response,
    });
  }
  
};

// ADD EVENT
export const addEvent = formValues => async (dispatch, getState) => {
  try {
    const res = await axios.post(
      '/api/events/',
      { ...formValues },
      tokenConfig(getState)
    );
    dispatch({
      type: ADD_EVENT,
      payload: res.data
    });
    // Dispatching reset('formName') clears our form after we submission succeeds.
    // We will specify the form name later in the Form component.
    dispatch(reset('calendarForm'));
  
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: err.response,
    });
  }


};

// DELETE EVENT
export const deleteEvent = id => async (dispatch, getState) => {
  try {
    await axios.delete(`/api/events/${id}/`, tokenConfig(getState));
    dispatch({
      type: DELETE_EVENT,
      payload: id
    });
    history.push('/');
    
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: err.response,
    });
  }
};


// EDIT EVENT
export const editEvent = (id, formValues) => async (dispatch, getState) => {
  try {
    const res = await axios.patch(
      `/api/events/${id}/`,
      formValues,
      tokenConfig(getState)
    );
    dispatch({
      type: EDIT_EVENT,
      payload: res.data
    });
    history.push('/');
  
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: err.response,
    });
  }

};