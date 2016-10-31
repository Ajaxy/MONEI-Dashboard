import {Schema, arrayOf as ArrayOf} from 'normalizr';

export const modal = new Schema('modals');
export const arrayOfModals = new ArrayOf(modal);

