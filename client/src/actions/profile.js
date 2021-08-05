import { setAlert } from './alert';
import store from '../store';
import {
  CREATE_PROFILE,
  GET_ONE_PROFILE,
  PROFILE_ERROR,
  TOGGLE_PROFILE_MODAL,
  PROFILE_UPDATED,
  SHOP_GOT_ITEMS,
  CLEAR_ITEMS,
  UPDATE_QUANTITY,
  UPDATED_SHOP_ITEMS,
} from './types';

import axios from 'axios';

// Create Profile
export const createProfile = (profile) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify(profile);

  try {
    await axios.post('/api/profile', body, config);

    dispatch({
      type: CREATE_PROFILE,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
    });
  }
};

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({
      type: GET_ONE_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const setToggleProfileModal = (val) => (dispatch) => {
  dispatch({
    type: TOGGLE_PROFILE_MODAL,
    payload: val,
  });
};

export const updateProfile = (profile) => async (dispatch) => {
  console.log(profile);
  try {
    const res = await axios.put(`api/profile/user/${profile._id}`, profile);
    dispatch({
      type: PROFILE_UPDATED,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};

export const addToCart = (profile) => async (dispatch) => {
  try {
    const res = await axios.put(`api/profile/add-cart/${profile._id}`, profile);
    dispatch({
      type: PROFILE_UPDATED,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};

export const removeCartItem = (profile, items) => async (dispatch) => {
  try {
    const res = await axios.put(`api/profile/user/${profile._id}`, profile);
    dispatch({
      type: UPDATED_SHOP_ITEMS,
      payload: items,
    });
    dispatch({
      type: PROFILE_UPDATED,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};

export const getAllCartItems = () => async (dispatch) => {
  const res = await axios.get('/api/profile/me');
  dispatch({
    type: CLEAR_ITEMS,
  });
  try {
    let pathRequests = [];
    let getRequests = [];
    res.data.cart.map((item) => pathRequests.push(`api/inventory/${item._id}`));
    pathRequests.map(async (req) => await getRequests.push(axios.get(req)));
    await axios.all(getRequests).then(
      axios.spread((...responses) => {
        getRequests = responses.map((response, i) => response.data);
      })
    );
    getRequests.map((req) => (req = req.data));
    dispatch({
      type: SHOP_GOT_ITEMS,
      payload: getRequests,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};

export const getAllWishlistItems = () => async (dispatch) => {
  const res = await axios.get('/api/profile/me');
  dispatch({
    type: CLEAR_ITEMS,
  });
  try {
    let pathRequests = [];
    let getRequests = [];
    res.data.wishlist.map((item) => pathRequests.push(`api/inventory/${item._id}`));
    pathRequests.map(async (req) => await getRequests.push(axios.get(req)));
    await axios.all(getRequests).then(
      axios.spread((...responses) => {
        getRequests = responses.map((response, i) => response.data);
      })
    );
    getRequests.map((req) => (req = req.data));
    dispatch({
      type: SHOP_GOT_ITEMS,
      payload: getRequests,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};

export const updateQuantity = (e, item) => async (dispatch) => {
  const val = e.target.value;
  const profile1 = store.getState().profile.profile;
  profile1.cart.map((cartItem) => {
    if (cartItem._id === item._id) {
      return (cartItem.quantity = val);
    }
  });

  try {
    await axios.put(`api/profile/user/${profile1._id}`, profile1);
    dispatch({
      type: UPDATE_QUANTITY,
      payload: { ...profile1 },
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};
