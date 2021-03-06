import React, {PropTypes} from 'react';
import Button from 'components/Button';
import FileButton from 'components/FileButton';
import ConfirmDelete from '../containers/ConfirmDeleteContainer';

const DocumentView = ({
  documentName,
  documentUrl,
  isUploading,
  uploadFile,
  deleteFileStart,
  disabled
}) => {
  const onFileChange = (e) => {
    const {files} = e.target;
    if (files.length > 0) uploadFile(files[0]);
  };
  return (
    <div>
      {documentUrl && <p>
        <a href={documentUrl} target="_blank">{documentName}</a>
      </p>}
      {!disabled && documentUrl && <Button type="button"
        onClick={deleteFileStart}>
        <i className="icon trash" />
        Delete
      </Button>}
      {!disabled && !documentUrl && <FileButton
        type="button"
        accept="image/*, application/pdf"
        loading={isUploading}
        onChange={onFileChange}>
        <i className="icon cloud upload" />
        Upload
      </FileButton>}
      <ConfirmDelete />
    </div>
  );
};

DocumentView.propTypes = {
  documentName: PropTypes.string,
  documentUrl: PropTypes.string,
  isUploading: PropTypes.bool,
  uploadFile: PropTypes.func.isRequired,
  deleteFileStart: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default DocumentView;
