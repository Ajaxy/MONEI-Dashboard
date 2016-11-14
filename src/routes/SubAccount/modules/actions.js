import {copyTextToClipboard} from 'lib/utils';
import {addMessage} from 'modules/messages/actions';

export const copyToClipboard = (text, name) => dispatch => {
  copyTextToClipboard(text);
  dispatch(addMessage({
    text: `${name} copied to clipboard`,
    style: 'success'
  }));
};
