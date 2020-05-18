import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { isCollection } from '../../constants';
import { useCheckoutFunnelComplete } from '../../hooks/useAnalytics';
import { isPaymentSuccessful } from '../../store/api/selectors/payment';
import { getComplete, isComplete } from '../../store/complete/selectors';
import { formatTimeSlot } from '../../utils/formatTimeSlot';
import BasketSummary from '../Basket/BasketSummary/BasketSummary';
import MarketingPreferences from '../MarketingPreferences';
import Confirmation from '../Notification/Confirmation';
import ProductSummaryCard from '../ProductSummaryCard';
import productProps from '../propTypes/product';
import slotProps from '../propTypes/slot';
import './OrderComplete.scss';

const fulfilmentLabel = (type, suffix) =>
  isCollection(type) ? `Collection ${suffix}` : `Delivery ${suffix}`;

const Component = ({
  address,
  customerEmail,
  fulfilmentType,
  visibleId,
  slot,
  totalBreakdown,
  products
}) => {
  useCheckoutFunnelComplete();
  return (
    <div className="container">
      <div className="order-complete--header">
        <Confirmation message="Payment successful" />

        <h1>Order placed</h1>
        <div data-testid="order-details">
          <div className="order-complete--order-detail">
            <div className="f6 form-hint">Order number</div>
            <p>{visibleId}</p>
          </div>
          <div className="order-complete--order-detail">
            <div className="f6 form-hint">{fulfilmentLabel(fulfilmentType, 'address')}</div>
            <p>{address}</p>
          </div>
          <div className="order-complete--order-detail">
            <div className="f6 form-hint">{fulfilmentLabel(fulfilmentType, 'time')}</div>
            <p>{formatTimeSlot(slot)}</p>
          </div>
        </div>

        <BasketSummary isCollection={isCollection(fulfilmentType)} {...totalBreakdown} />

        <p className="f6">
          You may notice on your bank account a different ‘pending transaction’ amount to your order
          total. This is because we pre-authorise an extra 10% of your order in case of any
          substitutions. You will only be charged for the products you receive.
        </p>
      </div>

      <div className="order-complete--items-ordered">
        <h3 className="infoblock-header">Items ordered</h3>
        <div className="infoblock-content">
          {products.map(product => (
            <ProductSummaryCard key={product.id} {...product} />
          ))}
        </div>
        <h3 className="infoblock-header">What happens next</h3>
        <div className="infoblock-content">
          <p>
            We have sent your order confirmation to {customerEmail} but if you don&#39;t receive it
            within two minutes, please check your spam folder.
          </p>
          <p>We will keep you updated with the progress of your order.</p>
        </div>

        <MarketingPreferences />
      </div>
    </div>
  );
};

Component.propTypes = {
  address: PropTypes.string.isRequired,
  customerEmail: PropTypes.string.isRequired,
  fulfilmentType: PropTypes.string.isRequired,
  visibleId: PropTypes.string.isRequired,
  slot: PropTypes.shape(slotProps).isRequired,
  totalBreakdown: PropTypes.instanceOf(Object).isRequired,
  products: PropTypes.arrayOf(PropTypes.shape(productProps)).isRequired
};

const OrderCompleteContainer = () => {
  const {
    basket: products,
    order: { address, customerEmail, fulfilmentType, totalBreakdown, visibleId },
    slot
  } = useSelector(getComplete);
  const complete = useSelector(isComplete);
  const paymentSuccessful = useSelector(isPaymentSuccessful);

  if (paymentSuccessful && !complete) {
    return null;
  }

  if (!paymentSuccessful && !complete) {
    return <Redirect to="/basket" />;
  }

  return (
    <Component
      address={address}
      customerEmail={customerEmail}
      fulfilmentType={fulfilmentType}
      products={products}
      slot={slot}
      totalBreakdown={totalBreakdown}
      visibleId={visibleId}
    />
  );
};

export default OrderCompleteContainer;
