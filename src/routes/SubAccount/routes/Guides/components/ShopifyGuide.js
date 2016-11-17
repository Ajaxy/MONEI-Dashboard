import React, {PropTypes} from 'react';
import shopifyScreenshot from 'static/shopify-screenshot.png';

const ShopifyGuide = ({subAccount, copyToClipboard, showNewMessage, isInSandboxMode, isMerchant}) => (
  <div className="ui vertical segment">
    <p>
      Open your Shopify Dashboard and go to the section <strong>Settings → Payments → Accept Credit
      Cards.</strong>&nbsp;
      Go to <strong>Acept Credit Cards</strong> section.
    </p>
    <p>Select <strong>MONEI</strong> from the menu <strong>Select a Credit Card Gateway</strong>.</p>
    <img className="ui fluid image shopify-screenshot" src={shopifyScreenshot} alt="shopify-screenshot" />
    <p>Paste your credentials and set the checkboxes as shown below. You can copy each field below to the clipboard by
    </p>
    <p>The data below is real and specific for your Shopify store. Click on the <strong>Activate</strong> button and
    </p>
    <div className="shopify-frame ui stackable two column grid">
      <div className="column">
        <p className="shopify-text">Test Mode allows you to test the functionality of your payment gateway without any
          money
          changing hands.
          Tra</p>
        {!isInSandboxMode &&
        <p className="shopify-text">
          <b>To activate the test mode please enable the "Test mode" switch in the header of
          </b>
        </p>}
        {isInSandboxMode && isMerchant && <p className="shopify-text">
          <b>To activate a production mode please disable "Test mode" switch in the header of your dashboard</b>
        </p>}
        <p className="shopify-text">For testing you can use <a
          href="https://docs.monei.net/reference/parameters#test-accounts" target="_blank"><b>Credit Card Test
          Accounts</b></a> or any valid credit card.</p>
        <p className="shopify-text">MONEI currently accepts the following card brands: <br /><b>VISA, MasterCard,
        </b></p>
      </div>
      <div className="column">
        <form className="shopify-form shopify-form_test-mode">
          <div className="shopify-form__row">
            <label className="margin-0">
              <input type="checkbox" checked={isInSandboxMode} disabled /> <b>Use test mode</b>
            </label>
          </div>
        </form>
        <form className="shopify-form">
          <div className="shopify-form__sub">
            Please provide your <a href="https://monei.net/" target="_blank">MONEI</a> credentials:
          </div>
          <div className="shopify-form__row">
            <label>Sender ID</label>
            <input type="text" value={subAccount.sender} readOnly
              onClick={() => copyToClipboard(subAccount.sender, 'Sender ID')} />
          </div>
          <div className="shopify-form__row">
            <label>Channel ID</label>
            <input type="text" value={subAccount.channel} readOnly
              onClick={() => copyToClipboard(subAccount.channel, 'Channel ID')} />
          </div>
          <div className="shopify-form__row">
            <label>Login</label>
            <input type="text" value={subAccount.login} readOnly
              onClick={() => copyToClipboard(subAccount.login, 'Login')} />
          </div>
          <div className="shopify-form__row">
            <label>Password</label>
            <input type="text" value={subAccount.pwd} readOnly
              onClick={() => copyToClipboard(subAccount.pwd, 'Password')} />
          </div>

          <h3 className="shopify-form__heading">Cards accepted</h3>
          <ul className="shopify-accepted-cards">
            <li>
              <input type="checkbox" checked disabled />
              <i className="shopify-ico shopify-ico-visa" />
            </li>
            <li>
              <input type="checkbox" checked disabled />
              <i className="shopify-ico shopify-ico-mastercard" />
            </li>
            <li className="inactive">
              <input type="checkbox" checked={false} disabled />
              <i className="shopify-ico shopify-ico-american-express" />
            </li>
            <li>
              <input type="checkbox" checked disabled />
              <i className="shopify-ico shopify-ico-maestro" />
            </li>
            <li>
              <input type="checkbox" checked disabled />
              <i className="shopify-ico shopify-ico-jcb" />
            </li>
          </ul>
        </form>
      </div>
    </div>
  </div>
);

export default ShopifyGuide;
