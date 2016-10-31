import React, {PropTypes} from 'react';
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
    <FileButton
      accept="image/*, application/pdf"
      loading={isUploading}
      onChange={onFileChange}>
      Upload your identity document
    </FileButton>
  );
};

export default DocumentView;
