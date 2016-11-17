import React, {PropTypes} from 'react';
import cx from 'classnames';
import classNames from './GuidesView.scss';
import ShopifyGuide from './ShopifyGuide';
import PrestaShopGuide from './PrestaShopGuide';
import WooCommerceGuide from './WooCommerceGuide';
import shopifyLogo from 'static/shopify-logo.png';
import woocommerceLogo from 'static/woocommerce-logo.png';
import prestashopLogo from 'static/prestashop-logo.png';

const GuidesView = ({
  subAccount,
  copyToClipboard,
  selectedPlatform,
  selectPlatform,
  showNewMessage,
  isInSandboxMode,
  isMerchant
}) => (
  <section className="ui vertical segment">
    <div className="ui big breadcrumb">
      { selectedPlatform === 0
        ? <span className="selection">Select your platform</span>
        : <a className="section" onClick={() => selectPlatform(0)}>Select your platform</a>
      }
      { selectedPlatform !== 0 && <i className="right chevron icon divider" />}
      { selectedPlatform === 1 ?
        <span className="active section">WooCommerce</span>
        : selectedPlatform === 2 ?
          <span className="active section">Shopify</span>
        : selectedPlatform === 3 ?
          <span className="active section">PrestaShop</span>
        : null
      }
    </div>
    <section className={classNames.guide}>
      {selectedPlatform === 0 ?
        <div className="ui three column grid">
          <div className="row">
            <div className={cx('column', classNames.link)} onClick={() => selectPlatform(1)}>
              <img src={woocommerceLogo} alt="WooCommerce" />
            </div>
            <div className={cx('column', classNames.link)} onClick={() => selectPlatform(2)}>
              <img src={shopifyLogo} alt="Shopify" />
            </div>
            <div className={cx('column', classNames.link)} onClick={() => selectPlatform(3)}>
              <img src={prestashopLogo} alt="PrestaShop" />
            </div>
          </div>
        </div>
        : selectedPlatform === 1 ?
          <WooCommerceGuide />
        : selectedPlatform === 2 ?
          <ShopifyGuide {...{subAccount, copyToClipboard, showNewMessage, isInSandboxMode, isMerchant}} />
        : selectedPlatform === 3 ?
          <PrestaShopGuide />
        : null
      }
    </section>
    {selectedPlatform === 0 && <div className="ui center aligned vertical segment">
      <p>
        Your platform is not here? {' '}
        <a href="#" onClick={showNewMessage}>Contact us!</a>
      </p>
      <p>
        Are you hot on building your own MONEI integration? {' '}
        <a href="https://docs.monei.net/" target="_blank">Click here to read the API docs!</a>
      </p>
    </div>}
  </section>
);

export default GuidesView;
