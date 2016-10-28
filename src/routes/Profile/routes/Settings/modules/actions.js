import * as api from 'lib/api';
import * as types from './types';
import storage from 'store';
import {getPhoneNumber} from './selectors';
import {changePassword} from 'modules/auth/actions';
import {addMessage} from 'modules/messages/actions';
import {updateProfile} from 'modules/profile/actions';
import {getUserId} from 'modules/profile/selectors';

export const updateUserMetaData = (data) => {
  console.log(data);
  return async (dispatch, getState) => {
    const userId = getUserId(getState());
    dispatch({
      type: types.UPDATE_USER_METADATA_REQUEST
    });
    try {
      const user = await api.updateUserMetaData(userId, data);
      dispatch(updateProfile(user));
      dispatch({
        type: types.UPDATE_USER_METADATA_SUCCESS
      });
      dispatch(addMessage({
        style: 'success',
        text: 'Your settings have been successfully updated'
      }));
    } catch (error) {
      dispatch({
        type: types.UPDATE_USER_METADATA_FAIL
      });
      dispatch(addMessage({text: error}));
    }
  };
};

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

export const phoneEditStart = () => ({
  type: types.PHONE_EDIT_START
});

export const phoneEditCancel = () => ({
  type: types.PHONE_EDIT_CANCEL
});

export const phoneVerificationStart = ({phoneNumber}) => {
  return async dispatch => {
    dispatch({
      type: types.PHONE_VERIFICATION_START_REQUEST
    });
    try {
      await api.phoneVerificationStart({phoneNumber});
      dispatch({
        type: types.PHONE_VERIFICATION_START_SUCCESS,
        phoneNumber
      });
      dispatch(addMessage({
        style: 'success',
        text: 'You should receive SMS with verification code'
      }));
    } catch (error) {
      dispatch({
        type: types.PHONE_VERIFICATION_START_FAIL
      });
      dispatch(addMessage({text: error}));
    }
  };
};

export const phoneVerificationCancel = () => ({
  type: types.PHONE_VERIFICATION_CHECK_CANCEL
});

export const phoneVerificationCheck = ({verificationCode}) => {
  return async (dispatch, getState) => {
    const phoneNumber = getPhoneNumber(getState());
    dispatch({
      type: types.PHONE_VERIFICATION_CHECK_REQUEST
    });
    try {
      const result = await api.phoneVerificationCheck({
        phoneNumber,
        verificationCode
      });
      const profile = storage.get('profile');
      profile.app_metadata.phone_number = phoneNumber;
      dispatch(updateProfile(profile));
      dispatch({
        type: types.PHONE_VERIFICATION_CHECK_SUCCESS
      });
      dispatch(addMessage({
        style: 'success',
        text: 'Your phone has been successfully verified'
      }));
    } catch (error) {
      dispatch({
        type: types.PHONE_VERIFICATION_CHECK_FAIL
      });
      dispatch(addMessage({text: error}));
    }
  };
};
