import React from 'react';
import classNames from './SignInView.scss';

const SignIn = ({isSandboxInitialized, isAuthenticated}) => {
  if (isAuthenticated && !isSandboxInitialized) {
    return (
      <div className="ui segment" style={{height: '100%'}}>
        <div className="ui active inverted dimmer">
          <div className="ui text loader">Loading</div>
        </div>
      </div>
    );
  }
  return (
    <section className={classNames.container}>
      <div id="lock-container" />
    </section>
  );
};

export default SignIn;
