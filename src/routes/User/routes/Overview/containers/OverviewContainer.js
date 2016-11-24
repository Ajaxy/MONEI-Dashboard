import {connect} from 'react-redux';
import OverviewView from '../components/OverviewView';
import * as selectors from 'routes/User/modules/selectors';

const mapStateToProps = (state, ownProps) => ({
  user: selectors.getUser(state)
});

export default connect(mapStateToProps)(OverviewView);
