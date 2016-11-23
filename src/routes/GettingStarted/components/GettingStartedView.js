import React, {PropTypes} from 'react';
import PhoneVerification from 'routes/Profile/routes/Settings/containers/PhoneVerificationContainer';
import UpdateMetaData from 'routes/Profile/routes/Settings/containers/UpdateMetaDataContainer';
import ConfirmVerification from 'routes/Profile/routes/Settings/containers/ConfirmVerificationContainer';
import SaveBankAccount from 'routes/Profile/routes/BankAccounts/containers/SaveBankAccountContainer';
import BankAccountItem from 'routes/Profile/routes/BankAccounts/components/BankAccountItem';
import classNames from './GettingStartedView.scss';
import Button from 'components/Button';
import cx from 'classnames';

const GettingStartedView = ({
  isAllowedVerification,
  requestVerificationStart,
  saveBankAccountStart,
  bankAccount
}) => {
  return (
    <section className={cx('ui main container', classNames.container)}>
      <h1>Getting started</h1>
      <p>Please complete a few easy steps to start using MONEI in production</p>
      <PhoneVerification
        title="1. Verify your phone"
        className={classNames.form} />
      <br />
      <div className={classNames.form}>
        <h3>2. Add your primary bank account</h3>
        {bankAccount.id && <div><BankAccountItem
          {...bankAccount}
          onEdit={() => saveBankAccountStart(bankAccount.id)} />
          <br />
        </div>}
        <Button onClick={saveBankAccountStart} primary>
          Add account
        </Button>
      </div>
      <br />
      <UpdateMetaData
        title="3. Fill up your personal data"
        isAppSettingsVisible={false}
        className={classNames.form} />
      <br />
      {isAllowedVerification && <Button
        className={cx('orange large', classNames.verifyButton)}
        onClick={requestVerificationStart}>
        <i className="icon checkmark box" />
        Request verification
      </Button>}
      <SaveBankAccount initialValues={{isPrimary: true}} />
      <ConfirmVerification redirect />
    </section>
  );
};

GettingStartedView.propTypes = {
  isAllowedVerification: PropTypes.bool.isRequired,
  requestVerificationStart: PropTypes.func.isRequired
};

export default GettingStartedView;
