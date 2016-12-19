import React, {PropTypes} from 'react';
import Confirm from 'components/Modal/Confirm';

const ConfirmVerification = ({
  isOpen,
  isVerifying,
  verifyUserCancel,
  verifyUser,
  isAllowedToVerify,
  user
}) => (
  <Confirm
    isOpen={isOpen}
    isDisabled={!isAllowedToVerify}
    isLoading={isVerifying}
    onCancel={verifyUserCancel}
    onConfirm={() => verifyUser(user.id)}
    confirmText="Confirm"
    confirmClass="orange">
    {isAllowedToVerify
      ? <p>
        This action will grant production access to <b>{user.name}</b>. {' '}
        Please make sure all the data have been filled correctly.
      </p>
      : <p>Please provide <b>Sender, User login, User password</b> {' '}
        in the <b>Settings</b> tab before verifying user.</p>}
  </Confirm>
);

ConfirmVerification.propTypes = {
  verifyUser: PropTypes.func.isRequired,
  verifyUserCancel: PropTypes.func.isRequired,
  isVerifying: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isAllowedToVerify: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
};
export default ConfirmVerification;
