import React, {PropTypes} from 'react';
import Button from 'components/Button';
import FileButton from 'components/FileButton';

const DocumentView = ({
  documentName,
  documentUrl,
  isUploading,
  isDeleting,
  uploadFile,
  deleteFile
}) => {
  const onFileChange = (e) => {
    const {files} = e.target;
    if(files.length > 0) uploadFile(files[0]);
  };
  return (
    <div>
      {documentUrl && <p>
        <a href={documentUrl} target="_blank">{documentName}</a>
      </p>}
      {documentUrl && <Button
        onClick={deleteFile}
        negative
        loading={isDeleting} >
        Delete
      </Button>}
      {!documentUrl && <FileButton
        accept="image/*, application/pdf"
        loading={isUploading}
        onChange={onFileChange}>
        Upload your identity document
      </FileButton>}
    </div>

  );
};

export default DocumentView;
