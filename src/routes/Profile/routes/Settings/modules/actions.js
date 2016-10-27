import * as api from 'lib/api';
import * as types from './types';
import {changePassword} from 'modules/auth/actions';
import {addMessage} from 'modules/messages/actions';
import {updateProfile} from 'modules/profile/actions';

export const resetPassword = (email, password) => {
  return async dispatch => {
    dispatch({type: types.CHANGE_PASSWORD_REQUEST});
    try {
      await changePassword(email, password);
      dispatch({
        type: types.CHANGE_PASSWORD_SUCCESS
      });
      dispatch(addMessage({
        text: 'Please follow the instructions we sent to your email.',
        style: 'success',
      }));
    } catch (e) {
      dispatch({
        type: types.CHANGE_PASSWORD_FAIL
      });
      dispatch(addMessage({
        text: e.message,
        onRetry() {
          dispatch(resetPassword(email, password))
        }
      }));
    }
  };
};

export const verifyPhoneNumber = (phoneNumber) => {
  return async dispatch => {
    dispatch({
      type: types.PHONE_VERIFICATION_REQUEST
    });
    try {
      const result = await api.verifyPhoneStart(phoneNumber);
      dispatch({
        type: types.PHONE_VERIFICATION_SUCCESS
      });
      dispatch(openCheckingModal(phoneNumber));
    } catch (error) {
      dispatch({
        type: types.PHONE_VERIFICATION_FAIL
      });
      dispatch(addMessage({
        type: error,
        onRetry() {
          dispatch(verifyPhoneNumber(phoneNumber))
        }
      }));
    }
  };
};

export const checkPhoneNumber = (phoneNumber, verificationCode) => {
  return async dispatch => {
    dispatch({
      type: types.PHONE_VERIFICATION_CHECK_REQUEST
    });
    try {
      const result = await api.verifyPhoneCheck(phoneNumber, verificationCode);
      const profile = storage.get('profile');
      profile.app_metadata.phone_number = phoneNumber;
      dispatch(updateProfile(profile));
      dispatch({
        type: types.PHONE_VERIFICATION_CHECK_SUCCESS
      });
      dispatch(closeCheckingModal());
    } catch (error) {
      dispatch({
        type: types.PHONE_VERIFICATION_CHECK_FAIL
      });
      dispatch(addMessage({
        type: error,
        onRetry() {
          dispatch(checkPhoneNumber(phoneNumber))
        }
      }));
    }
  };
};

export const openCheckingModal = (phoneNumber) => {
  return {
    type: types.PHONE_VERIFICATION_CHECK_START,
    data: phoneNumber
  };
};

export const closeCheckingModal = () => {
  return {
    type: types.PHONE_VERIFICATION_CHECK_STOP
  };
};
