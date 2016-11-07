import moment from 'moment';

//! TODO: Move these utility functions to a model class or something.
// Maybe we can add helper methods to normalizr schema.

export const isFailed = (code) => {
  return !(/^(000\.000\.|000\.100\.1|000\.[36])/.test(code) ||
    /^(000\.400\.0|000\.400\.100)/.test(code));
};

export const isRefund = (paymentType) => {
  return paymentType === 'RF' || paymentType === 'CB';
};

export const isIncome = (code, paymentType) => {
  return (
      paymentType === 'DB' ||
      paymentType === 'CD' ||
      paymentType === 'RB' ||
      paymentType === 'CP'
    ) && !isFailed(code);
};

export const getCurrencySymbol = (currency) => {
  let symbol;
  switch (currency) {
    case 'EUR':
      symbol = '€';
      break;
    case 'USD':
      symbol = '$';
      break;
    default:
      symbol = '';
  }
  return symbol;
};

export const getAmount = (paymentType, currency, amount, showNegative = true) => {
  let formatted = getCurrencySymbol(currency) + (isNaN(amount) ? 'N/A' : amount);
  if (showNegative && isRefund(paymentType))
    { formatted = '-' + formatted; }
  return formatted;
};

export const getChannelName = (channel) => {
  return channel ? channel.match(/^[a-zA-Z0-9]+/g)[0] : '';
};
