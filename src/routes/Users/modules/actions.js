import * as api from 'lib/api';
import * as types from './types';
import * as schema from 'schema/users';
import {PAGE_LIMIT} from 'lib/constants';
import {addMessage} from 'modules/messages/actions';
import {normalize} from 'normalizr';
import {getPage} from './selectors';

export const fetchUsers = (page = 1, filter = null, forceRefresh = false) => {
  return async(dispatch, getState) => {
    dispatch({type: types.FETCH_USERS_REQUEST});
    const pageState = getPage(getState());
    const pageStart = (page-1) * PAGE_LIMIT;

    if (!forceRefresh && (filter === pageState.filter && pageStart < pageState.lastLoaded)) {
      // either the page is already up to date or it's beyond the maximum page
      // so we just increment the current page
      dispatch({
        type: types.FETCH_USERS_SUCCESS,
        start: pageStart,
        end: pageStart + pageState.length,
        total: pageState.total,
        length: pageState.length,
        limit: pageState.limit,
        byId: {},
        ids: [],
        page,
        filter,
      });
      return;
    }

    if(filter !== pageState.filter) {
      dispatch({type: types.CLEAR_USERS});
    }

    try {
      const result = await api.fetchUsers({limit: PAGE_LIMIT, page, filter});
      const normalized = normalize(result.users, schema.arrayOfUsers);
      dispatch({
        type: types.FETCH_USERS_SUCCESS,
        byId: normalized.entities.users,
        ids: normalized.result,
        start: result.start,
        end: result.start + result.length,
        total: result.total,
        length: result.length,
        limit: result.limit,
        page,
        filter,
      });
    } catch (error) {
      dispatch({
        type: types.FETCH_USERS_FAIL
      });
      dispatch(addMessage({
        text: error,
        onRetry() {
          dispatch(fetchUsers(page, true));
        }
      }));
    }
  };
};
