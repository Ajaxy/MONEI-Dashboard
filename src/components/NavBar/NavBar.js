import React, {PropTypes, Component} from 'react';
import classNames from './NavBar.scss';
import cx from 'classnames';

const NavBar = ({isAdmin}) => (
  <div className={cx('ui vertical menu inverted', classNames.container)}>
    <div className="item">
      <div className="ui container">
        <h1>MONEI</h1>
      </div>
    </div>
    <div className="item"><i className={cx("home icon", classNames.icon)}/>Dashboard</div>
    <div className="item"><i className={cx("payment icon", classNames.icon)}/>Transactions</div>
    <div className="item"><i className={cx("users icon", classNames.icon)}/>Customers</div>
  </div>
);

export default NavBar;
