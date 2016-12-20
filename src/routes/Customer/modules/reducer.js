import * as types from './types';
import {combineReducers} from 'redux';
export const stateKey = 'activeCustomer';

const isFetching = (state = true, action) => {
  switch (action.type) {
    case types.FETCH_CUSTOMER_REQUEST:
      return true;
    case types.FETCH_CUSTOMER_SUCCESS:
    case types.FETCH_CUSTOMER_FAIL:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  isFetching
});
