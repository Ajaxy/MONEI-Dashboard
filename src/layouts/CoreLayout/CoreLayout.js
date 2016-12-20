import React, {PropTypes} from 'react';
import Header from 'components/Header';
import MessagesStack from 'components/MessagesStack';
import classNames from './CoreLayout.scss';
import Loader from 'components/Loader';
import cx from 'classnames';
import 'styles/core.scss';

const CoreLayout = ({isAuthenticated, isPlain, children, isAuthenticating, isFetchingProfile}) => {
  if (!isAuthenticated || isPlain) {
    return (
      <div className={classNames.container}>
        {isAuthenticating ? <Loader active inline={false} /> : children}
        <MessagesStack />
      </div>
    );
  }
  if (isFetchingProfile) {
    return (
      <Loader active inline={false} />
    );
  }
  return (
    <div className={cx(classNames.container, classNames.main)}>
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
  isPlain: PropTypes.bool,
  isFetchingProfile: PropTypes.bool
};

export default CoreLayout;
