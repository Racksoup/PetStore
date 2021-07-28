import {
  SHOP_CREATE_ITEM,
  SHOP_INVENTORY_ERROR,
  SHOP_GOT_CATEGORIES,
  SHOP_GOT_ITEM,
  SHOP_GOT_ITEMS,
  SHOP_UPDATE_ITEM,
  GOT_HEADER_IMAGES,
  HEADER_IMAGE_DELETED,
  HEADER_IMAGE_CREATED,
  IMAGE_LOADING,
} from '../actions/types';

const initialState = {
  item: {},
  items: [],
  categories: [],
  headerImages: [],
  imageLoading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case IMAGE_LOADING:
      return {
        ...state,
        imageLoading: true,
      };
    case HEADER_IMAGE_CREATED:
      return {
        ...state,
        headerImages: [...state.headerImages, payload],
        imageLoading: false,
      };
    case HEADER_IMAGE_DELETED:
      return {
        ...state,
        headerImages: state.headerImages.filter((image) => image.filename !== payload),
        imageLoading: false,
      };
    case GOT_HEADER_IMAGES:
      return {
        ...state,
        headerImages: payload,
      };
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
