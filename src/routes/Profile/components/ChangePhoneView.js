import React from 'react';

const ChangePhoneView = ({user}) => (
  <div className="ui basic segment">
    <form className="ui large form">
      <div className="inline fields">
        <div className="fourteen wide field">
          <div className="ui labeled input">
            <div className="ui label">Phone number</div>
            <input type="text" placeholder="Enter number with country code..."/>
          </div>
        </div>
        <div className="two wide field">
          <div className="ui submit button fluid green">Verify</div>
        </div>
      </div>
    </form>
  </div>
);

export default ChangePhoneView;