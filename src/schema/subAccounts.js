import {Schema, arrayOf as ArrayOf} from 'normalizr';

export const subAccounts = new Schema('subAccounts');
export const arrayOfSubAccounts = new ArrayOf(subAccounts);
