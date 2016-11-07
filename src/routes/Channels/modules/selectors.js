import {createSelector} from 'reselect';
import {stateKey} from './reducer';
import {PAGE_LIMIT} from 'lib/constants';

const channelsSelector = state => state[stateKey];
const activeChannelIdSelector = state => state.router.params.channelId;
export const getChannels = createSelector(
  channelsSelector,
  channels => channels.ids.map(id => channels.byId[id]).slice(0, PAGE_LIMIT)
);

export const getChannelIds = createSelector(
  channelsSelector,
  channels => channels.ids
);

export const getActiveChannel = createSelector(
  channelsSelector,
  activeChannelIdSelector,
  (channels, channelId) => channels.byId[channelId] || {}
);

export const getIsFetching = createSelector(
  channelsSelector,
  channels => channels.isFetching
);
