import React, {PropTypes} from 'react';
import PersonalDataView from 'routes/User/components/PersonalDataView';

export const OverviewView = ({user}) => {
  return (
    <PersonalDataView user={user} />
  );
};

OverviewView.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string
  }).isRequired
};

export default OverviewView;
