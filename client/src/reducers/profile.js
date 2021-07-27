import {
  CREATE_PROFILE,
  GET_ONE_PROFILE,
  PROFILE_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
} from '../actions/types';

const initialState = {
  profile: null,
  error: {},
  profileLoading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
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
