import React, {PropTypes} from 'react';
import Button from 'components/Button';
import CreateStore from '../containers/CreateStoreContainer';

export const ShopifyStoreView = ({profile, createShopifyStoreStart}) => {
  const shopifyStoreName = profile.user_metadata.shopifyStoreName;
  return (
    <section className="ui vertical segment">
      <div className="ui stackable grid">
        <div className="nine wide column">
          {shopifyStoreName
            ? <p>We have notified Shopify and your store will be ready in less than 24h. {' '}
            You'll get an email from Shopify asking you to set your password.</p>
            : <p>You don't have any Shopify demo store yet.</p>}
          <p className="text grey">Shopify Development stores are totally free until you put them to work. <br />
            That is: you don't pay a penny until you start accepting real orders.</p>
          {!shopifyStoreName && <Button primary onClick={createShopifyStoreStart}>
            Request your Shopify store now
          </Button>}
        </div>
      </div>
      <CreateStore />
    </section>
  );
};

ShopifyStoreView.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ShopifyStoreView;
