import * as api from 'lib/api';
import * as types from './types';
import * as schema from 'schema/customers';
import {PAGE_LIMIT} from 'lib/constants';
import {addMessage} from 'modules/messages/actions';
import {normalize} from 'normalizr';

export const fetchCustomers = ({page, email, limit = PAGE_LIMIT, forceRefresh = false} = {}) => {
  return async dispatch => {
    if (forceRefresh) {
      dispatch({type: types.CLEAR_CUSTOMERS});
    }
    dispatch({type: types.FETCH_CUSTOMERS_REQUEST});
    try {
      const customers = await api.fetchCustomers({limit, page, email});
      const normalized = normalize(customers.items, schema.arrayOfCustomers);
      dispatch({
        type: types.FETCH_CUSTOMERS_SUCCESS,
        byId: normalized.entities.customers,
        ids: normalized.result,
        nextPage: customers.nextPage,
        prevPage: customers.prevPage,
        email
      });
    } catch (error) {
      dispatch({
        type: types.FETCH_CUSTOMERS_FAIL
      });
      dispatch(addMessage({
        text: error,
        onRetry() {
          dispatch(fetchCustomers({limit, page, email, forceRefresh}));
        }
      }));
    }
  };
};
