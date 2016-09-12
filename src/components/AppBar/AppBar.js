import React, {Component, PropTypes} from 'react';
import * as MUI from 'material-ui';
import NavigationArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import * as classNames from './AppBar.scss';

class AppBar extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    signOut: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {open: false, anchor: null};
  }

  openMenu = (e) => {
    e.preventDefault();
    this.setState({open: true, anchor: e.currentTarget});
  };

  closeMenu = () => {
    this.setState({open: false});
  };

  render() {
    const {profile, signOut} = this.props;
    return (
      <MUI.AppBar
        showMenuIconButton={false}
        className={classNames.container}
        iconElementRight={
          <div>
            <MUI.FlatButton
              style={{height: 48}}
              onTouchTap={this.openMenu}
              label={
                <span>
                  <span>{profile.name}</span>
                  <NavigationArrowDropDown style={{verticalAlign: 'middle'}}/>
                </span>
              }
              icon={<MUI.Avatar src={profile.picture} size={30}/>}
            />
            <MUI.Popover
              open={this.state.open}
              anchorEl={this.state.anchor}
              anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              onRequestClose={this.closeMenu}
            >
              <MUI.Menu>
                <MUI.MenuItem primaryText="Profile" />
                <MUI.MenuItem primaryText="Sign out" onTouchTap={signOut}/>
              </MUI.Menu>
            </MUI.Popover>
          </div>
        }
      />
    );
  }
}

export default AppBar;
