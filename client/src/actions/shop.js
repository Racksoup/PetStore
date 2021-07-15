import { setAlert } from './alert';
import {
  SHOP_CREATE_ITEM,
  SHOP_INVENTORY_ERROR,
  SHOP_GOT_CATEGORIES,
  SHOP_GOT_ITEM,
  SHOP_GOT_ITEMS,
  SHOP_UPDATE_ITEM,
} from '../actions/types';

import axios from 'axios';

export const createItem = (item) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify(item);
  try {
    const res = await axios.post('/api/inventory', body, config);
    dispatch({
      type: SHOP_CREATE_ITEM,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: SHOP_INVENTORY_ERROR,
    });
  }
};

export const updateItem = (item, id) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify(item);
  try {
    await axios.put(`/api/inventory/${id}`, body, config);
    item._id = id;
    dispatch({
      type: SHOP_UPDATE_ITEM,
      payload: item,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: SHOP_INVENTORY_ERROR,
    });
  }
};

export const getCategories = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/inventory/list');
    dispatch({
      type: SHOP_GOT_CATEGORIES,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: SHOP_INVENTORY_ERROR,
    });
  }
};

export const getItem = (name) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/inventory/name/${name}`);
    dispatch({
      type: SHOP_GOT_ITEM,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: SHOP_INVENTORY_ERROR,
    });
  }
};

export const getItems = (item) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/inventory/category/${item}`);
    dispatch({
      type: SHOP_GOT_ITEMS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: SHOP_INVENTORY_ERROR,
    });
  }
};

export const getItemById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/inventory/${id}`);
    dispatch({
      type: SHOP_GOT_ITEM,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: SHOP_INVENTORY_ERROR,
    });
  }
};
