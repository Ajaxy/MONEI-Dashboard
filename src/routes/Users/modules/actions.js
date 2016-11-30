import * as api from 'lib/api';
import * as types from './types';
import * as schema from 'schema/users';
import {addMessage} from 'modules/messages/actions';
import {normalize} from 'normalizr';

const PAGE_LIMIT = 50;

export const fetchUsers = (page = 1, filter = null) => {
  return async dispatch => {
    dispatch({type: types.FETCH_USERS_REQUEST});
    try {
      const result = await api.fetchUsers({limit: PAGE_LIMIT, page, filter});
      const normalized = normalize(result.users, schema.arrayOfUsers);
      dispatch({
        type: types.FETCH_USERS_SUCCESS,
        byId: normalized.entities.users,
        ids: normalized.result,
        page: {
          currentPage: page,
          lastPage: Math.ceil(result.total / (result.limit * 1.0)),
          filter
        }
      });
    } catch (error) {
      dispatch({
        type: types.FETCH_USERS_FAIL
      });
      dispatch(addMessage({
        text: error,
        onRetry() {
          dispatch(fetchUsers(pageNumber, filter, forceRefresh));
        }
      }));
    }
  };
};
