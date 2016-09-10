import React, {PropTypes} from 'react';
import Modal from './Modal';
import Button from 'components/Button';

const Confirm = ({
  isOpen,
  children,
  isLoading,
  isDisabled,
  onCancel,
  onConfirm,
  confirmText,
  headerText,
  confirmClass
}) => {
  return (
    <Modal isOpen={isOpen}>
      <div className="header">{headerText || 'Are you sure?'}</div>
      <div className="content">
        {children}
      </div>
      <div className="actions">
        <div className="actions">
          <Button onClick={() => onCancel()}>Cancel</Button>
          <Button
            className={confirmClass}
            loading={isLoading}
            onClick={() => onConfirm()}
            disabled={isDisabled || isLoading}>
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

Confirm.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.any,
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  confirmText: PropTypes.string.isRequired,
  confirmClass: PropTypes.string,
  headerText: PropTypes.string
};

export default Confirm;
