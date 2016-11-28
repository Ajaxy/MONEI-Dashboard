import React, {PropTypes} from 'react';
import cx from 'classnames';
import classNames from './BankAccountItem.scss';

const BankAccountItem = ({
  isVerified,
  name,
  isPrimary,
  last4Digits,
  country,
  currency,
  id,
  onDelete,
  onEdit,
  isDeletable
}) => {
  const iconClass = cx(
    classNames.icon,
    'large middle aligned icon',
    {
      'credit card': isVerified,
      'help': !isVerified
    }
  );
  const handleEdit = (e) => {
    e.preventDefault();
    onEdit(id);
  };
  return (
    <div className="column">
      <div className={cx('ui icon message', {teal: isPrimary}, classNames.bankAccount)}>
        <i className={iconClass} />
        {isDeletable && <i className="close icon red" onClick={() => onDelete(id)} />}
        <div className="content">
          <div className="header">
            <a href="#" onClick={handleEdit}>{name}</a> {isPrimary && '(primary)'}
          </div>
          <p>
            <span className="text grey">
              <span className={classNames.dots}>{new Array(21).join('•')}</span>
              {last4Digits}
            </span>
            <br />
            {currency} / {country}
          </p>
        </div>
      </div>
    </div>
  );
};
BankAccountItem.propTypes = {
  isVerified: PropTypes.bool.isRequired,
  last4Digits: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isPrimary: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  isDeletable: PropTypes.bool.isRequired
};

export default BankAccountItem;

