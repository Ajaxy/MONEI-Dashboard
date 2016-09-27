import {Schema, arrayOf as ArrayOf} from 'normalizr';

export const customer = new Schema('customers', {idAttribute: 'email'});
export const arrayOfCustomers = new ArrayOf(customer);
