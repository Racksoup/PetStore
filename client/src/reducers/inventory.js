import {
  CREATE_ITEM,
  INVENTORY_ERROR,
  GOT_CATEGORIES,
  GOT_ITEM,
  GOT_ITEMS,
  UPDATE_ITEM,
  TOGGLE,
  TOGGLE_ITEM_MODAL,
} from '../actions/types';

const initialState = {
  item: {},
  items: [],
  categories: [],
  toggle: 0,
  toggleItemModal: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case TOGGLE_ITEM_MODAL:
      return {
        ...state,
        toggleItemModal: payload,
      };
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
