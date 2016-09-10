import React, {PropTypes} from 'react';
import Header from 'components/Header';
import MessagesStack from 'components/MessagesStack';
import cx from 'classnames';
import classNames from './CoreLayout.scss';
import 'styles/core.scss';

const CoreLayout = ({isAuthenticated, isWaiting, children, isPlain}) => {
  if (!isAuthenticated || isPlain) {
    return (
      <div className={classNames.container}>
        {children}
        <MessagesStack />
      </div>
    );
  }
  return (
    <div className={classNames.container}>
      <Header />
      <section className={cx('ui main container', classNames.section)}>
        {isWaiting && <div className="ui icon blue message">
          <i className="info icon" />
          <div className="content">
            <div className="header">
              Thank you for the upgrade, we have received your payment.
            </div>
            <p>Your request is in validation process. We will inform you once the account is ready for use.</p>
          </div>
        </div>}
        {children}
      </section>
      <MessagesStack />
    </div>
  );
};

CoreLayout.propTypes = {
  children: PropTypes.element.isRequired,
  isAuthenticated: PropTypes.bool,
  isWaiting: PropTypes.bool,
  isPlain: PropTypes.bool
};

export default CoreLayout;
