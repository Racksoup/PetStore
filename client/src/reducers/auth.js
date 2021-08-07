import {
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED,
  DELETE_FAIL,
  TOGGLE_USER_MODAL,
  TOGGLE_UPDATE_USER_LOGIN,
  USER_UPDATED,
  UPDATE_USER_FAILED,
  SET_LOADING,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  loadingAuth: false,
  user: null,
  toggleUpdateUserLogin: false,
  toggleUserModal: false,
  loadingFailed: false,
};

export default function auth(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        loadingAuth: payload,
        loadingFailed: false,
      };
    case TOGGLE_USER_MODAL:
      return {
        ...state,
        toggleUserModal: payload,
      };
    case TOGGLE_UPDATE_USER_LOGIN:
      return {
        ...state,
        toggleUpdateUserLogin: payload,
      };
    case USER_UPDATED:
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        loadingAuth: false,
        loadingFailed: false,
      };
    case AUTH_ERROR:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        loadingAuth: false,
        loadingFailed: true,
      };
    case UPDATE_USER_FAILED:
    case DELETE_FAIL:
    default:
      return state;
  }
}
