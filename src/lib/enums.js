export const USER_ROLES = Object.freeze({
  User: 0,
  Admin: 1,
  Acquirer: 2
});

export const USER_STATUSES = Object.freeze([
  'pending_info',
  'pending_validation',
  'validated',
  'non_spanish',
  'other'
]);

export const USER_ACQUIRERS = Object.freeze({
  BS: 'Banco Sabadell',
  BBVA: 'BBVA',
  EVO: 'EVO Payments',
  PP: 'Popular Payments',
  TA: 'Technoactivity'
});

export const PAYMENT_TYPES = Object.freeze({
  DB: 'Debit Card',
  RF: 'Refund',
  PA: 'Preauthorisation',
  CP: 'Capture',
  CD: 'Credit Card',
  RV: 'Reversal',
  RB: 'Rebill',
  CB: 'Chargeback',
  RC: 'Receipt'
});
