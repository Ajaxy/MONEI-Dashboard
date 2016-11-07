import React, {PropTypes} from 'react';
import Modal from 'components/Modal';
import Button from 'components/Button';
import classNames from './ConfirmDeleteView.scss';
import cx from 'classnames';

const ConfirmDeleteView = ({
  isConfirmDeleteOpen,
  closeConfirmDeleteModal,
  onDelete
}) => (
  <Modal isOpen={isConfirmDeleteOpen} size="small">
    <div className="header">Are you sure?</div>
    <div className="content big">
      <div className={cx('ui basic segment center aligned', classNames.text)}>
        You are going to remove attached document.
      </div>
    </div>
    <div className="actions">
      <Button className="large" onClick={closeConfirmDeleteModal}>Cancel</Button>
      <Button className="large red" onClick={onDelete}>Delete</Button>
    </div>
  </Modal>
);

export default ConfirmDeleteView;
