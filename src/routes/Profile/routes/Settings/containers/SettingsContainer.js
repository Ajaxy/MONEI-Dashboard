import {connect} from 'react-redux';
import SettingsView from '../components/SettingsView';
import {getProfile} from 'modules/profile/selectors';
import * as selectors from '../modules/selectors';
import * as actions from '../modules/actions';

const mapStateToProps = (state) => {
  const profile = getProfile(state);
  return {
    profile
  };
};

export default connect(mapStateToProps, actions)(SettingsView);
