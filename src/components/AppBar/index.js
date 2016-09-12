import {connect} from 'react-redux';
import AppBar from './AppBar';
import {signOut} from 'modules/auth/actions';
import * as selectors from 'modules/profile/selectors';

const mapActionCreators = {
  signOut
};

const mapStateToProps = (state) => ({
  profile: selectors.getProfile(state),
  isFreeUser: selectors.getIsFreeUser(state)
});

export default connect(mapStateToProps, mapActionCreators)(AppBar);


