import * as api from 'lib/api';
import * as types from './types';
import * as schema from 'schema/customers';
import {PAGE_LIMIT} from 'lib/constants';
import {addMessage} from 'modules/messages/actions';
import {normalize} from 'normalizr';
import {getIsUpToDate, getCampaignIds, getPages} from './selectors';
import {push} from 'react-router-redux';

export const fetchCustomers = (page, forceRefresh = false) => {
  return async(dispatch, getState) => {
    const isUpToDate = getIsUpToDate(getState());
    if (isUpToDate && !forceRefresh) return;
    dispatch({
      type: types.FETCH_CUSTOMERS_REQUEST
    });
    try {
      const customers = await api.fetchCustomers({
        limit: PAGE_LIMIT,
        page,
      });
      const normalized = normalize(customers.items, schema.arrayOfCustomers);
      dispatch({
        type: types.FETCH_CUSTOMERS_SUCCESS,
        byId: normalized.entities.customers,
        ids: normalized.result,
        nextPage: customers.nextPage,
        prevPage: customers.prevPage
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
