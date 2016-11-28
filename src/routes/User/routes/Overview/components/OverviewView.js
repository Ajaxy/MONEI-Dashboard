import React, {PropTypes} from 'react';
import PersonalDataView from 'routes/User/components/PersonalDataView';

export const OverviewView = ({user, documentUrl}) => {
  return (
    <PersonalDataView user={user} documentUrl={documentUrl}/>
  );
};

OverviewView.propTypes = {
  documentUrl: PropTypes.string,
  user: PropTypes.shape({
    name: PropTypes.string
  }).isRequired
};

export default OverviewView;
