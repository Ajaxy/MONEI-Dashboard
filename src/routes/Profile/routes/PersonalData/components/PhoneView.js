import React, {PropTypes} from 'react';
import Button from 'components/Button';
import cx from 'classnames';

const PhoneView = ({phoneNumber, onEdit, isPhoneVerified}) => {
  const iconClass = cx('icon', {
    'green checkmark': isPhoneVerified,
    'yellow warning sign': !isPhoneVerified
  });
  return (
    <div className="ui form">
      <div className="two fields">
        <div className="field">
          <label>
            Phone number
            {' '}
            <span className="grey text">
              ({isPhoneVerified ? 'verified' : 'pending verification'})
            </span>
          </label>
          <div className="ui icon input">
            <input type="text" value={phoneNumber} readOnly />
            <i className={iconClass} />
          </div>
        </div>
      </div>
      <Button
        primary
        onClick={onEdit}>
        Edit phone
      </Button>
    </div>
  );
};

PhoneView.propTypes = {
  isPhoneVerified: PropTypes.bool,
  phoneNumber: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default PhoneView;
