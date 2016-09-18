import * as types from './types';
import * as customerTypes from 'routes/Customers/modules/types';
import {mergeArrays} from 'lib/utils';
import {combineReducers} from 'redux';
export const stateKey = 'customers';

const ids = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_CUSTOMERS_SUCCESS:
      return [...action.ids];
    case types.CREATE_CUSTOMER_SUCCESS:
    case types.DUPLICATE_CUSTOMER_SUCCESS:
    case customerTypes.FETCH_CUSTOMER_SUCCESS:
      return mergeArrays(state, [action.customerId]);
    case types.DELETE_CUSTOMER_SUCCESS:
      let index = state.indexOf(action.customerId);
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ];
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_CUSTOMERS_SUCCESS:
      return {...action.byId};
    case types.CREATE_CUSTOMER_SUCCESS:
    case types.DUPLICATE_CUSTOMER_SUCCESS:
    case customerTypes.FETCH_CUSTOMER_SUCCESS:
    case customerTypes.UPDATE_CUSTOMER_SUCCESS:
    case customerTypes.CUSTOMER_REPORT_SUCCESS:
    case customerTypes.SEND_CUSTOMER_SUCCESS:
      return {
        ...state,
        [action.customerId]: {
          ...state[action.customerId],
          ...action.byId[action.customerId],
          _isUpToDate: true
        }
      };
    case types.DELETE_CUSTOMER_SUCCESS:
      const newState = {...state};
      delete newState[action.customerId];
      return newState;
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case types.DUPLICATE_CUSTOMER_REQUEST:
    case types.FETCH_CUSTOMERS_REQUEST:
      return true;
    case types.FETCH_CUSTOMERS_SUCCESS:
    case types.FETCH_CUSTOMERS_FAIL:
    case types.DUPLICATE_CUSTOMER_SUCCESS:
    case types.DUPLICATE_CUSTOMER_FAIL:
      return false;
    default:
      return state;
  }
};

const isDeleting = (state = false, action) => {
  switch (action.type) {
    case types.DELETE_CUSTOMER_REQUEST:
      return true;
    case types.DELETE_CUSTOMER_SUCCESS:
    case types.DELETE_CUSTOMER_FAIL:
    case types.FETCH_CUSTOMERS_SUCCESS:
    case types.FETCH_CUSTOMERS_FAIL:
      return false;
    default:
      return state;
  }
};

const isCreating = (state = false, action) => {
  switch (action.type) {
    case types.CREATE_CUSTOMER_REQUEST:
      return true;
    case types.CREATE_CUSTOMER_SUCCESS:
    case types.CREATE_CUSTOMER_FAIL:
      return false;
    default:
      return state;
  }
};

const customerToDelete = (state = null, action) => {
  switch (action.type) {
    case types.DELETE_CUSTOMER_START:
      return action.customerId;
    case types.DELETE_CUSTOMER_SUCCESS:
    case types.DELETE_CUSTOMER_CANCEL:
      return null;
    default:
      return state;
  }
};

const isDeleteModalOpen = (state = false, action) => {
  switch (action.type) {
    case types.DELETE_CUSTOMER_START:
      return true;
    case types.DELETE_CUSTOMER_SUCCESS:
    case types.DELETE_CUSTOMER_FAIL:
    case types.DELETE_CUSTOMER_CANCEL:
      return false;
    default:
      return state;
  }
};

const isUpToDate = (state = false, action) => {
  switch (action.type) {
    case types.FETCH_CUSTOMERS_SUCCESS:
      return true;
    case types.REQUEST_CUSTOMERS_FETCH:
      return false;
    default:
      return state;
  }
};

const pages = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_CUSTOMERS_SUCCESS:
      return {
        prevPage: action.prevPage,
        nextPage: action.nextPage
      };
    default:
      return state;
  }
};

export default combineReducers({
  ids,
  byId,
  pages,
  customerToDelete,
  isUpToDate,
  isFetching,
  isDeleting,
  isCreating,
  isDeleteModalOpen
});

