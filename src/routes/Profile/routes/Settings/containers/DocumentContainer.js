import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {getDocumentName} from 'modules/profile/selectors';
import * as selectors from '../modules/selectors';
import * as actions from '../modules/actions';
import DocumentView from '../components/DocumentView';

class Document extends Component {
  componentWillMount() {
    const {documentName, getFileUrl} = this.props;
    if(documentName) getFileUrl(documentName);
  }

  componentWillUpdate({documentName}) {
    if(documentName && documentName != this.props.documentName) {
      this.props.getFileUrl(documentName);
    }
  }

  render() {
    return (
      <DocumentView {...this.props} />
    )
  }
}

const mapStateToProps = (state) => ({
  documentName: getDocumentName(state),
  documentUrl: selectors.getFileUrl(state),
  isUploading: selectors.getIsFileUploading(state)
});

export default connect(mapStateToProps, actions)(Document);

