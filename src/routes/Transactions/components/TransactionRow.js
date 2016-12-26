import React, {PropTypes} from 'react';
import {PAYMENT_TYPES} from 'lib/enums';
import {DATE_TIME_FORMAT_SIMPLE} from 'lib/constants';
import {formatDate} from 'lib/utils';
import {getAmount, isFailed, isRefund} from 'routes/Transactions/modules/utils';
import cx from 'classnames';

const TransactionRow = ({
  transaction,
  onClick,
  isHeader = false
}) => {
  if (isHeader) {
    return (
      <tr>
        <th width={90}>Amount</th>
        <th width={75}>Status</th>
        <th width={110}>Type</th>
        <th>Customer Name</th>
        <th>Customer Email</th>
        <th width={175}>Date</th>
      </tr>
    );
  } else {
    const {paymentType, currency, amount, result, customer, transactionTimestamp} = transaction;
    const customerName = `${customer.givenName} ${customer.surname}`;
    return (
      <tr
        onClick={e => onClick && onClick(transaction.id)}
        className={cx({negative: isFailed(result.code), warning: isRefund(paymentType)})}>
        <td>{getAmount(paymentType, currency, parseFloat(amount))}</td>
        <td>
          {isFailed(result.code)
            ? <i className="remove icon red large" />
            : <i className="checkmark icon green large" />}
        </td>
        <td>{PAYMENT_TYPES[transaction.paymentType]}</td>
        <td title={customerName}>{customerName}</td>
        <td>
          <a href={`mailto:${customer.email}`} onClick={e => e.stopPropagation()}>
            {customer.email}
          </a>
        </td>
        <td>{formatDate(transactionTimestamp, DATE_TIME_FORMAT_SIMPLE)}</td>
      </tr>
    );
  }
};

TransactionRow.propTypes = {
  transaction: PropTypes.object,
  onClick: PropTypes.func,
  isHeader: PropTypes.bool
};

export const NUM_COLUMNS = 6;

export default TransactionRow;
