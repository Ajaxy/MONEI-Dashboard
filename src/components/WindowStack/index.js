import WindowStack from './WindowStack';
import {connect} from 'react-redux';
import * as actions from 'modules/modals/actions';
import * as selectors from 'modules/modals/selectors';

const mapStateToProps = (state) => ({
  modals: selectors.getModals(state)
});

export default connect(mapStateToProps, actions)(WindowStack);
