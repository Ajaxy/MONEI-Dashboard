import * as types from './types';
import {mergeArrays} from 'lib/utils';
import {combineReducers} from 'redux';
export const stateKey = 'transactions';
import {isFailed, isIncome} from './utils';

const ids = (state = [], action) => {
  switch (action.type) {
    case types.CLEAR_TRANSACTIONS:
      return [];
    case types.FETCH_TRANSACTIONS_SUCCESS:
      return mergeArrays(state, action.ids);
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case types.CLEAR_TRANSACTIONS:
      return {};
    case types.FETCH_TRANSACTIONS_SUCCESS:
      return Object.assign({}, state, action.byId);
    default:
      return state;
  }
};

const totalAmount = (state = 0, action) => {
  switch (action.type) {
    case types.CLEAR_TRANSACTIONS:
      return 0;
    case types.FETCH_TRANSACTIONS_SUCCESS:
      return state + action.ids.map(id =>
          action.byId[id]
        ).map(transaction => {
          const {result, paymentType} = transaction;
          if(isFailed(result.code)) return 0;
          const amount = parseFloat(transaction.amount);
          if(isIncome(result.code, paymentType)) return amount;
          return -amount;
        }).reduce((a, b) => a + b, 0);
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case types.FETCH_TRANSACTIONS_REQUEST:
      return true;
    case types.FETCH_TRANSACTIONS_SUCCESS:
    case types.FETCH_TRANSACTIONS_FAIL:
      return false;
    default:
      return state;
  }
};

const page = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_TRANSACTIONS_SUCCESS:
      return {
        nextPage: action.nextPage,
        from: action.from,
        to: action.to,
      };
    default:
      return state;
  }
};

export default combineReducers({
  ids,
  byId,
  page,
  isFetching,
  totalAmount,
});

