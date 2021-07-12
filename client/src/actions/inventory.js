import { setAlert } from './alert';
import {
  CREATE_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  GET_ONE_ITEM,
  GET_CATEGORY,
  INVENTORY_ERROR,
} from './types';

import axios from 'axios';

export const createItem = (item) => async (dispatch) => {
  console.log(item);
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
