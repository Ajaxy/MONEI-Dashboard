import React, {PropTypes} from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import NavBar from 'components/NavBar';
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
    <div className={cx("ui grid", classNames.container)}>
      <div className={cx("four wide column", classNames.noPadding)}>
        <NavBar/>
      </div>
      <div className={cx("twelve wide column", classNames.noPadding)}>
        <Header/>
        {children}
        <MessagesStack />
        <Footer/>
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
