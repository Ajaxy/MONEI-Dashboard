import * as api from 'lib/api';
import * as types from './types';
import * as schema from 'schema/transactions';
import {PAGE_LIMIT} from 'lib/constants';
import {addMessage} from 'modules/messages/actions';
import {normalize} from 'normalizr';
import {getIsUpToDate, getCampaignIds, getPages} from './selectors';
import {push} from 'react-router-redux';

export const fetchTransactions = (page, forceRefresh = false) => {
  return async(dispatch, getState) => {
    const isUpToDate = getIsUpToDate(getState());
    if (isUpToDate && !forceRefresh) return;
    dispatch({
      type: types.FETCH_TRANSACTIONS_REQUEST
    });
    try {
      const transactions = await api.fetchTransactions({
        limit: PAGE_LIMIT,
        page,
      });
      console.log(transactions);
      const normalized = normalize(transactions.items, schema.arrayOfTransactions);
      dispatch({
        type: types.FETCH_TRANSACTIONS_SUCCESS,
        byId: normalized.entities.transactions,
        ids: normalized.result,
        nextPage: transactions.nextPage,
        prevPage: transactions.prevPage
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: types.FETCH_TRANSACTIONS_FAIL
      });
      dispatch(addMessage({
        text: error,
        onRetry() {
          dispatch(fetchTransactions(page, true));
        }
      }));
    }
  };
};
