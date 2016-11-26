import React, {PropTypes} from 'react';
import Button from 'components/Button';

export const ShopifyStoreView = ({profile}) => {
  return (
    <section className="ui vertical segment">
      <div className="ui stackable grid">
        <div className="nine wide column">
          <p>You don't have any Shopify demo store yet.</p>
          <p className="text grey">Shopify Development stores are totally free until you put them to work. <br />
            That is: you don't pay a penny until you start accepting real orders.</p>
          <Button primary>
            Request your Shopify store now
          </Button>
        </div>
      </div>
    </section>
  );
};

ShopifyStoreView.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ShopifyStoreView;
