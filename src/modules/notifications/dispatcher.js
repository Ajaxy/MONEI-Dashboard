import {signOut} from 'modules/auth/actions';
import {addMessage} from 'modules/messages/actions';
import {updateProfile} from '../profile/actions';
import * as types from './types';

export default dispatch => action => {
  if (__DEV__) {
    console.info('Action from server => ', action);
  }
  switch (action.type) {
    case types.BAN_USER:
      dispatch(signOut());
      dispatch(addMessage({
        text: 'You have been banned. Please contact support'
      }));
      return;
    case types.SHOW_MESSAGE:
      dispatch(addMessage(action.message));
      return;
    case types.UPDATE_PROFILE:
      dispatch(updateProfile(action.data));
      return;
  }
};
