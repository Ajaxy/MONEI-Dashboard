import React, {PropTypes, Component} from 'react';
import SideBar from 'components/SideBar';
import classNames from './NavBar.scss';
import cx from 'classnames';

const NavBar = ({isAdmin}) => (
  <SideBar className={cx('inverted', classNames.container)}>
    <div className="item">
      <div className="ui container">
        <h1>MONEI</h1>
      </div>
    </div>
    <div className="item"><i className={cx("home icon", classNames.icon)}/>Dashboard</div>
    <div className="item"><i className={cx("payment icon", classNames.icon)}/>Transactions</div>
    <div className="item"><i className={cx("users icon", classNames.icon)}/>Customers</div>
  </SideBar>
);

export default NavBar;
