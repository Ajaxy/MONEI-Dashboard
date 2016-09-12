import React, {Component, PropTypes} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as classNames from './MaterialLayout.scss';
import AppBar from 'components/AppBar';
import SideBar from 'components/SideBar';
import Footer from 'components/Footer';
import Theme from './Theme';

const MaterialLayout = ({isAuthenticated, isPlain, children}) => (
  <MuiThemeProvider muiTheme={Theme}>
    {(!isAuthenticated || isPlain) ?
      <div className={classNames.fullscreen}>
        {children}
      </div>
      :
      <div className={classNames.container}>
        <div className={classNames.sidebar}>
          <SideBar/>
        </div>
        <div className={classNames.content}>
          <AppBar/>
          {children}
          <Footer/>
        </div>
      </div>
    }
  </MuiThemeProvider>
);

export default MaterialLayout;
