import * as api from 'lib/api';
import * as types from './types';
import * as schema from 'schema/users';
import {addMessage} from 'modules/messages/actions';
import {normalize} from 'normalizr';
import {getIsUpToDate} from './selectors';
import {signOut} from 'modules/auth/actions';

export const fetchUser = (userId, forceRefresh = false) => {
  return async(dispatch, getState) => {
    const isUpToDate = getIsUpToDate(getState());
    if (isUpToDate && !forceRefresh) return;
    dispatch({type: types.FETCH_USER_REQUEST});
    try {
      const result = await api.fetchUser(userId);
      const normalized = normalize(result, schema.user);
      dispatch({
        type: types.FETCH_USER_SUCCESS,
        byId: normalized.entities.users,
        userId: normalized.result
      });
    } catch (error) {
      dispatch({
        type: types.FETCH_USER_FAIL
      });
      dispatch(addMessage({
        text: error,
        onRetry() {
          dispatch(fetchUser(userId));
        }
      }));
    }
  };
};

export const verifyUser = (userId) => {
  return async(dispatch, getState) => {
    dispatch({type: types.UPDATE_USER_REQUEST});
    try {
      const result = await api.verifyUser(userId);
      const normalized = normalize(result, schema.user);
      dispatch({
        type: types.UPDATE_USER_SUCCESS,
        byId: normalized.entities.users,
        userId: normalized.result
      });
      dispatch(addMessage({
        text: 'User was successfully verified',
        style: 'success'
      }));
    } catch (error) {
      dispatch({
        type: types.UPDATE_USER_FAIL
      });
      dispatch(addMessage({
        text: error,
        onRetry() {
          dispatch(loginAsUser(userId));
        }
      }));
    }
  };
};

export const loginAsUser = (userId) => {
  return async(dispatch, getState) => {
    dispatch({type: types.UPDATE_USER_REQUEST});
    try {
      const redirect_uri = window.location.origin;
      const result = await api.impersonateUser(userId, {redirect_uri});
      signOut();
      window.location.href = result;
    } catch (error) {
      dispatch(addMessage({
        text: error,
        onRetry() {
          dispatch(loginAsUser(userId));
        }
      }));
    }
  };
};

export const updateUser = (userId, {app_metadata, user_metadata}) => {
  return async dispatch => {
    dispatch({type: types.UPDATE_USER_REQUEST});
    try {
      const result = await api.updateUser(userId, {app_metadata, user_metadata});
      const normalized = normalize(result, schema.user);
      dispatch({
        type: types.UPDATE_USER_SUCCESS,
        byId: normalized.entities.users,
        userId: normalized.result
      });
      dispatch(addMessage({
        text: 'User was updated',
        style: 'success'
      }));
    } catch (error) {
      dispatch({
        type: types.UPDATE_USER_FAIL
      });
      dispatch(addMessage({
        text: error,
        onRetry() {
          dispatch(updateUser(userId, {app_metadata, user_metadata}));
        }
      }));
    }
  };
};


