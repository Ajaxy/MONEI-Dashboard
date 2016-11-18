import {Schema, arrayOf as ArrayOf} from 'normalizr';

export const subAccounts = new Schema('subAccounts', {idAttribute: 'channelId'});
export const arrayOfSubAccounts = new ArrayOf(subAccounts);
