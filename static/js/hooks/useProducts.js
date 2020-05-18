import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadProductsByGtin } from '../store/products/actions';
import { useStoreHasChanged } from './useStore';

export function useProductsByGtins(gtins) {
  const dispatch = useDispatch();
  const { changed: hasStoreChanged } = useStoreHasChanged();
  const loadProducts = useCallback(() => dispatch(loadProductsByGtin(gtins)), [dispatch, gtins]);

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasStoreChanged]);
}
