import React, {PropTypes} from 'react';
import Confirm from 'components/Modal/Confirm';

const ConfirmDelete = ({isOpen, isDeleting, deleteFileCancel, deleteFile}) => (
  <Confirm
    isOpen={isOpen}
    isLoading={isDeleting}
    onCancel={deleteFileCancel}
    onConfirm={deleteFile}
    confirmText="Delete"
    confirmClass="negative">
    <p>This action will delete you uploaded document</p>
  </Confirm>
);

ConfirmDelete.propTypes = {
  deleteFile: PropTypes.func.isRequired,
  deleteFileCancel: PropTypes.func.isRequired,
  isDeleting: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired
};

export default ConfirmDelete;
