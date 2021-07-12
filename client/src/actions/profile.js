import axios from 'axios';
import { setAlert } from './alert';
import {
  CREATE_PROFILE,
  UPDATE_PROFILE,
  DELETE_PROFILE,
  GET_ONE_PROFILE,
  GET_ALL_PROFILES,
  PROFILE_ERROR,
} from './types';

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
      payload: res.data,
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
