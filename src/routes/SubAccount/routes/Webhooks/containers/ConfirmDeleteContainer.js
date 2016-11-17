import {connect} from 'react-redux';
import * as actions from '../modules/actions';
import * as selectors from '../modules/selectors';
import ConfirmDelete from '../components/ConfirmDelete';

const mapStateToProps = (state) => ({
  isDeleting: selectors.getIsDeleting(state),
  isOpen: selectors.getIsDeleteModalOpen(state),
  webhook: selectors.getActiveWebhook(state)
});

export default connect(mapStateToProps, actions)(ConfirmDelete);
