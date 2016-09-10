import React, {PropTypes, Component} from 'react';
import cx from 'classnames';

const SideBar = ({className, children}) => (
  <div className={cx("ui vertical menu", className)}>
    {children}
  </div>
);

export default SideBar;
