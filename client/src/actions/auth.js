import { setAlert } from './alert';
import {
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  CLEAR_PROFILE,
  LOGOUT,
  ACCOUNT_DELETED,
  DELETE_FAIL,
  TOGGLE_USER_MODAL,
  TOGGLE_UPDATE_USER_LOGIN,
  UPDATE_USER_FAILED,
  USER_UPDATED,
  SET_LOADING,
} from './types';
import setAuthToken from '../utils/setAuthToken';

import axios from 'axios';
import { createProfile } from './profile';

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = (username, password, email) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ username, password });

  try {
    const res = await axios.post('/api/users', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
    dispatch(createProfile({ email: email }));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login User
// Sends username and password, receives auth token. calls loadUser() after token is set into localstorage
export const login = (username, password) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ username, password });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({ type: LOGIN_FAIL });
  }
};

// Logout / Clear Profile
export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};

// Delete Account
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are your sure? This can NOT be undone!')) {
    try {
      await axios.delete('/api/users');
      await axios.delete('/api/profile');

      dispatch({ type: ACCOUNT_DELETED });
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({
        type: DELETE_FAIL,
      });
    }
  }
};

export const setToggleUserModal = (val) => (dispatch) => {
  dispatch({
    type: TOGGLE_USER_MODAL,
    payload: val,
  });
};

export const setToggleUpdateUserLogin = (val) => (dispatch) => {
  dispatch({
    type: TOGGLE_UPDATE_USER_LOGIN,
    payload: val,
  });
};

export const updateUser = (username, password, id) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ username, password });
  try {
    const res = await axios.put(`api/users/${id}`, body, config);
    dispatch({
      type: USER_UPDATED,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: UPDATE_USER_FAILED,
    });
  }
};
