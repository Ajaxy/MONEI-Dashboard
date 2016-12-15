export const USER_ROLES = Object.freeze({
  User: 'user',
  Admin: 'admin',
  Acquirer: 'acquirer'
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
  UP: 'Universalpay'
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
