import React from 'react';
import UserHeader from 'routes/User/components/UserHeader';
import PersonalDataView from 'routes/User/components/PersonalDataView';
import ChangePhoneView from './ChangePhoneView';
import ChangePasswordForm from '../containers/ChangePasswordForm';

const ProfileView = ({user}) => (
  <section className="ui basic segment padded-bottom">
    <div className="ui segments">
      <div className="ui segment padded-bottom">
        <UserHeader {...{user}}/>
        <h4 className="ui dividing header">My personal data</h4>
        <PersonalDataView user={user} />
        <h4 className="ui dividing header">Change my phone</h4>
        <ChangePhoneView user={user} />
        <h4 className="ui dividing header">Change my password</h4>
        <ChangePasswordForm user={user} isUpdating={false} />        
      </div>
    </div>
  </section>
);

export default ProfileView;