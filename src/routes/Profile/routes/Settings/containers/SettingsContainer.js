import {connect} from 'react-redux';
import SettingsView from '../components/SettingsView';
import {getIsReadyForProduction} from 'modules/profile/selectors';
import * as actions from '../modules/actions';

const mapStateToProps = (state) => {
  return {
    isAllowedVerification: getIsReadyForProduction(state)
  }
};


export default connect(mapStateToProps, actions)(SettingsView);
