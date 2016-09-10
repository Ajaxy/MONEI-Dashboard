import React, {Component, PropTypes} from 'react';
import IndexLink from 'react-router/lib/IndexLink';
import Link from 'react-router/lib/Link';
import DropDownMenu from 'components/DropDownMenu';
import cx from 'classnames';
import classNames from './Header.scss';

class Header extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    signOut: PropTypes.func.isRequired,
    isFreeUser: PropTypes.bool.isRequired
  };

  render() {
    const {profile, signOut, isFreeUser} = this.props;
    return (
      <header className="ui fixed menu large">
        <div className={cx('ui container', classNames.container)}>
          <IndexLink to="/" className={cx('ui medium header item', classNames.logo)}>
            MONEI
          </IndexLink>
          <DropDownMenu className="item right">
            <img className="ui avatar image" src={profile.picture} />
            <span>{profile.name}</span>
            <i className="dropdown icon" />
            <div className="menu">
              <Link to="/profile" className="item" activeClassName="active">
                <i className="user icon" />
                Profile
              </Link>
              <a className="item" onClick={signOut}>
                <i className="sign out icon" />
                Sign Out
              </a>
            </div>
          </DropDownMenu>
        </div>
      </header>
    );
  }
}

export default Header;
