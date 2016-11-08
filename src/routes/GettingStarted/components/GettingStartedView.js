import React, {PropTypes} from 'react';
import PhoneVerification from 'routes/Profile/routes/Settings/containers/PhoneVerificationContainer';
import UpdateMetaData from 'routes/Profile/routes/Settings/containers/UpdateMetaDataContainer';
import ConfirmVerification from 'routes/Profile/routes/Settings/containers/ConfirmVerificationContainer';
import classNames from './GettingStartedView.scss';
import Button from 'components/Button';
import cx from 'classnames';

const GettingStartedView = ({
  isAllowedVerification,
  requestVerificationStart,
  isVerificationRequested
}) => (
  <section className={cx('ui main text container', classNames.container)}>
    <h1>Getting started</h1>
    <p>Please complete a few easy steps to start using MONEI in production</p>
    <PhoneVerification
      title="1. Verify your phone"
      className={classNames.form} />
    <br />
    <UpdateMetaData
      title="2. Fill up your personal data"
      isAppSettingsVisible={false}
      className={classNames.form}/>
    <br />
    {!isVerificationRequested && <Button
      className={cx('basic orange', classNames.verifyButton)}
      disabled={!isAllowedVerification}
      onClick={requestVerificationStart}>
      Request verification
    </Button>}
    <ConfirmVerification />
  </section>
);

GettingStartedView.propTypes = {

};

export default GettingStartedView;
