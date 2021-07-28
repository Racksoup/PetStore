import { setAlert } from './alert';
import FormData from 'form-data';
import {
  CREATE_ITEM,
  INVENTORY_ERROR,
  GOT_CATEGORIES,
  GOT_ITEMS,
  GOT_ITEM,
  UPDATE_ITEM,
  TOGGLE,
  HEADER_IMAGE_DELETED,
  HEADER_IMAGE_CREATED,
  IMAGE_LOADING,
} from './types';

import axios from 'axios';

export const createItem = (item, file) => async (dispatch) => {
  let data = new FormData();
  data.append('file', file);
  data.append('name', item.name);
  data.append('stock', item.stock);
  data.append('price', item.price);
  data.append('category', item.category);
  try {
    const config = {
      headers: {
        accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      },
    };
    const res = await axios.post('/api/inventory', data, config);
    dispatch({
      type: CREATE_ITEM,
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

export const updateItem = (item, file, id) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const oldItem = await axios.get(`/api/inventory/${id}`);
    if (file !== '' && file !== null && file !== undefined) {
      let data = new FormData();
      data.append('file', file);
      const fileConfig = {
        headers: {
          accept: 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        },
      };
      await axios.delete(`/api/inventory/deleteimage/${oldItem.data.image_filename}`);
      const newImage = await axios.post('/api/inventory/uploadimage', data, fileConfig);
      item.image_filename = newImage.data.file.filename;
    }
    if (item) {
      const body = JSON.stringify(item);
      const res = await axios.put(`/api/inventory/${id}`, body, config);
      dispatch({
        type: UPDATE_ITEM,
        payload: res.data,
      });
    }
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

export const setToggle = (val) => (dispatch) => {
  dispatch({
    type: TOGGLE,
    payload: val,
  });
};

export const submitFile = (file) => async (dispatch) => {
  dispatch({
    type: IMAGE_LOADING,
  });
  let data = new FormData();
  data.append('file', file);
  data.append('category', 'headerImage');
  try {
    const config = {
      headers: {
        accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      },
    };

    const res = await axios.post('/api/headerimage/upload', data, config);

    dispatch({
      type: HEADER_IMAGE_CREATED,
      payload: res.data.file,
    });
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: INVENTORY_ERROR,
    });
  }
};

export const removeHeaderImage = (filename) => async (dispatch) => {
  dispatch({
    type: IMAGE_LOADING,
  });
  try {
    const res = await axios.delete(`/api/headerimage/files/${filename}`);
    dispatch({
      type: HEADER_IMAGE_DELETED,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: INVENTORY_ERROR,
    });
  }
};
