import * as types from './types';
import * as customerTypes from 'routes/Dashboard/modules/types';
import {mergeArrays} from 'lib/utils';
import {combineReducers} from 'redux';
export const stateKey = 'dashboard';
import moment from 'moment';

const amountPerDay = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_DASHBOARD_SUCCESS:
      return action.amountPerDay.map(amount => parseFloat(amount));
    case types.FETCH_DASHBOARD_REQUEST:
    case types.FETCH_DASHBOARD_FAIL:
      return [];
    default:
      return state;
  }
};

const countPerDay = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_DASHBOARD_SUCCESS:
      return action.countPerDay.map(count => parseInt(count));
    case types.FETCH_DASHBOARD_REQUEST:
    case types.FETCH_DASHBOARD_FAIL:
      return [];
    default:
      return state;
  }
};

const totalAmount = (state = 0, action) => {
  switch (action.type) {
    case types.FETCH_DASHBOARD_SUCCESS:
      return parseInt(action.totalAmount);
    case types.FETCH_DASHBOARD_REQUEST:
    case types.FETCH_DASHBOARD_FAIL:
      return 0;
    default:
      return state;
  }
};

const totalCount = (state = 0, action) => {
  switch (action.type) {
    case types.FETCH_DASHBOARD_SUCCESS:
      return parseInt(action.totalCount);
    case types.FETCH_DASHBOARD_REQUEST:
    case types.FETCH_DASHBOARD_FAIL:
      return 0;
    default:
      return state;
  }
};

const startDate = (state = '', action) => {
  switch (action.type) {
    case types.FETCH_DASHBOARD_SUCCESS:
      return moment(action.from).format('DD MMM YYYY');
    case types.FETCH_DASHBOARD_REQUEST:
    case types.FETCH_DASHBOARD_FAIL:
      return '';
    default:
      return state;
  }
};

const endDate = (state = '', action) => {
  switch (action.type) {
    case types.FETCH_DASHBOARD_SUCCESS:
      return moment(action.to).format('DD MMM YYYY');
    case types.FETCH_DASHBOARD_REQUEST:
    case types.FETCH_DASHBOARD_FAIL:
      return '';
    default:
      return state;
  }
};

const labels = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_DASHBOARD_SUCCESS:
      return action.labels.map(date => moment(date).format('Do MMM'));
    case types.FETCH_DASHBOARD_REQUEST:
    case types.FETCH_DASHBOARD_FAIL:
      return [];
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case types.FETCH_DASHBOARD_REQUEST:
      return true;
    case types.FETCH_DASHBOARD_SUCCESS:
    case types.FETCH_DASHBOARD_FAIL:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  isFetching,
  amountPerDay,
  countPerDay,
  totalAmount,
  totalCount,
  startDate,
  endDate,
  labels
});

