import * as api from 'lib/api';
import * as types from './types';
import * as schema from 'schema/users';
import {PAGE_LIMIT} from 'lib/constants';
import {addMessage} from 'modules/messages/actions';
import {normalize} from 'normalizr';

export const fetchUsers = ({page, email, limit = PAGE_LIMIT}) => {
  return async dispatch => {
    dispatch({type: types.FETCH_USERS_REQUEST});
    try {
      const users = await api.fetchUsers({page, email, limit});
      const normalized = normalize(users.items, schema.arrayOfUsers);
      dispatch({
        type: types.FETCH_USERS_SUCCESS,
        byId: normalized.entities.users,
        ids: normalized.result,
        nextPage: users.nextPage,
        prevPage: users.prevPage,
        email
      });
    } catch (error) {
      dispatch({
        type: types.FETCH_USERS_FAIL
      });
      dispatch(addMessage({
        text: error,
        onRetry() {
          dispatch(fetchUsers({page, email, limit}));
        }
      }));
    }
  };
};
