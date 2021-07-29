import { setAlert } from './alert';
import {
  CREATE_PROFILE,
  GET_ONE_PROFILE,
  PROFILE_ERROR,
  FILE_SUBMITED,
  TOGGLE_PROFILE_MODAL,
} from './types';

import FormData from 'form-data';
import axios from 'axios';

// Create Profile
export const createProfile = (profile) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify(profile);

  try {
    const res = await axios.post('/api/profile', body, config);

    dispatch({
      type: CREATE_PROFILE,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
    });
  }
};

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({
      type: GET_ONE_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const setToggleProfileModal = (val) => (dispatch) => {
  dispatch({
    type: TOGGLE_PROFILE_MODAL,
    payload: val,
  });
};
