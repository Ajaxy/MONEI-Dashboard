import React, {PropTypes} from 'react';
import Confirm from 'components/Modal/Confirm';

const ConfirmVerification = ({
  isOpen,
  isVerifying,
  requestVerificationCancel,
  requestVerification,
  redirect
}) => (
  <Confirm
    isOpen={isOpen}
    isLoading={isVerifying}
    onCancel={requestVerificationCancel}
    onConfirm={() => requestVerification({redirect})}
    confirmText="Confirm"
    confirmClass="positive">
    <p>
      This action will request a production access for your account. {' '}
      Please make sure you have all the data filled correctly
    </p>
  </Confirm>
);

ConfirmVerification.propTypes = {
  requestVerification: PropTypes.func.isRequired,
  requestVerificationCancel: PropTypes.func.isRequired,
  isVerifying: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  redirect: PropTypes.bool
};

export default ConfirmVerification;
