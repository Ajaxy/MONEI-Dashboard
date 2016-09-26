import {connect} from 'react-redux';
import Header from './Header';
import {signOut} from 'modules/auth/actions';
import * as selectors from 'modules/profile/selectors';

const mapActionCreators = {
  signOut
};

const mapStateToProps = (state) => ({
  profile: selectors.getProfile(state),
  isAdmin: selectors.getIsAdmin(state)
});

export default connect(mapStateToProps, mapActionCreators)(Header);
