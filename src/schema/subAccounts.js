import {Schema, arrayOf as ArrayOf} from 'normalizr';

export const subAccount = new Schema('subAccounts');
export const arrayOfSubAccounts = new ArrayOf(subAccount);
