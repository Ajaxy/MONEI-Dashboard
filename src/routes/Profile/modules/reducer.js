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

const isRequestingPhoneVerification = (state = false, action) => {
  switch (action.type) {
    case types.PHONE_VERIFICATION_REQUEST:
      return true;
    case types.PHONE_VERIFICATION_SUCCESS:
    case types.PHONE_VERIFICATION_FAIL:
      return false;
    default:
      return state;
  }
};

const isCheckingPhoneVerification = (state = false, action) => {
  switch (action.type) {
    case types.PHONE_VERIFICATION_CHECK_REQUEST:
      return true;
    case types.PHONE_VERIFICATION_CHECK_SUCCESS:
    case types.PHONE_VERIFICATION_CHECK_FAIL:
      return false;
    default:
      return state;
  }
};

const isCheckingModalVisible = (state = false, action) => {
  switch (action.type) {
    case types.PHONE_VERIFICATION_SUCCESS:
    case types.PHONE_VERIFICATION_CHECK_START:
      return true;
    case types.PHONE_VERIFICATION_CHECK_SUCCESS:
    case types.PHONE_VERIFICATION_CHECK_STOP:
      return false;
    default:
      return state;
  }
};

const phoneNumberToCheck = (state = '', action) => {
  switch (action.type) {
    case types.PHONE_VERIFICATION_CHECK_START:
      return action.data;
    case types.PHONE_VERIFICATION_CHECK_STOP:
      return "";
    default:
      return state;
  }
};

export default combineReducers({
  isChangingPassword,
  isRequestingPhoneVerification,
  isCheckingPhoneVerification,
  isCheckingModalVisible,
  phoneNumberToCheck,
});

