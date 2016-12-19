import * as api from 'lib/api';
import * as types from './types';
import * as schema from 'schema/customers';
import {addMessage} from 'modules/messages/actions';
import {normalize} from 'normalizr';

export const fetchCustomer = (customerId) => {
  return async dispatch => {
    dispatch({type: types.FETCH_CUSTOMER_REQUEST});
    try {
      const result = await api.fetchCustomer(customerId);
      const normalized = normalize(result, schema.customer);
      dispatch({
        type: types.FETCH_CUSTOMER_SUCCESS,
        byId: normalized.entities.customers,
        customerId: normalized.result
      });
    } catch (error) {
      dispatch({
        type: types.FETCH_CUSTOMER_FAIL
      });
      dispatch(addMessage({
        text: error,
        onRetry() {
          dispatch(fetchCustomer(customerId));
        }
      }));
    }
  };
};
