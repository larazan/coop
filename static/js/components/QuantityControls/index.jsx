import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as Decrement } from '../../assets/icons/basket-decrement.svg';
import { ReactComponent as Increment } from '../../assets/icons/basket-increment.svg';
import { ICON_SIZE_SMALL as iconDimensions } from '../../constants';
import { changeBasketQuantity, checkCanAdd } from '../../store/basket/actions';
import { isBasketAvailable, isMaxBasketSize } from '../../store/basket/selectors.shared';
import { hasHitMaxProductQuantity } from '../../store/products/selectors';
import './QuantityControls.scss';

const QuantityControls = React.memo(({ id, gtin, quantity }) => {
  const canAdd = useSelector(isBasketAvailable);
  const hasHitMaxQuantity = useSelector(s => hasHitMaxProductQuantity(s, id));
  const maxBasketSize = useSelector(isMaxBasketSize);

  function useGetActionCreator() {
    if (!canAdd) {
      return checkCanAdd;
    }

    return changeBasketQuantity;
  }

  const dispatch = useDispatch();
  const changeQtyAction = useGetActionCreator();
  const decrement = () => dispatch(changeQtyAction(gtin, quantity - 1));
  const increment = () => dispatch(changeQtyAction(gtin, quantity + 1));
  const { height, width } = iconDimensions;

  return quantity === 0 ? (
    <button
      type="button"
      className="btn btn--primary btn--full btn--icon btn--add-to-basket"
      onClick={increment}
      data-testid="product-card-add-to-basket-cta"
      disabled={maxBasketSize}
    >
      <span className="btn__text">Add to basket</span>
      <span className="btn__icon">
        <Increment height={height} width={width} />
      </span>
    </button>
  ) : (
    <div className="quantity-controls">
      <div className="quantity-display">
        <span data-testid="quantity-number">{`${quantity}${hasHitMaxQuantity ? ' max' : ''}`}</span>
      </div>
      <div className="quantity-buttons">
        <button
          className="quantity-btn remove"
          data-testid="quantity-btn-decrement"
          type="button"
          onClick={decrement}
        >
          <Decrement height={height} width={width} />
        </button>
        <button
          className="quantity-btn"
          data-testid="quantity-btn-increment"
          disabled={maxBasketSize || hasHitMaxQuantity}
          type="button"
          onClick={increment}
        >
          <Increment height={height} width={width} />
        </button>
      </div>
    </div>
  );
});

QuantityControls.propTypes = {
  id: PropTypes.string.isRequired,
  gtin: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired
};

export default QuantityControls;
