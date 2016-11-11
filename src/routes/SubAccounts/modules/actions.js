import * as api from 'lib/api';
import * as types from './types';
import * as schema from 'schema/subAccounts';
import {addMessage} from 'modules/messages/actions';
import {normalize} from 'normalizr';
import {getIsUpToDate} from './selectors';
import {getIsInSandboxMode} from 'modules/profile/selectors';

export const fetchSubAccounts = () => {
  return async(dispatch, getState) => {
    const isUpToDate = getIsUpToDate(getState());
    if (isUpToDate) return;
    dispatch({type: types.FETCH_SUB_ACCOUNTS_REQUEST});
    try {
      const sandbox = getIsInSandboxMode(getState());
      const result = await api.fetchSubAccounts(sandbox);
      const normalized = normalize(result, schema.arrayOfSubAccounts);
      dispatch({
        type: types.FETCH_SUB_ACCOUNTS_SUCCESS,
        byId: normalized.entities.subAccounts,
        ids: normalized.result
      });
    } catch (error) {
      dispatch({
        type: types.FETCH_SUB_ACCOUNTS_FAIL
      });
      dispatch(addMessage({
        text: error,
        onRetry() {
          dispatch(fetchSubAccounts());
        }
      }));
    }
  };
};
