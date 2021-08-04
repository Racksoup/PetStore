import {
  CREATE_PROFILE,
  GET_ONE_PROFILE,
  PROFILE_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  TOGGLE_PROFILE_MODAL,
  PROFILE_UPDATED,
  UPDATE_QUANTITY,
} from '../actions/types';

const initialState = {
  profile: null,
  error: {},
  profileLoading: true,
  toggleProfileModal: false,
};

export default function profile(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_QUANTITY:
    case PROFILE_UPDATED:
      return {
        ...state,
        profile: payload,
      };
    case TOGGLE_PROFILE_MODAL:
      return {
        ...state,
        toggleProfileModal: payload,
      };
    case CREATE_PROFILE:
      return {
        ...state,
        profile: payload,
        profileLoading: false,
      };
    case GET_ONE_PROFILE:
      return {
        ...state,
        profile: payload,
        profileLoading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        profile: null,
        profileLoading: false,
      };
    case LOGIN_SUCCESS:
    case LOGIN_FAIL:
      return {
        ...state,
        profileLoading: true,
      };
    default:
      return state;
  }
}
