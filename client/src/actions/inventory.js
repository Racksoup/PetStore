import { setAlert } from './alert';
import { CREATE_ITEM, INVENTORY_ERROR, GOT_CATEGORIES, GOT_ITEMS, GOT_ITEM } from './types';

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
      type: CREATE_ITEM,
      payload: res.payload,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: INVENTORY_ERROR,
    });
  }
};

export const getCategories = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/inventory/list');
    dispatch({
      type: GOT_CATEGORIES,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: INVENTORY_ERROR,
    });
  }
};

export const getItem = (name) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/inventory/name/${name}`);
    dispatch({
      type: GOT_ITEM,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getItems = (item) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/inventory/category/${item}`);
    dispatch({
      type: GOT_ITEMS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getItemById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/inventory/${id}`);
    dispatch({
      type: GOT_ITEM,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
