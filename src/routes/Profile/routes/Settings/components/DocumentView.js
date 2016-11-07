import React, {PropTypes} from 'react';
import Button from 'components/Button';
import FileButton from 'components/FileButton';
import ConfirmDelete from '../containers/ConfirmDeleteContainer';

const DocumentView = ({
  documentName,
  documentUrl,
  isUploading,
  uploadFile,
  deleteFileStart
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
      {documentUrl && <Button type="button"
        onClick={deleteFileStart}>
        <i className="icon trash" />
        Delete
      </Button>}
      {!documentUrl && <FileButton
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

export default DocumentView;
