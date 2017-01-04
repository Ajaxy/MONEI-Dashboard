import React, {PropTypes} from 'react';
import Modal from 'components/Modal';
import Button from 'components/Button';
import {Table} from 'components/Table';
import {PAYMENT_TYPES} from 'lib/enums';
import {DATE_TIME_FORMAT_LONG} from 'lib/constants';
import {formatDate} from 'lib/utils';
import {getAmount, isFailed} from 'routes/Transactions/modules/utils';
import cx from 'classnames';
import classNames from './TransactionDetails.scss';
import Link from 'react-router/lib/Link';

const TransactionDetails = ({transaction, subAccount, isOpen, onClose, onPrint, isCustomerHidden = false}) => {
  const {
    customer = {},
    result = {},
    paymentType,
    currency,
    amount,
    card = {},
    billing = {}
  } = transaction;
  return (
    <Modal
      isOpen={isOpen}
      style="standard"
      size="small">
      <div className="header">Transaction details</div>
      <div className={cx('content', classNames.modalContent)}>
        <h4 className="ui header">Payment Details</h4>
        <Table className="definition">
          <tr>
            <td className="three wide">Amount</td>
            <td>{getAmount(paymentType, currency, amount, false)}</td>
          </tr>
          <tr>
            <td>ID</td>
            <td>{transaction.id}</td>
          </tr>
          {subAccount && <tr>
            <td>Sub account</td>
            <td>{subAccount.customName}</td>
          </tr>}
          <tr>
            <td>Date</td>
            <td>{formatDate(transaction.transactionTimestamp, DATE_TIME_FORMAT_LONG)}</td>
          </tr>
          <tr>
            <td>Type</td>
            <td>{PAYMENT_TYPES[paymentType]}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>
              {isFailed(result.code)
                ? <p className={classNames.noMarginBottom}>Failed <i className="remove icon red large" /></p>
                : <p className={classNames.noMarginBottom}>Paid <i className="checkmark icon green large" /></p>
              }
              <h5 className={cx('ui header', classNames.noMarginTop)}>
                <div className="sub header">{result.description}</div>
              </h5>
            </td>
          </tr>
        </Table>
        <h4 className="ui header">Card</h4>
        <Table className="definition">
          <tr>
            <td className="three wide">Name</td>
            <td>{card.holder}</td>
          </tr>
          <tr>
            <td>Bin</td>
            <td>{card.bin}</td>
          </tr>
          {(card.expiryMonth && card.expiryYear) && <tr>
            <td>Expires</td>
            <td>{`${card.expiryMonth}/${card.expiryYear}`}</td>
          </tr>}
          <tr>
            <td>Type</td>
            <td>{transaction.paymentBrand}</td>
          </tr>
        </Table>
        {!isCustomerHidden && <h4 className="ui header">Customer</h4>}
        {!isCustomerHidden && <Table className="definition">
          <tr>
            <td className="three wide">Name</td>
            <td>
              <Link to={`/customers/${transaction.customerId}`} onClick={onClose}>
                {customer.givenName ? `${customer.givenName} ${customer.surname || ''}` : customer.email}
              </Link>
            </td>
          </tr>
          <tr>
            <td>Email</td>
            <td>
              <a href={`mailto:${customer.email}`}>
                {customer.email}
              </a>
            </td>
          </tr>
          <tr>
            <td>IP</td>
            <td>{customer.ip}</td>
          </tr>
        </Table>}
        {!isCustomerHidden && <h4 className="ui header">Billing address</h4>}
        {!isCustomerHidden && <Table className="definition">
          <tr>
            <td className="three wide">Country</td>
            <td>{billing.country}</td>
          </tr>
          <tr>
            <td>State</td>
            <td>{billing.state}</td>
          </tr>
          <tr>
            <td>City</td>
            <td>{billing.city}</td>
          </tr>
          <tr>
            <td>Street</td>
            <td>{billing.street1}</td>
          </tr>
          <tr>
            <td>Zip Code</td>
            <td>{billing.postcode}</td>
          </tr>
        </Table>}
      </div>
      <div className="actions">
        <Button className="icon" onClick={onPrint}>
          <i className="print icon" />
        </Button>
        <Button onClick={onClose}>Close</Button>
      </div>
    </Modal>
  );
};

TransactionDetails.propTypes = {
  transaction: PropTypes.object.isRequired,
  subAccount: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onPrint: PropTypes.func.isRequired,
  isCustomerHidden: PropTypes.bool
};

export default TransactionDetails;
