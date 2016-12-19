import React, {PropTypes} from 'react';
import PhoneVerification from 'routes/Profile/routes/PersonalData/containers/PhoneVerificationContainer';
import UpdateMetaData from 'routes/Profile/routes/PersonalData/containers/PersonalDataFormContainer';
import ConfirmVerification from 'routes/Profile/routes/PersonalData/containers/ConfirmVerificationContainer';
import SaveBankAccount from 'routes/Profile/routes/BankAccounts/containers/SaveBankAccountContainer';
import BankAccountItem from 'routes/Profile/routes/BankAccounts/components/BankAccountItem';
import classNames from './GettingStartedView.scss';
import Button from 'components/Button';
import Loader from 'components/Loader';
import cx from 'classnames';

const GettingStartedView = ({
  isAllowedVerification,
  requestVerificationStart,
  saveBankAccountStart,
  bankAccount,
  isFetching
}) => {
  return (
    <section className={classNames.container}>
      <h1 className="ui header">
        Getting started
        <div className="sub header">Please complete a few easy steps to start using MONEI in production</div>
      </h1>
      <h3>1. Verify your phone</h3>
      <PhoneVerification />
      <br />
      <div className={classNames.form}>
        <h3>2. Add your primary bank account</h3>
        {
          bankAccount.id
            ? <div>
              <BankAccountItem
                {...bankAccount}
                onEdit={() => saveBankAccountStart(bankAccount.id)} />
              <br />
            </div>
            : isFetching
            ? <Loader active />
            : <Button onClick={saveBankAccountStart} primary>
            Add account
          </Button>
        }
      </div>
      <br />
      <h3>3. Fill up your personal data</h3>
      <UpdateMetaData />
      <br />
      {isAllowedVerification && <Button
        className={cx('orange large', classNames.verifyButton)}
        onClick={requestVerificationStart}>
        <i className="icon checkmark box" />
        Request verification
      </Button>}
      <SaveBankAccount initialValues={{isPrimary: true}} forcePrimary />
      <ConfirmVerification redirect />
    </section>
  );
};

GettingStartedView.propTypes = {
  isAllowedVerification: PropTypes.bool.isRequired,
  requestVerificationStart: PropTypes.func.isRequired,
  saveBankAccountStart: PropTypes.func.isRequired,
  bankAccount: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired
};

export default GettingStartedView;
