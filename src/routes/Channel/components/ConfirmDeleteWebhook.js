import React, {PropTypes} from 'react';
import Modal from 'components/Modal';
import Button from 'components/Button';
import Input from 'components/Input';
import Select, {SelectItem} from 'components/Select';
import cx from 'classnames';
import classNames from './ConfirmDeleteWebhook.scss';

const ConfirmDeleteWebhook = ({
  size,
  style,
  isOpen,
  onDelete,
  onClose,
  isDeleting
}) => {
  return (
    <Modal
      {...{size, style, isOpen}}
    >
      <div className="header">Deleting webhook</div>
      <div className="content big">
        <div className={cx('ui basic segment center aligned', classNames.text)}>
          Are you sure, you want to delete the webhook?
        </div>
      </div>
      <div className="actions">
        <Button
          disabled={isDeleting}
          onClick={onClose}>
          Cancel
        </Button>
        <Button
          primary
          disabled={isDeleting}
          loading={isDeleting}
          negative
          onClick={onDelete}>
          Delete
        </Button>
      </div>
    </Modal>
  );
};

ConfirmDeleteWebhook.propTypes = {
  size: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default ConfirmDeleteWebhook;
