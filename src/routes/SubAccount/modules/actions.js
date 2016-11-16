import * as types from './types';
import * as api from 'lib/api';
import {copyTextToClipboard} from 'lib/utils';
import {addMessage} from 'modules/messages/actions';

export const copyToClipboard = (text, name) => dispatch => {
  copyTextToClipboard(text);
  dispatch(addMessage({
    text: `${name} copied to clipboard`,
    style: 'success'
  }));
};

export const selectPlatform = (platform = 0) => ({
  type: types.UPDATE_SELECTED_PLATFORM,
  platform
});

export const createZapierToken = (channelId) => {
  return async dispatch => {
    dispatch({type: types.CREATE_ZAPIER_TOKEN_REQUEST});
    try {
      const token = await api.createZapierApiToken(channelId);
      dispatch({
        type: types.CREATE_ZAPIER_TOKEN_SUCCESS,
        token
      });
    } catch (error) {
      dispatch({type: types.CREATE_ZAPIER_TOKEN_FAIL});
      dispatch(addMessage({
        text: error,
        onRetry() {
          dispatch(createZapierToken(channelId));
        }
      }));
    }
  };
};
