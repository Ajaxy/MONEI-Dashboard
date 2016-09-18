import React, {PropTypes} from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import MessagesStack from 'components/MessagesStack';
import classNames from './CoreLayout.scss';
import 'styles/core.scss';

const CoreLayout = ({isAuthenticated, isPlain, children}) => {
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
      <Header/>
      <div className={classNames.content}>
        {children}
        <MessagesStack />
      </div>
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
