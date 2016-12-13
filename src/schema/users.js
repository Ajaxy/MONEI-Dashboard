import {Schema, arrayOf as ArrayOf} from 'normalizr';

export const user = new Schema('users');
export const arrayOfUsers = new ArrayOf(user);
