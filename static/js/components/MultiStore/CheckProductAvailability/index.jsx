import { isEmpty } from 'lodash/fp';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { basketUnavailable } from '../../../store/basket/selectors';
import { selectPostcode } from '../../../store/shoppingIn/actions';
import { isFetching as isFetchingSelector, getError } from '../../../store/shoppingIn/selectors';
import { hideCheckAvailability } from '../../../store/ui/actions';
import { isValidPostcode } from '../../../utils/isValidPostcode';
import PostcodeSearch from '../../OrderFulfilment/PostcodeSearch';
import ProductSummaryCard from '../../ProductSummaryCard';
import UtilitySheet from '../../UtilitySheet/index';

export const ShowUnavailable = ({ close, location, products }) => {
  function getTitle() {
    const unavailableIn = `unavailable in ${location}`;

    if (products.length > 1) {
      return `These products are ${unavailableIn}`;
    }

    return `This product is ${unavailableIn}`;
  }

  return (
    <div data-testid="product-unavailable">
      <header className="utility-sheet__header">
        <h3 className="utility-sheet__heading">{getTitle()}</h3>
      </header>
      {products.map(product => {
        const { displayPrice, images, name, quantity, size, sizeUnit } = product;
        return (
          <ProductSummaryCard
            key={product.id}
            displayPrice={displayPrice}
            images={images}
            name={name}
            quantity={quantity}
            size={size}
            sizeUnit={sizeUnit}
          />
        );
      })}
      <footer className="utility-sheet__footer">
        <button className="btn btn--primary btn--full" type="button" onClick={close}>
          Continue
        </button>
      </footer>
    </div>
  );
};
ShowUnavailable.propTypes = {
  close: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired
};

const CheckProductAvailabilityContainer = () => {
  const dispatch = useDispatch();
  const closeAction = () => dispatch(hideCheckAvailability());
  const onClickSetPostcode = postcode => dispatch(selectPostcode(postcode));
  const isFetching = useSelector(isFetchingSelector);
  const { products: unavailableProducts, unavailableIn } = useSelector(basketUnavailable);
  const location = isValidPostcode(unavailableIn) ? unavailableIn.toUpperCase() : unavailableIn;
  const error = useSelector(getError);

  return (
    <UtilitySheet isPadded visible close={closeAction} data-testid="utility-sheet">
      {isEmpty(unavailableProducts) ? (
        <>
          <PostcodeSearch
            error={error}
            isFetching={isFetching}
            label="Check availability"
            onSubmitPostcode={onClickSetPostcode}
            placeholder="Enter a postcode"
          />
          <p className="mv2">
            We need to know where you’re shopping from so that we can show the correct product
            range.
          </p>
        </>
      ) : (
        <ShowUnavailable close={closeAction} location={location} products={unavailableProducts} />
      )}
    </UtilitySheet>
  );
};

export default CheckProductAvailabilityContainer;
