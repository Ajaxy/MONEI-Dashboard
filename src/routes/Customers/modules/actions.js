import * as api from 'lib/api';
import * as types from './types';
import * as schema from 'schema/customers';
import {PAGE_LIMIT} from 'lib/constants';
import {addMessage} from 'modules/messages/actions';
import {normalize} from 'normalizr';
import {getPage} from './selectors';
import {getPageInfo, getPageDefaults} from 'lib/pagination';

export const fetchCustomers = (page, filter = null, forceRefresh = false) => {
  return async(dispatch, getState) => {
    const previous = getPage(getState());

    // start from first page so clear all customers in the list
    if(!page || filter !== previous.filter || forceRefresh) {
      dispatch({type: types.CLEAR_CUSTOMERS});
    }

    dispatch({type: types.FETCH_CUSTOMERS_REQUEST});
    try {
      const result = await api.fetchCustomers({limit: PAGE_LIMIT, page, filter});
      const normalized = normalize(result.items, schema.arrayOfCustomers);
      dispatch({
        type: types.FETCH_CUSTOMERS_SUCCESS,
        byId: normalized.entities.customers,
        ids: normalized.result,
        nextPage: result.nextPage,
        length: normalized.result.length,
        filter,
      });
    } catch (error) {
      dispatch({
        type: types.FETCH_CUSTOMERS_FAIL
      });
      dispatch(addMessage({
        text: error,
        onRetry() {
          dispatch(fetchCustomers(page, true));
        }
      }));
    }
  };
};
