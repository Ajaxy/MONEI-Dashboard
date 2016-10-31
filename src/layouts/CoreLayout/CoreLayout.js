import React, {PropTypes} from 'react';
import Header from 'components/Header';
import MessagesStack from 'components/MessagesStack';
import WindowStack from 'components/WindowStack';
import classNames from './CoreLayout.scss';
import cx from 'classnames';
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
        <section className="ui main container">
          {children}
          <MessagesStack />
          <WindowStack />
        </section>
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
