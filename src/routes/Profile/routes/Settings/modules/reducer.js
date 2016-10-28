import * as types from './types';
import {combineReducers} from 'redux';

export const stateKey = 'profileSettings';

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

const phoneNumber = (state = null, action) => {
  switch (action.type) {
    case types.PHONE_VERIFICATION_START_SUCCESS:
      return action.phoneNumber;
    default:
      return state;
  }
};

const isPhoneVerificationStarted = (state = false, action) => {
  switch (action.type) {
    case types.PHONE_VERIFICATION_START_SUCCESS:
      return true;
    case types.PHONE_VERIFICATION_CHECK_CANCEL:
    case types.PHONE_VERIFICATION_CHECK_SUCCESS:
      return false;
    default:
      return state;
  }
};

const isEditingPhone = (state = false, action) => {
  switch (action.type) {
    case types.PHONE_EDIT_START:
      return true;
    case types.PHONE_EDIT_CANCEL:
    case types.PHONE_VERIFICATION_CHECK_SUCCESS:
      return false;
    default:
      return state;
  }
};

const isVerifying = (state = false, action) => {
  switch (action.type) {
    case types.PHONE_VERIFICATION_START_REQUEST:
      return true;
    case types.PHONE_VERIFICATION_START_SUCCESS:
    case types.PHONE_VERIFICATION_START_FAIL:
      return false;
    default:
      return state;
  }
};

const isCheckingCode = (state = false, action) => {
  switch (action.type) {
    case types.PHONE_VERIFICATION_CHECK_REQUEST:
      return true;
    case types.PHONE_VERIFICATION_CHECK_SUCCESS:
    case types.PHONE_VERIFICATION_CHECK_FAIL:
    case types.PHONE_VERIFICATION_CHECK_CANCEL:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  isChangingPassword,
  isPhoneVerificationStarted,
  isVerifying,
  isCheckingCode,
  isEditingPhone,
  phoneNumber
});

