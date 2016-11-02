import * as api from 'lib/api';
import * as types from './types';
import {updateProfile, updateProfileLocally} from 'modules/profile/actions';
import {getUserId, getProfile, getIsAdmin} from 'modules/profile/selectors';
import {addMessage} from 'modules/messages/actions';

export const addBankAccountStart = () => ({
  type: types.ADD_BANK_ACCOUNT_START
});

export const addBankAccountCancel = () => ({
  type: types.ADD_BANK_ACCOUNT_CANCEL
});

export const addBankAccount = (data) => {
  return async (dispatch, getState) => {
    const userId = getUserId(getState());
    dispatch({
      type: types.ADD_BANK_ACCOUNT_REQUEST
    });
    try {
      const user = await api.updateUserMetaData(userId, data);
      dispatch(updateProfileLocally(user));
      dispatch({
        type: types.ADD_BANK_ACCOUNT_SUCCESS
      });
      dispatch(addMessage({
        style: 'success',
        text: 'Your bank account has been successfully added'
      }));
    } catch (error) {
      dispatch({
        type: types.ADD_BANK_ACCOUNT_FAIL
      });
      dispatch(addMessage({text: error}));
    }
  };
};
