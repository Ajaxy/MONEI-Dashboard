import {Schema, arrayOf as ArrayOf} from 'normalizr';

export const user = new Schema('users', {idAttribute: 'user_id'});
export const arrayOfUsers = new ArrayOf(user);
