import React, {PropTypes, Component} from 'react';
import * as MUI from 'material-ui';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionReceipt from 'material-ui/svg-icons/action/receipt';
import SocialGroup from 'material-ui/svg-icons/social/group';
import * as styles from './Styles';
import Logo from 'components/Logo';

const SideBar = () => (
  <MUI.Paper
    style={styles.container}
    rounded={false}
  >
    <MUI.AppBar
      title={<Logo color="white" style={{width: 128, height: 64}}/>}
      titleStyle={{textAlign: 'center'}}
      showMenuIconButton={false}
    />
    <MUI.Menu>
      <MUI.MenuItem
        style={styles.menuItem}
        primaryText="Dashboard"
        leftIcon={<ActionHome color="white"/>}
      />
      <MUI.MenuItem
        style={styles.menuItem}
        primaryText="Transactions"
        leftIcon={<ActionReceipt color="white"/>}
      />
      <MUI.MenuItem
        style={styles.menuItem}
        primaryText="Customers"
        leftIcon={<SocialGroup color="white"/>}
      />
    </MUI.Menu>
  </MUI.Paper>
);

export default SideBar;
