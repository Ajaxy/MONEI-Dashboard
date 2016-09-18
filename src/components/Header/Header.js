import React, {Component, PropTypes} from 'react';
import IndexLink from 'react-router/lib/IndexLink';
import Link from 'react-router/lib/Link';
import Logo from 'components/Logo';
import DropDownMenu from 'components/DropDownMenu';

class Header extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    signOut: PropTypes.func.isRequired,
    isFreeUser: PropTypes.bool.isRequired
  };

  render() {
    const {profile, signOut, isFreeUser} = this.props;
    return (
      <header className="ui inverted green fixed menu large">
        <div className="ui container">
          <IndexLink to="/" className="ui medium header item">
            <Logo width={128} height={28} fill="#FFFFFF"/>
          </IndexLink>
          <Link to="/dashboard" className="item" activeClassName="active">Dashboard</Link>
          <Link to="/transactions" className="item" activeClassName="active">Transactions</Link>
          <Link to="/customers" className="item" activeClassName="active">Customers</Link>
          <DropDownMenu className="item right borderless">
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
