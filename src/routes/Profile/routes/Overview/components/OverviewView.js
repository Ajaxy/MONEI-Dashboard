import React, {PropTypes} from 'react';
import PersonalDataView from 'routes/User/components/PersonalDataView';

export const OverviewView = ({profile, documentUrl}) => {
  return (
    <PersonalDataView user={profile} documentUrl={documentUrl} />
  );
};

OverviewView.propTypes = {
  documentUrl: PropTypes.string,
  profile: PropTypes.shape({
    name: PropTypes.string
  }).isRequired
};

export default OverviewView;
