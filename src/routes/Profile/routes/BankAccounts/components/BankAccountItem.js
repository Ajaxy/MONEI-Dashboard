import React, {PropTypes} from 'react';
import cx from 'classnames';
import classNames from './BankAccountItem.scss';

const ImportsTableRow = ({isVerified, last4Digits, country, currency, id, onDelete}) => {
  const iconClass = cx(
    classNames.icon,
    'large middle aligned icon',
    {
      'green check': isVerified,
      'grey help': !isVerified
    }
  );
  return (
    <div className="column">
      <div className={cx('ui icon message', classNames.bankAccount)}>
        <i className={iconClass} />
        <i className="close icon red" onClick={() => onDelete(id)} />
        <div className="content">
          <div className="header text grey">
            <small className={classNames.dots}>{new Array(21).join('•')}</small>
            {last4Digits}
          </div>
          <p>
            {currency} ({country})
          </p>
        </div>
      </div>
    </div>
  );
};
ImportsTableRow.propTypes = {
  isVerified: PropTypes.bool.isRequired,
  last4Digits: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired
};

export default ImportsTableRow;

