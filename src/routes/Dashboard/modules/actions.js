import * as api from 'lib/api';
import * as types from './types';
import {addMessage} from 'modules/messages/actions';
import {getIsInSandboxMode} from 'modules/profile/selectors';

export const fetchTransactionStats = () => {
  return async(dispatch, getState) => {
    dispatch({
      type: types.FETCH_DASHBOARD_REQUEST
    });
    try {
      const sandbox = getIsInSandboxMode(getState());
      const result = await api.fetchTransactionStats(sandbox);
      const {amountPerDay, countPerDay, totalAmount, totalCount, labels, from, to} = result;
      dispatch({
        type: types.FETCH_DASHBOARD_SUCCESS,
        amountPerDay,
        countPerDay,
        totalAmount,
        totalCount,
        labels,
        from,
        to
      });
    } catch (error) {
      dispatch({
        type: types.FETCH_DASHBOARD_FAIL
      });
      dispatch(addMessage({
        text: error,
        onRetry() {
          dispatch(fetchTransactionStats());
        }
      }));
    }
  };
};
