import {reduxForm} from 'redux-form';
import UpdateMetaData from '../components/UpdateMetaData';
import {getProfile} from 'modules/profile/selectors';
import * as selectors from '../modules/selectors';
import * as actions from '../modules/actions';
import countries, {findByCode} from 'lib/countries';

const mapStateToProps = (state) => {
  const profile = getProfile(state);
  const country = findByCode(profile.geoip.country_code).name;
  return {
    countries,
    isUpdatingMetaData: selectors.getIsUpdatingMetaData(state),
    initialValues: {
      country,
      profile_type: 'individual',
      ...profile.user_metadata
    } || {}
  };
};

export default reduxForm({
  form: 'updateMetaData',
  fields: ['name', 'profile_type', 'country']
}, mapStateToProps, actions)(UpdateMetaData);
