import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReactComponent as BasketIcon } from '../../../assets/icons/basket.svg';
import {
  formattedBasketTotal,
  isFetching as isFetchingSelector
} from '../../../store/basket/selectors';
import Spinner from '../../Loading/Spinner';

const basketTotalSelector = formattedBasketTotal();

const BasketPill = () => {
  const basketTotal = useSelector(basketTotalSelector);
  const isFetching = useSelector(isFetchingSelector);

  return (
    <div className="app-header--basket">
      <Link to="/basket" className="app-header--basket-link">
        <span className="app-header--basket-value" data-testid="basket-cost">
          {isFetching ? <Spinner /> : basketTotal}
        </span>
        <span className="app-header--basket-icon-wrapper">
          <BasketIcon
            key="basket-icon-svg"
            className="app-header--basket-icon"
            data-testid="go-to-basket"
          />
        </span>
      </Link>
    </div>
  );
};

export default BasketPill;
