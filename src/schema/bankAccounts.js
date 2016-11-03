import {Schema, arrayOf as ArrayOf} from 'normalizr';

export const bankAccounts = new Schema('bankAccounts', {idAttribute: 'id'});
export const arrayOfBankAccounts = new ArrayOf(bankAccounts);
