import React, {PropTypes} from 'react';
import Modal from 'components/Modal';
import Button from 'components/Button';
import classNames from './ConfirmRegisterView.scss';
import cx from 'classnames';

const ConfirmRegisterView = ({
  isConfirmRegisterOpen,
  closeConfirmRegisterModal,
  onRegister
}) => (
  <Modal isOpen={isConfirmRegisterOpen} size="small">
    <div className="header">Are you sure?</div>
    <div className="content big">
      <div className={cx('ui basic segment center aligned', classNames.text)}>
        We will verify all your data and give you access to the application.
      </div>
    </div>
    <div className="actions">
      <Button className="large" onClick={closeConfirmRegisterModal}>Cancel</Button>
      <Button className="large green" onClick={onRegister}>Confirm</Button>
    </div>
  </Modal>
);

export default ConfirmRegisterView;
