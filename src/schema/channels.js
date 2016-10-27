import {Schema, arrayOf as ArrayOf} from 'normalizr';

export const channels = new Schema('channels', {idAttribute: 'channel'});
export const arrayOfChannels = new ArrayOf(channels);
