import {
  SHOP_CREATE_ITEM,
  SHOP_INVENTORY_ERROR,
  SHOP_GOT_CATEGORIES,
  SHOP_GOT_ITEM,
  SHOP_GOT_ITEMS,
  SHOP_UPDATE_ITEM,
} from '../actions/types';

const initialState = {
  item: {},
  items: [],
  categories: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SHOP_INVENTORY_ERROR:
      return {
        ...state,
      };
    case SHOP_GOT_CATEGORIES:
      return {
        ...state,
        categories: payload,
      };
    case SHOP_GOT_ITEMS:
      return {
        ...state,
        items: payload,
      };
    case SHOP_GOT_ITEM:
    case SHOP_UPDATE_ITEM:
    case SHOP_CREATE_ITEM:
      return {
        ...state,
        item: payload,
      };
    default:
      return state;
  }
}