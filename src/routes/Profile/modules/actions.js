import * as api from 'lib/api';
import * as types from './types';
import * as schemas from 'schema/users';
import {changePassword} from 'modules/auth/actions';
import {addMessage} from 'modules/messages/actions';

export const resetPassword = (email, password) => {
  return async dispatch => {
    dispatch({type: types.CHANGE_PASSWORD_REQUEST});
    try {
      await changePassword(email, password);
      dispatch({type: types.CHANGE_PASSWORD_SUCCESS});
      dispatch(addMessage({
        text: 'Please follow the instructions we sent to your email.',
        style: 'success',
      }));
    } catch(e) {
      dispatch({type: types.CHANGE_PASSWORD_FAIL});
      dispatch(addMessage({
        text: e.message,
        onRetry() {
          dispatch(resetPassword(email, password))
        }
      }));
    }
  };
};