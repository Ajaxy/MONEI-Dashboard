import React, {PropTypes} from 'react';

const ShopifyGuide = ({channel, copy, showNewMessage, isInSandboxMode, isMerchant}) => (
  <div className="ui left aligned basic padded segment">
    <p>Open your Shopify Dashboard and go to the section <strong>Settings → Payments → Accept Credit Cards.</strong>&nbsp;
    Go to <strong>Acept Credit Cards</strong> section.</p>
    <p>Select <strong>MONEI</strong> from the menu <strong>Select a Credit Card Gateway</strong>.</p>
    <img className="ui fluid image shopify-screenshot" src="/shopify-screenshot.png" alt="shopify-screenshot"/>
    <p>Paste your credentials and set the checkboxes as shown below. You can copy each field below to the clipboard by clicking on it.</p> 
    <p>The data below is real and specific for your Shopify store. Click on the <strong>Activate</strong> button and happy sales!</p>
    <div className="shopify-frame ui stackable two column grid">
      <div className="column">
        <p className="shopify-text">Test Mode allows you to test the functionality of your payment gateway without any money
            changing hands.
            Transaction fees are not charged by Shopify on transactions completed in test mode.</p>
        {!isInSandboxMode ? <p className="shopify-text"><b>To activate the test mode please enable the "Test mode" switch in the header of your dashboard</b></p> : null}
        { isInSandboxMode && isMerchant ? 
          <p className="shopify-text">
            <b>To activate a production mode please disable "Test mode" switch in the header of your dashboard</b>
          </p>
          : null
        }
        <p className="shopify-text">For testing you can use <a href="https://docs.monei.net/reference/parameters#test-accounts" target="_blank"><b>Credit Card Test Accounts</b></a> or any valid credit card.</p>
        <p className="shopify-text">MONEI currently accepts the following card brands: <br/><b>VISA, MasterCard, Maestro, JCB</b></p>
      </div>
      <div className="column">
        <form className="shopify-form shopify-form_test-mode">
          <div className="shopify-form__row">
            <label className="margin-0">
              <input type="checkbox" checked={isInSandboxMode} disabled/> <b>Use test mode</b>
            </label>
          </div>
        </form>
        <form className="shopify-form">
          <div className="shopify-form__sub">
            Please provide your <a href="https://monei.net/" target="_blank">MONEI</a> credentials:
          </div>
          <div className="shopify-form__row">
            <label>Sender ID</label>
            <input type="text" value={channel.sender} readOnly={true} onClick={() => copy(channel.sender, "Sender ID")}/>
          </div>
          <div className="shopify-form__row">
            <label>Channel ID</label>
            <input type="text" value={channel.channel} readOnly={true} onClick={() => copy(channel.channel, "Channel ID")}/>
          </div>
          <div className="shopify-form__row">
            <label>Login</label>
            <input type="text" value={channel.login} readOnly={true} onClick={() => copy(channel.login, "Login")}/>
          </div>
          <div className="shopify-form__row">
            <label>Password</label>
            <input type="text" value={channel.pwd} readOnly={true} onClick={() => copy(channel.pwd, "Password")}/>
          </div>

          <h3 className="shopify-form__heading">Cards accepted</h3>
          <ul className="shopify-accepted-cards">
            <li>
              <input type="checkbox" checked={true} disabled/>
              <i className="shopify-ico shopify-ico-visa"></i>
            </li>
            <li>
              <input type="checkbox" checked={true} disabled/>
              <i className="shopify-ico shopify-ico-mastercard"></i>
            </li>
            <li className="inactive">
              <input type="checkbox" checked={false} disabled/>
              <i className="shopify-ico shopify-ico-american-express"></i>
            </li>
            <li>
              <input type="checkbox" checked={true} disabled/>
              <i className="shopify-ico shopify-ico-maestro"></i>
            </li>
            <li>
              <input type="checkbox" checked={true} disabled/>
              <i className="shopify-ico shopify-ico-jcb"></i>
            </li>
          </ul>
        </form>
      </div>
    </div>
  </div>
);

export default ShopifyGuide;