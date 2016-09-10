import React from 'react';
import classNames from './Footer.scss';
import cx from 'classnames';

const Footer = () => (
  <footer className={cx('ui secondary vertical segment', classNames.footer)}>
    <div className="ui container">
      <div className="ui two column grid">
        <div className="column">
          ©{new Date().getFullYear()} <a href="http://microapps.com/" target="_blank">microapps.com</a>
        </div>
        <div className="column right aligned">v{__VERSION__} beta</div>
      </div>
    </div>
  </footer>
);

export default Footer;
