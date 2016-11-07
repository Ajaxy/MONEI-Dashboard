import React, {PropTypes} from 'react';
import {PAYMENT_TYPES} from 'lib/enums';
import {formatDate} from 'lib/utils';
import {
  getAmount,
  isFailed,
  isRefund,
  getChannelName,
  getTimeStamp
} from 'routes/Transactions/modules/utils';
import cx from 'classnames';
import classNames from './TransactionRow.scss';

const TransactionRow = ({transaction, onClick, totalAmount = 0, isHeader = false, isFooter = false}) => {
  if (isHeader) {
    return (
      <tr>
        <th>Amount</th>
        <th>Status</th>
        <th>Type</th>
        <th>Customer Name</th>
        <th>Customer Email</th>
        <th>Channel</th>
        <th>Date</th>
      </tr>
    );
  } else if (isFooter) {
    return (
      <tr>
        <th colSpan={NUM_COLUMNS}><h3>{`${totalAmount.toFixed(2)} Total`}</h3></th>
      </tr>
    );
  } else {
    const {paymentType, currency, amount, result, customer, channelName, transactionTimestamp} = transaction;
    return (
      <tr
        onClick={e => onClick(transaction.id)}
        className={cx(classNames.row, {negative: isFailed(result.code), warning: isRefund(paymentType)})}
      >
        <td>{getAmount(paymentType, currency, parseFloat(amount))}</td>
        <td>
          {
            isFailed(result.code) ?
              <i className="remove icon red large" /> :
                <i className="checkmark icon green large" />
          }
        </td>
        <td>{PAYMENT_TYPES[transaction.paymentType]}</td>
        <td>{`${customer.givenName} ${customer.surname}`}</td>
        <td>
          <a href={`mailto:${customer.email}`} onClick={e => e.stopPropagation()}>
            {customer.email}
          </a>
        </td>
        <td>{getChannelName(channelName)}</td>
        <td>{formatDate(transactionTimestamp)}</td>
      </tr>
    );
  }
};

export const NUM_COLUMNS = 7;

export default TransactionRow;
