import {createSelector} from 'reselect';
import {stateKey} from './reducer';

const profileSelector = state => state[stateKey];

export const getIsChangingPassword = createSelector(
  profileSelector,
  profile => profile.isChangingPassword
);