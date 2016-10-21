import React, {Component, PropTypes} from 'react';
import IndexLink from 'react-router/lib/IndexLink';
import Link from 'react-router/lib/Link';
import Logo from 'components/Logo';
import Button from 'components/Button';
import DropDownMenu from 'components/DropDownMenu';
import classNames from './Header.scss';
import cx from 'classnames';

const Header = ({
  profile, 
  signOut, 
  isAdmin, 
  isMerchant, 
  isInSandboxMode, 
  isVerificationRequested, 
  setSandboxMode, 
  viewOnboarding
}) => (
  <header className="ui inverted green fixed menu large">
    <div className="ui container">
      <IndexLink to="/" className={cx("ui medium header item", classNames.logo)}>
        <Logo width={128} height={28} fill="#FFFFFF"/>
      </IndexLink>
      {isAdmin ? <Link to="/users" className="item" activeClassName="active">Users</Link> : null }
      {!isAdmin ? <Link to="/transactions" className="item" activeClassName="active">Transactions</Link> : null }
      {!isAdmin ? <Link to="/customers" className="item" activeClassName="active">Customers</Link> : null }
      {!isAdmin && isMerchant ? 
        <div className="item borderless">
          <DropDownMenu className="floating labeled icon button orange">
            <i className="database icon" />
            <span className="text">{isInSandboxMode ? "TEST" : "LIVE"}</span>
            <div className="menu">
              <div className="item" onClick={() => setSandboxMode(false)}>LIVE</div>
              <div className="item" onClick={() => setSandboxMode(true)}>TEST</div>
            </div>
          </DropDownMenu>
        </div>
      : null }
      {!isAdmin && !isMerchant && isVerificationRequested ?
        <div className="item borderless text orange">
          PRODUCTION ACCESS PENDING
        </div>
      : null }
      {!isAdmin && !isMerchant && !isVerificationRequested ?
        <div className="item borderless">
          <Button className="large orange" onClick={viewOnboarding}>GET PRODUCTION ACCESS</Button> 
        </div>
      : null }
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

export default Header;
