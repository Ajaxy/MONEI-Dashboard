import React, {PropTypes} from 'react';
import Modal from 'components/Modal';
import {Table} from 'components/Table';
import {PAYMENT_TYPES} from 'lib/enums';
import {getAmount, getTimeStamp, isFailed, isRefund} from 'routes/Transactions/modules/utils';
import cx from 'classnames';
import classNames from './TransactionDetails.scss';

const TransactionDetails = ({transaction, isOpen, onClose, onPrint}) => {
  const {customer, result, paymentType, currency, amount, card, billing} = transaction;
  return (
    <Modal
      isOpen={isOpen}
      style="standard"
      size="small"
    >
      <div className="header">Transaction details</div>
      <div className={cx("content", classNames.modalContent)}>
        <h4 className="ui header">Payment Details</h4>
        <Table className="large definition">
          <tr>
            <td className="three wide">Amount</td>
            <td>{getAmount(paymentType, currency, amount, false)}</td>
          </tr>
          <tr>
            <td>ID</td>
            <td>{transaction.id}</td>
          </tr>
          {transaction.channelName ? <tr>
            <td>Channel</td>
            <td>{transaction.channelName}</td>
          </tr> : null}
          <tr>
            <td>Date</td>
            <td>{getTimeStamp(transaction.transactionTimestamp, "MMMM D, YYYY HH:mm:ss")}</td>
          </tr>
          <tr>
            <td>Type</td>
            <td>{PAYMENT_TYPES[paymentType]}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>
              {isFailed(result.code) ?
                <p className={classNames.noMarginBottom}>Failed <i className="remove icon red large"/></p> :
                <p className={classNames.noMarginBottom}>Paid <i className="checkmark icon green large"/></p>
              }
              <h5 className={cx("ui header", classNames.noMarginTop)}>
                <div className="sub header">{result.description}</div>
              </h5>
            </td>
          </tr>
        </Table>
        <h4 className="ui header">Card</h4>
        <Table className="large definition">
          <tr>
            <td className="three wide">Name</td>
            <td>{card.holder}</td>
          </tr>
          <tr>
            <td>Last 4 digits</td>
            <td>****** {card.last4Digits}</td>
          </tr>
          {(card.expiryMonth && card.expiryYear) ? <tr>
            <td>Expires</td>
            <td>{`${card.expiryMonth}/${card.expiryYear}`}</td>
          </tr> : null}
          <tr>
            <td>Type</td>
            <td>{transaction.paymentBrand}</td>
          </tr>
        </Table>
        <h4 className="ui header">Customer</h4>
        <Table className="large definition">
          <tr>
            <td className="three wide">Name</td>
            <td>{`${customer.givenName} ${customer.surname}`}</td>
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
          <tr>
            <td>Country</td>
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
        </Table>
      </div>
      <div className="actions">
        <div className="ui icon button" onClick={onPrint}>
          <i className="print icon large"/>
        </div>
        <div className="ui button green" onClick={onClose}>OK</div>
      </div>
    </Modal>
  );
};

TransactionDetails.propTypes = {
  transaction: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onPrint: PropTypes.func.isRequired,
};

export default TransactionDetails;