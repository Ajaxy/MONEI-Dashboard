import * as types from './types';
import * as schema from 'schema/messages';
import {getMessages} from './selectors';
import {normalize} from 'normalizr';

let nId = 0;
export const addMessage = (props = {}) => {
  return (dispatch, getState) => {
    const activeMessages = getMessages(getState());
    if (activeMessages.some(msg => msg.text === props.text)) {
      return;
    }
    const message = {
      id: nId,
      delay: 3000,
      style: 'error',
      ...props
    };
    setTimeout(() => {
      dispatch(removeMessage(message.id));
    }, message.delay);
    const normalized = normalize(message, schema.message);
    dispatch({
      type: types.ADD_MESSAGE,
      byId: normalized.entities.messages,
      messageId: normalized.result
    });
    nId++;
  };
};

export const removeMessage = (messageId) => ({
  type: types.REMOVE_MESSAGE,
  messageId
});

