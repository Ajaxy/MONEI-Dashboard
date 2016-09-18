import {Schema, arrayOf as ArrayOf} from 'normalizr';

export const transaction = new Schema('transactions');
export const arrayOfTransactions = new ArrayOf(transaction);
