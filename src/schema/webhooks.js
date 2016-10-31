import {Schema, arrayOf as ArrayOf} from 'normalizr';

export const webhook = new Schema('webhooks', {idAttribute: 'id'});
export const arrayOfWebhooks = new ArrayOf(webhook);
