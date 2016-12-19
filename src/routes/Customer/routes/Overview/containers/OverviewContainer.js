import {connect} from 'react-redux';
import OverviewView from '../components/OverviewView';
import * as selectors from 'routes/Customer/modules/selectors';



const mapStateToProps = (state) => ({
  customer: selectors.getCustomer(state),
  isFetching: selectors.getIsFetching(state)
});

export default connect(mapStateToProps)(OverviewView);
