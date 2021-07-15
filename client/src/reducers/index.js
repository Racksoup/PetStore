import { combineReducers } from 'redux';
import auth from './auth';
import profile from './profile';
import inventory from './inventory';
import shop from './shop';

export default combineReducers({
  auth,
  profile,
  inventory,
  shop,
});
