import * as types from './types';
import {combineReducers} from 'redux';
import * as customerTypes from 'routes/Customer/modules/types';
import {mergeArrays} from 'lib/utils';
export const stateKey = 'customers';

const ids = (state = [], action) => {
  switch (action.type) {
    case types.CLEAR_CUSTOMERS:
      return [];
    case types.FETCH_CUSTOMERS_SUCCESS:
      return action.ids || [];
    case customerTypes.FETCH_CUSTOMER_SUCCESS:
      return mergeArrays(state, [action.customerId]);
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case types.CLEAR_CUSTOMERS:
      return {};
    case types.FETCH_CUSTOMERS_SUCCESS:
      return action.byId || {};
    case customerTypes.FETCH_CUSTOMER_SUCCESS:
      return {
        ...state,
        [action.customerId]: {
          ...state[action.customerId],
          ...action.byId[action.customerId]
        }
      };
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case types.FETCH_CUSTOMERS_REQUEST:
      return true;
    case types.FETCH_CUSTOMERS_SUCCESS:
    case types.FETCH_CUSTOMERS_FAIL:
      return false;
    default:
      return state;
  }
};

const queryParams = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_CUSTOMERS_SUCCESS:
      return {
        prevPage: action.prevPage,
        nextPage: action.nextPage,
        email: action.email
      };
    default:
      return state;
  }
};

export default combineReducers({
  ids,
  byId,
  queryParams,
  isFetching
});

