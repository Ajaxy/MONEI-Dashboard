import * as api from 'lib/api';
import * as types from './types';
import {addMessage} from 'modules/messages/actions';

export const fetchTransactionStats = () => {
  return async dispatch => {
    dispatch({
      type: types.FETCH_DASHBOARD_REQUEST
    });
    try {
      const result = await api.fetchTransactionStats();
      const {amountPerDay, countPerDay, totalAmount, totalCount, labels, from, to} = result;
      dispatch({
        type: types.FETCH_DASHBOARD_SUCCESS,
        amountPerDay,
        countPerDay,
        totalAmount,
        totalCount,
        labels,
        from,
        to,
      });
    } catch (error) {
      dispatch({
        type: types.FETCH_DASHBOARD_FAIL
      });
      dispatch(addMessage({
        text: error,
        onRetry() {
          dispatch(fetchTransactionStats())
        }
      }));
    }
  }
};
