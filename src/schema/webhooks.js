import {Schema, arrayOf as ArrayOf} from 'normalizr';

export const webhooks = new Schema('webhooks', {idAttribute: 'id'});
export const arrayOfWebhooks = new ArrayOf(webhooks);
