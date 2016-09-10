import * as api from 'lib/api';
import * as types from './types';
import {addMessage} from 'modules/messages/actions';

export const fetchProfile = () => {
  return async dispatch => {
    dispatch({
      type: types.FETCH_PROFILE_REQUEST
    });
    try {
      const data = await api.fetchAccount();
      dispatch({
        type: types.FETCH_PROFILE_SUCCESS,
        data
      });
      window.Intercom('update', data);
      return data;
    } catch (error) {
      dispatch({
        type: types.FETCH_PROFILE_FAIL
      });
      dispatch(addMessage({text: error}));
    }
  };
};

export const updateProfile = (data) => ({
  type: types.UPDATE_PROFILE,
  data
});
