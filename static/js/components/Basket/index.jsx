import PropTypes from 'prop-types';
import React from 'react';
import { useCheckoutFunnelBasket } from '../../hooks/useAnalytics';
import { isBasketDidYouForgetEnabled } from '../../utils/featureFlag';
import Section from '../Layout/Section';
import BookOrChangeSlot from '../OrderFulfilment/BookOrChangeSlot';
import PageHeader from '../PageHeader';
import productProps from '../propTypes/product';
import slot from '../propTypes/slot';
import './Basket.scss';
import BasketCrossSellProducts from './BasketCrossSellProducts';
import BasketItem from './BasketItem';
import BasketMessages from './BasketMessages';
import BasketSummaryContainer from './BasketSummary';
import { ItemRestrictionAlert } from '../Covid-19';

const Basket = ({
  basketItems,
  cannotCheckout,
  hasNoMinBasketValue,
  hasNoOrderFulfilment,
  history,
  orderFulfilment
}) => {
  useCheckoutFunnelBasket();
  return (
    <div className="basket" data-testid="basket">
      <ItemRestrictionAlert />
      <Section fillParentContainer theme="default">
        <PageHeader title="Basket" />
        <section className="basket--items">
          {basketItems.length > 0 ? (
            basketItems.map(product => <BasketItem key={product.id} {...product} />)
          ) : (
            <div className="basket--empty">Your basket is empty</div>
          )}
        </section>
      </Section>
      {isBasketDidYouForgetEnabled() && <BasketCrossSellProducts />}
      <Section fillParentContainer theme="default">
        <BasketSummaryContainer />
        <div className="basket--slots">
          <BookOrChangeSlot {...orderFulfilment} />
        </div>
        <div className="basket--bottom" data-testid="basket-bottom">
          <BasketMessages
            hasNoMinBasketValue={hasNoMinBasketValue}
            hasNoOrderFulfilment={hasNoOrderFulfilment}
          />
          <div className="basket--cta">
            <button
              type="button"
              className="btn btn--full btn--primary"
              disabled={cannotCheckout}
              onClick={() => history.push('/checkout')}
            >
              Checkout
            </button>
          </div>
        </div>
      </Section>
    </div>
  );
};
Basket.propTypes = {
  cannotCheckout: PropTypes.bool.isRequired,
  basketItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: productProps.id.isRequired,
      name: productProps.name.isRequired,
      images: productProps.images.isRequired,
      price: productProps.price.isRequired,
      quantity: PropTypes.number.isRequired
    })
  ).isRequired,
  orderFulfilment: PropTypes.shape({
    reservedSlot: PropTypes.shape(slot),
    selectedAddress: PropTypes.instanceOf(Object),
    fulfilmentType: PropTypes.string
  }),
  hasNoMinBasketValue: PropTypes.bool.isRequired,
  hasNoOrderFulfilment: PropTypes.bool.isRequired,
  history: PropTypes.instanceOf(Object).isRequired
};

Basket.defaultProps = {
  orderFulfilment: null
};

export default Basket;
