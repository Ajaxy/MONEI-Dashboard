import * as api from 'lib/api';
import * as types from './types';
import * as schema from 'schema/users';
import {PAGE_LIMIT} from 'lib/constants';
import {addMessage} from 'modules/messages/actions';
import {normalize} from 'normalizr';
import {getPage} from './selectors';
import {getPageInfo, getPageDefaults} from 'lib/pagination';

export const fetchUsers = (page = 1, filter = null, forceRefresh = false) => {
  return async(dispatch, getState) => {
    const previous = getPage(getState());
    if (page > previous.lastPage) return;

    dispatch({type: types.FETCH_USERS_REQUEST});
    if (!forceRefresh && (filter === previous.filter && page < previous.furthestPage)) {
      // either the page is already up to date or it's beyond the maximum page
      // so we just increment the current page
      const start = Object.assign({}, previous, {start: (page - 1) * PAGE_LIMIT});
      const currentPage = getPageInfo(start, previous, {filter});
      dispatch({
        type: types.FETCH_USERS_SUCCESS,
        page: currentPage
      });
      return;
    }

    if (filter !== previous.filter) {
      dispatch({
        type: types.CLEAR_USERS,
        page: getPageDefaults()
      });
    }

    try {
      const result = await api.fetchUsers({limit: PAGE_LIMIT, page, filter});
      const normalized = normalize(result.users, schema.arrayOfUsers);
      const currentPage = getPageInfo(result, previous, {filter});
      dispatch({
        type: types.FETCH_USERS_SUCCESS,
        byId: normalized.entities.users,
        ids: normalized.result,
        page: currentPage
      });
    } catch (error) {
      dispatch({
        type: types.FETCH_USERS_FAIL
      });
      dispatch(addMessage({
        text: error,
        onRetry() {
          dispatch(fetchUsers(page, filter, forceRefresh));
        }
      }));
    }
  };
};
