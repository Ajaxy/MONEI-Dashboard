import * as api from 'lib/api';
import * as types from './types';
import * as schema from 'schema/channels';
import {PAGE_LIMIT} from 'lib/constants';
import {addMessage} from 'modules/messages/actions';
import {normalize} from 'normalizr';
import {getPage} from './selectors';
import {getIsInSandboxMode} from 'modules/profile/selectors';
import {getPageInfo, getPageDefaults} from 'lib/pagination';

export const fetchChannels = () => {
  return async(dispatch, getState) => {
    dispatch({type: types.FETCH_CHANNELS_REQUEST});
    try {
      const sandbox = getIsInSandboxMode(getState());
      const result = await api.fetchChannels(sandbox);
      const normalized = normalize(result, schema.arrayOfChannels);
      dispatch({
        type: types.FETCH_CHANNELS_SUCCESS,
        byId: normalized.entities.channels,
        ids: normalized.result,
      });
    } catch (error) {
      dispatch({
        type: types.FETCH_CHANNELS_FAIL
      });
      dispatch(addMessage({
        text: error,
        onRetry() {
          dispatch(fetchChannels());
        }
      }));
    }
  };
};
