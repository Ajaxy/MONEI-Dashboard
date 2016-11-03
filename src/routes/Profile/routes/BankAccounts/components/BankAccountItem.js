import React, {PropTypes} from 'react';
import Link from 'react-router/lib/Link';
import cx from 'classnames';
import classNames from './BankAccountItem.scss';
import Button from 'components/Button';

const ImportsTableRow = ({bankAccount}) => {
  const isVerified = bankAccount.isVerified;
  const iconClass = cx(
    classNames.icon,
    'large middle aligned icon',
    {
      'green check': isVerified,
      'grey help': !isVerified
    }
  );
  return (
    <div className="item">
      <i className={iconClass} />
      <div className="content">
        <h3 className="header">
          {bankAccount.last4Digits}
        </h3>
        <small className="description" style={{opacity: 0.5}}>
          {isVerified ? 'verified' : 'pending verification'}
        </small>
      </div>
    </div>
  );
};
ImportsTableRow.propTypes = {
  bankAccount: PropTypes.object.isRequired
};

export default ImportsTableRow;

