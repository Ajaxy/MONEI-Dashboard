import React from 'react';
import UserHeader from 'routes/User/components/UserHeader';
import PersonalDataView from 'routes/User/components/PersonalDataView';
import ChangePhoneForm from '../containers/ChangePhoneForm';
import ConfirmPhoneForm from '../containers/ConfirmPhoneForm';
import ChangePasswordForm from '../containers/ChangePasswordForm';

const ProfileView = ({user, isUsingAuth0UserPass}) => (
  <section className="ui basic segment padded-bottom">
    <div className="ui segments">
      <div className="ui segment padded-bottom">
        <UserHeader {...{user}}/>
        <h4 className="ui dividing header">My personal data</h4>
        <PersonalDataView user={user} />
        <h4 className="ui dividing header">Change my phone</h4>
        <ChangePhoneForm user={user}/>
        <ConfirmPhoneForm user={user}/>
        {isUsingAuth0UserPass && <h4 className="ui dividing header">Change my password</h4>}
        {isUsingAuth0UserPass && <ChangePasswordForm user={user} />}
      </div>
    </div>
  </section>
);

export default ProfileView;