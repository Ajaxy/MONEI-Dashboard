import {connect} from 'react-redux';
import * as actions from 'routes/Profile/modules/actions';
import * as selectors from 'routes/Profile/modules/selectors';
import ConfirmDelete from '../components/ConfirmDelete';

const mapStateToProps = (state) => ({
  isDeleting: selectors.getIsFileDeleting(state),
  isOpen: selectors.getIsDeleteModalOpen(state)
});

export default connect(mapStateToProps, actions)(ConfirmDelete);
