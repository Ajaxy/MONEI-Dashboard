import * as api from 'lib/api';
import * as types from './types';
import * as schema from 'schema/users';
import {addMessage} from 'modules/messages/actions';
import {normalize} from 'normalizr';

export const fetchUsers = (params = {}) => {
  return async dispatch => {
    dispatch({type: types.FETCH_USERS_REQUEST});
    try {
      const users = await api.fetchUsers(params);
      const normalized = normalize(users.items, schema.arrayOfUsers);
      dispatch({
        type: types.FETCH_USERS_SUCCESS,
        byId: normalized.entities.users,
        ids: normalized.result,
        nextPage: users.nextPage,
        prevPage: users.prevPage
      });
    } catch (error) {
      dispatch({
        type: types.FETCH_USERS_FAIL
      });
      dispatch(addMessage({
        text: error,
        onRetry() {
          dispatch(fetchUsers(params));
        }
      }));
    }
  };
};
