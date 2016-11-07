import React, {PropTypes} from 'react';
import {IndexLink, Link} from 'react-router';
import Button from 'components/Button';
import classNames from './OnboardingView.scss';
import GeneralDataForm from '../containers/GeneralDataForm';
import DocumentsForm from '../containers/DocumentsForm';
import StoresForm from '../containers/StoresForm';
import cx from 'classnames';

const OnboardingView = ({user, step, percentage, signOut}) => (
  <div className={classNames.container}>
    <header className={cx('ui inverted fixed secondary menu large compact', classNames.header)}>
      <IndexLink to="/" className="item borderless">
        <i className="left arrow icon" />
        Back to Dashboard
      </IndexLink>
      <div className="right menu">
        <Link to="/profile" className="item borderless">
          <img className="ui avatar image" src={user.picture} />
          <span>{user.name}</span>
        </Link>
        <Button className="item borderless" onClick={signOut}>
          Logout&nbsp;<i className="sign out icon" />
        </Button>
      </div>
    </header>
    <section className={cx('ui container', classNames.section)}>
      <div className="ui attached clearing segment">
        <h1 className="ui left floated header">Identity verification</h1>
        <h1 className="ui right floated header">{`${percentage}% Complete`}</h1>
        <div className={cx('ui progress warning', classNames.progress)}>
          <div className="bar" style={{transitionDuration: '300ms', width: `${percentage}%`}} />
        </div>
      </div>
      <div className={cx('ui three top attached ordered large steps', classNames.steps)}>
        <div className={cx('step', classNames.step, {active: (step == 0)})}>
          <div className="content">
            <div className="title">General Data</div>
          </div>
        </div>
        <div className={cx('step', classNames.step, {active: (step == 1), disabled: (step < 1)})}>
          <div className="content">
            <div className="title">Your Documents</div>
          </div>
        </div>
        <div className={cx('step', classNames.step, {active: (step == 2), disabled: (step < 2)})}>
          <div className="content">
            <div className="title">Your Store</div>
          </div>
        </div>
      </div>
      <div className={cx('ui attached segment', classNames.content)}>
        { step == 0 ?
          <GeneralDataForm user={user} />
          : step == 1 ?
            <DocumentsForm user={user} />
          :
            <StoresForm user={user} />
        }
      </div>
    </section>
  </div>
);

export default OnboardingView;
