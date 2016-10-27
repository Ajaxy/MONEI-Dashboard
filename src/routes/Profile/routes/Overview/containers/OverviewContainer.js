import {connect} from 'react-redux';
import OverviewView from '../components/OverviewView';
import * as selectors from 'modules/profile/selectors';

const mapStateToProps = (state, ownProps) => ({
  profile: selectors.getProfile(state)
});

export default connect(mapStateToProps)(OverviewView);
