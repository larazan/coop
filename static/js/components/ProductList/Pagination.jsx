import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../Button';
import { LoadingMoreProducts } from '../Loading/CategoryPage';
import Spinner from '../Loading/Spinner';
import './Pagination.scss';
import { productCountByKey } from '../../store/products/selectors';

export function getViewed({ count, totalCount }) {
  const ofXProducts = `${totalCount ? `of ${totalCount} products` : 'products'}`;

  return `You've viewed ${count} ${ofXProducts}`;
}

export function getTotalCount({ paginationTotalCount, totalCountByCategory }) {
  return totalCountByCategory || paginationTotalCount;
}

const Pagination = ({ keyForProductCount, count, loadMore }) => {
  const dispatch = useDispatch();
  const isFetching = useSelector(state => state.products.isFetchingMore);
  const totalCount = useSelector(state => productCountByKey(state, keyForProductCount));
  const viewed = getViewed({ totalCount, count });

  return (
    <>
      <div className="product-list--pagination">
        <span>{viewed}</span>
        {count < totalCount ? (
          <Button
            className="btn--secondary btn--full"
            onClick={() => dispatch(loadMore)}
            disabled={isFetching}
          >
            {isFetching ? <Spinner /> : 'Show more products'}
          </Button>
        ) : null}
      </div>
      {isFetching ? <LoadingMoreProducts /> : null}
    </>
  );
};

Pagination.propTypes = {
  keyForProductCount: PropTypes.string,
  count: PropTypes.number.isRequired,
  loadMore: PropTypes.instanceOf(Object).isRequired
};

Pagination.defaultProps = {
  keyForProductCount: null
};

export default Pagination;
