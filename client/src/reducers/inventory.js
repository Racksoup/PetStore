import {
  CREATE_ITEM,
  INVENTORY_ERROR,
  GOT_CATEGORIES,
  GOT_ITEM,
  GOT_ITEMS,
  UPDATE_ITEM,
  TOGGLE,
} from '../actions/types';

const initialState = {
  item: {},
  items: [],
  categories: [],
  toggle: 0,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case INVENTORY_ERROR:
      return {
        ...state,
      };
    case GOT_CATEGORIES:
      return {
        ...state,
        categories: payload,
      };
    case GOT_ITEMS:
      return {
        ...state,
        items: payload,
      };
    case GOT_ITEM:
    case UPDATE_ITEM:
    case CREATE_ITEM:
      return {
        ...state,
        item: payload,
      };
    case TOGGLE:
      return {
        ...state,
        toggle: payload,
      };
    default:
      return state;
  }
}
