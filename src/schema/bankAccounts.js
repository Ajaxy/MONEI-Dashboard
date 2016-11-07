import {Schema, arrayOf as ArrayOf} from 'normalizr';

export const bankAccount = new Schema('bankAccounts');
export const arrayOfBankAccounts = new ArrayOf(bankAccount);
