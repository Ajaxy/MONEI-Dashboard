import React, {PropTypes} from 'react';
import PersonalDataView from 'routes/User/components/PersonalDataView';

export const OverviewView = ({profile}) => {
  return (
    <PersonalDataView user={profile} />
  );
};

OverviewView.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string
  }).isRequired
};

export default OverviewView;
