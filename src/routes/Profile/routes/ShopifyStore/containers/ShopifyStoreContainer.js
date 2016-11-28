import {connect} from 'react-redux';
import * as selectors from 'modules/profile/selectors';
import * as actions from '../../Settings/modules/actions';
import ShopifyStoreView from '../components/ShopifyStoreView';

const mapStateToProps = (state) => ({
  profile: selectors.getProfile(state)
});

export default connect(mapStateToProps, actions)(ShopifyStoreView);
