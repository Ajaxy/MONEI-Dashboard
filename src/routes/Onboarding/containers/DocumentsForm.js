import React, {Component, PropTypes} from 'react';
import DocumentsView from '../components/DocumentsView';
import ConfirmDeleteView from '../components/ConfirmDeleteView';
import {reduxForm} from 'redux-form';
import * as actions from '../modules/actions';
import * as selectors from '../modules/selectors';
import * as profileSelectors from 'modules/profile/selectors';

class DocumentsForm extends Component {
  componentWillMount() {
    const {documentName, getFileUrl} = this.props;
    if (documentName) getFileUrl(documentName);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.documentName && nextProps.documentName != this.props.documentName) {
      this.props.getFileUrl(nextProps.documentName);
    }
  }

  submitForm = ({companyName, vatNumber, idNumber}) => {
    const {verifyPhoneNumber} = this.props;
    return new Promise(async (resolve, reject) => {
      const {user, updateProfileLocally, goToNextStep} = this.props;
      const user_metadata = Object.assign({}, user.user_metadata, {companyName, vatNumber, idNumber});
      const success = await updateProfileLocally(user.user_id, {user_metadata});
      if (success) goToNextStep();
    });
  };

  deleteFile = () => {
    const {closeConfirmDeleteModal} = this.props;
    this.props.deleteFile();
    closeConfirmDeleteModal();
  };

  uploadFile = (e) => {
    const {files} = e.target;
    if (files.length > 0)
      { this.props.uploadFile(files[0]); }
  };

  render() {
    return <div>
      <DocumentsView {...this.props} onSubmit={this.submitForm} onFileChange={this.uploadFile} />
      <ConfirmDeleteView {...this.props} onDelete={this.deleteFile} />
    </div>;
  }
}

const mapStateToProps = (state) => ({
  initialValues: {
    companyName: profileSelectors.getCompanyName(state),
    vatNumber: profileSelectors.getVatNumber(state),
    idNumber: profileSelectors.getIdNumber(state)
  },
  isCompany: profileSelectors.getIsCompany(state),
  isModifying: profileSelectors.getIsModifying(state),
  isUploading: selectors.getIsUploading(state),
  isDeleting: selectors.getIsDeleting(state),
  isConfirmDeleteOpen: selectors.getIsConfirmDeleteOpen(state),
  documentName: profileSelectors.getDocumentName(state),
  documentUrl: selectors.getDocumentUrl(state)
});

export default reduxForm({
  form: 'onboarding-documents-form',
  fields: ['companyName', 'vatNumber', 'idNumber']
}, mapStateToProps, actions)(DocumentsForm);
