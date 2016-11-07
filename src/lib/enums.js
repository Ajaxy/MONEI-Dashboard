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
  '': null,
  Banco_Sabadell: 'BS',
  BBVA: 'BBVA',
  EVO_Payments: 'EVO',
  Popular_Payments: 'PP',
  Technoactivity: 'TA'
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
