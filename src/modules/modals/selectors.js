import {createSelector} from 'reselect';
import {stateKey} from './reducer';

const modalsSelector = state => state[stateKey];
export const getModals = createSelector(
  modalsSelector,
  modals => modals.ids.map(id => modals.byId[id])
);
