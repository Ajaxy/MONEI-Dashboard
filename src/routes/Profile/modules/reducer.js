import * as types from './types';
import {combineReducers} from 'redux';
export const stateKey = 'profileScreen';

const isChangingPassword = (state = false, action) => {
  switch (action.type) {
    case types.CHANGE_PASSWORD_REQUEST:
      return true;
    case types.CHANGE_PASSWORD_SUCCESS:
    case types.CHANGE_PASSWORD_FAIL:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  isChangingPassword,
});

