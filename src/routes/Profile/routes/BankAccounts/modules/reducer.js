import * as types from './types';
import {combineReducers} from 'redux';

export const stateKey = 'profileBankAccounts';

const isAdding = (state = false, action) => {
  switch (action.type) {
    case types.ADD_BANK_ACCOUNT_REQUEST:
      return true;
    case types.ADD_BANK_ACCOUNT_SUCCESS:
    case types.ADD_BANK_ACCOUNT_FAIL:
      return false;
    default:
      return state;
  }
};

const isAddModalOpen = (state = false, action) => {
  switch (action.type) {
    case types.ADD_BANK_ACCOUNT_START:
      return true;
    case types.ADD_BANK_ACCOUNT_CANCEL:
    case types.ADD_BANK_ACCOUNT_FAIL:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  isAdding,
  isAddModalOpen
});
