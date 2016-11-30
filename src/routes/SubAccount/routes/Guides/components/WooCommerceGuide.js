import React, {PropTypes} from 'react';
import YouTube from 'react-youtube';
import classNames from './WooCommerceGuide.scss';
import cx from 'classnames';

const WooCommerceGuide = ({subAccount, copyToClipboard, isInSandboxMode, isMerchant}) => (
  <div className="ui text container">
    <p>
      Download the latest version of {' '}
      <a href="https://github.com/MONEI/WooCommerce/archive/master.zip" download>MONEI WooCommerce plugin</a>
    </p>
    <p>Follow video instruction to install the plugin</p>
    <div className={cx('ui embed', classNames.video)}>
      <YouTube videoId="-RD7JhfPgfc" />
    </div>
    <br />
    <p>Copy credentials below in <b>MONEI Configuration Settings</b> as indicated in video instructions</p>
    <div className={cx('woocommerce', classNames.frame)}>
      <table className="form-table">
        <tbody>
          <tr>
            <th scope="row" className="titledesc">
              <label htmlFor="woocommerce_monei_operation_mode">Operation Mode</label>
            </th>
            <td className="forminp">
              <fieldset>
                <select className="select monei_mode" name="woocommerce_monei_operation_mode"
                        id="woocommerce_monei_operation_mode" disabled value={isInSandboxMode ? 'test' : 'live'}>
                  <option value="test">Test mode</option>
                  <option value="live">Live Mode</option>
                </select>
                <p className="description">You can switch between different environments, by selecting the corresponding
                  operation mode.</p>
              </fieldset>
            </td>
          </tr>
          <tr>
            <th scope="row" className="titledesc">
              <label htmlFor="woocommerce_monei_test_channel_id">Channel ID</label>
            </th>
            <td className="forminp">
              <fieldset>
                <input className="input-text regular-input " type="text" name="woocommerce_monei_test_channel_id"
                       id="woocommerce_monei_test_channel_id" value={subAccount.id} readOnly
                       onClick={() => copyToClipboard(subAccount.id, 'Channel ID')} />
              </fieldset>
            </td>
          </tr>
          <tr>
            <th scope="row" className="titledesc">
              <label htmlFor="woocommerce_monei_test_user_id">User ID</label>
            </th>
            <td className="forminp">
              <fieldset>
                <input className="input-text regular-input " type="text" name="woocommerce_monei_test_user_id"
                       id="woocommerce_monei_test_user_id" value={subAccount.login} readOnly
                       onClick={() => copyToClipboard(subAccount.login, 'User ID')} />
              </fieldset>
            </td>
          </tr>
          <tr>
            <th scope="row" className="titledesc">
              <label htmlFor="woocommerce_monei_test_password">Password</label>
            </th>
            <td className="forminp">
              <fieldset>
                <input className="input-text regular-input " type="text" name="woocommerce_monei_test_password"
                       id="woocommerce_monei_test_password" value={subAccount.pwd} readOnly
                       onClick={() => copyToClipboard(subAccount.pwd, 'Password')} />
              </fieldset>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <br />
    <p>
      You can test your configurations in our {' '}
      <a href="http://woocommerce.demo-monei.com/" target="_blank">DEMO WooCommerce store</a>
    </p>
    <p>
      <a href="http://woocommerce.demo-monei.com/wp-admin" target="_blank">DEMO WooCommerce admin dashboard</a>
    </p>
    <p>
      <b>Login:</b> MONEI_user <br />
      <b>Password:</b> MONEI_password
    </p>
  </div>
);

WooCommerceGuide.propTypes = {
  subAccount: PropTypes.object.isRequired,
  copyToClipboard: PropTypes.func.isRequired,
  isInSandboxMode: PropTypes.bool.isRequired,
  isMerchant: PropTypes.bool.isRequired
};

export default WooCommerceGuide;
