import React from 'react';
import PropTypes from 'prop-types';

import './ProductDisclaimer.scss';

const ProductDisclaimer = ({ promotions }) => (
  <>
    {promotions.filter(Boolean).length > 0 && (
      <footer className="product-view--infoblock product-view--disclaimer">
        <h2>Disclaimer</h2>
        <p>
          The Co-op take care in everything we do and have put this product information together to
          help you get a feel for the product and have tried to make sure everything is as accurate
          as possible. However food products are regularly improved, the product information,
          ingredients, nutritional guides and dietary or allergy advice may occasionally change. You
          should always read the product label before consumption and not rely solely on the
          information provided on the website.
        </p>
        <p>
          If you have any queries, or you&apos;d like advice on any Co-op brand products, please
          contact Co-op Customer Services, or the product manufacturer if not a Co-op brand product.
        </p>
        <p>
          Although product information is regularly updated, Co-op is unable to accept liability for
          any incorrect information. This does not affect your statutory rights.
        </p>
        <p>
          For further information around promotional terms and conditions please visit{' '}
          <a href="https://food.coop.co.uk/deals/all">https://food.coop.co.uk/deals/all</a>
        </p>
      </footer>
    )}
  </>
);

ProductDisclaimer.defaultProps = {
  promotions: []
};

ProductDisclaimer.propTypes = {
  promotions: PropTypes.arrayOf(PropTypes.string)
};

export default ProductDisclaimer;
