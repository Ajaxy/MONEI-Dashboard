import React, {Component, PropTypes} from 'react';
import IndexLink from 'react-router/lib/IndexLink';
import Link from 'react-router/lib/Link';
import Logo from 'components/Logo';
import Button from 'components/Button';
import CheckBox from 'components/CheckBox';
import DropDownMenu from 'components/DropDownMenu';
import classNames from './Header.scss';
import userPic from 'static/user.png';
import cx from 'classnames';

const Header = ({
  profile,
  signOut,
  isUser,
  isAdmin,
  isMerchant,
  isInSandboxMode,
  isVerificationRequested,
  setSandboxMode,
  viewOnboarding,
  viewChannels
}) => (
  <header className="ui inverted green fixed menu large">
    <div className="ui container">
      <IndexLink to="/" className={cx('ui medium header item', classNames.logo)}>
        <Logo width={128} height={28} fill="#FFFFFF" />
      </IndexLink>
      {isAdmin ? <Link to="/users" className="item" activeClassName="active">Users</Link> : null }
      {!isAdmin ? <Link to="/transactions" className="item" activeClassName="active">Transactions</Link> : null }
      {!isAdmin ? <Link to="/customers" className="item" activeClassName="active">Customers</Link> : null }
      {!isAdmin && !isMerchant && isVerificationRequested && <div className="item borderless text yellow">
        Production access pending
      </div>}
      {!isAdmin && !isMerchant && !isVerificationRequested && <div className="item borderless">
        <Button className="inverted" onClick={viewOnboarding}>Get production access</Button>
      </div>}
      {!isAdmin && isMerchant && <div className="item borderless">
        TEST
        <CheckBox
          className={classNames.toggle}
          value={isInSandboxMode}
          checked={!isInSandboxMode}
          onChange={(e) => setSandboxMode(!JSON.parse(e.target.value))}
          toggle
          fitted
          inverted
        />
        LIVE
      </div>}
      <DropDownMenu className="item right borderless">
        {!isAdmin && isInSandboxMode &&
        <div className={cx('ui right pointing large red basic label', classNames.label)}>TEST MODE</div>
        }
        <img className="ui avatar image" src={profile.picture} onError={e => e.target.src = userPic} />
        <span>{profile.name}</span>
        <i className="dropdown icon" />
        <div className="menu">
          <Link to="/profile" className="item" activeClassName="active">
            <i className="user icon" />
            Profile
          </Link>
          {isUser &&
          <Link to="/channels" className="item" activeClassName="active" onClick={viewChannels}>
            <i className="payment icon" />
            Channels
          </Link>
          }
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
