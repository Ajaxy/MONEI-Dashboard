import React, {PropTypes} from 'react';
import Button from 'components/Button';
import FileButton from 'components/FileButton';
import Loader from 'components/Loader';
import Input from 'components/Input';
import cx from 'classnames';

const DocumentsView = ({
  fields: {companyName, vatNumber, idNumber},
  handleSubmit,
  onSubmit,
  user,
  isCompany,
  isModifying,
  isUploading,
  isDeleting,
  documentName,
  documentUrl,
  goToPrevStep,
  openConfirmDeleteModal,
  onFileChange
}) => (
  <section className="ui basic segment">
    <form className="ui form large" onSubmit={handleSubmit(onSubmit)}>
      {isCompany ? <Input {...companyName} type="text" name="companyName" disabled={user.readOnly} label="Company Name" /> : null}
      {isCompany ? <Input {...vatNumber} type="text" name="vatNumber" disabled={user.readOnly} label="VAT number or registration number of the company" /> : null}
      {!isCompany ? <Input {...idNumber} type="text" name="idNumber" disabled={user.readOnly} label="Identity document number" /> : null}
      <div className="field">
        <label>Identity document</label>
        {!documentName ? <div className="header">Image or PDF less than 5MB</div> : null}
        <div className="ui basic segment">
          {documentName ?
            <div className="ui labeled button">
              <Button type="button" onClick={openConfirmDeleteModal}>
                {isDeleting ? <div className="ui active mini inline loader" /> : <i className="trash icon" />}
              </Button>
              <a className="ui basic label" href={documentUrl} target="_blank">{documentName}</a>
            </div>
          : null}
          {!documentName ?
            <FileButton type="button" accept="image/*, application/pdf" basic onChange={onFileChange}>
              {isUploading ? <div className="ui active mini inline loader" /> : <i className="cloud upload icon" />}
              <span>{isCompany ? 'Upload document of company incorporation' : ' Upload your identity document' }</span>
            </FileButton>
          : null}
        </div>
      </div>
    </form>
    <div className="ui right aligned relaxed grid">
      <div className="column">
        <Button
          type="submit"
          className="large green"
          onClick={goToPrevStep}>
          Previous Step
        </Button>
        <Button
          type="submit"
          className="large green"
          loading={(!isDeleting && !isUploading && isModifying)}
          disabled={!documentName || (isCompany && (!companyName.value || !vatNumber.value)) || (!isCompany && !idNumber.value)}
          onClick={handleSubmit(onSubmit)}>
          Next Step
        </Button>
      </div>
    </div>
  </section>
);

export default DocumentsView;
