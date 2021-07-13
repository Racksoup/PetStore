import { CREATE_ITEM, INVENTORY_ERROR, GOT_CATEGORIES } from '../actions/types';

const initialState = {
  item: null,
  items: [],
  categories: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_ITEM:
      return {
        ...state,
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
    default:
      return state;
  }
}
