import {Schema, arrayOf as ArrayOf} from 'normalizr';

export const message = new Schema('messages');
export const arrayOfMessages = new ArrayOf(message);

