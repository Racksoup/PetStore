import { CREATE_ITEM, INVENTORY_ERROR } from '../actions/types';

const initialState = {
  item: null,
  items: [],
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
    default:
      return state;
  }
}
