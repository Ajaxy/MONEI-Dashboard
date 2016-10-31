import {connect} from 'react-redux';
import {getDocumentName} from 'modules/profile/selectors';
import * as selectors from '../modules/selectors';
import * as actions from '../modules/actions';
import DocumentView from '../components/DocumentView';

const mapStateToProps = (state) => ({
  documentName: getDocumentName(state),
  documentUrl: selectors.getFileUrl(state),
  isUploading: selectors.getIsFileUploading(state),
  isDeleting: selectors.getIsFileDeleting(state)
});

export default connect(mapStateToProps, actions)(DocumentView);

