import { CREATE_PROFILE, GET_ONE_PROFILE, PROFILE_ERROR } from '../actions/types';

const initialState = {
  profile: null,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_PROFILE:
      return {
        ...state,
        profile: payload,
      };
    case GET_ONE_PROFILE:
      return {
        ...state,
        profile: payload,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        profile: null,
      };
    default:
      return state;
  }
}
