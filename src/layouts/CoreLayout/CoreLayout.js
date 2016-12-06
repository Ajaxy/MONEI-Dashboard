import React, {PropTypes} from 'react';
import Header from 'components/Header';
import MessagesStack from 'components/MessagesStack';
import classNames from './CoreLayout.scss';
import Loader from 'components/Loader';
import cx from 'classnames';
import 'styles/core.scss';

const CoreLayout = ({isAuthenticated, isPlain, children, isAuthenticating}) => {
  if (!isAuthenticated || isPlain) {
    return (
      <div className={classNames.container}>
        {isAuthenticating ? <Loader active inline={false} /> : children}
        <MessagesStack />
      </div>
    );
  }
  return (
    <div className={classNames.container}>
      <Header />
      <section className={cx('ui main container', classNames.section)}>
        {children}
        <MessagesStack />
      </section>
    </div>
  );
};

CoreLayout.propTypes = {
  children: PropTypes.element.isRequired,
  isAuthenticated: PropTypes.bool,
  isAuthenticating: PropTypes.bool,
  isWaiting: PropTypes.bool,
  isPlain: PropTypes.bool
};

export default CoreLayout;
