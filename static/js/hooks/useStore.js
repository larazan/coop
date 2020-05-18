import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notifyHasSelectedStore } from '../store/order/actions';
import { getOrderStoreId, getStoreId } from '../store/order/selectors';
import { storeIdChanged } from '../store/shoppingIn/actions';
import { usePrevious } from './usePrevious';

export function useStoreHasChanged() {
  const storeId = useSelector(getStoreId);
  const prevStore = usePrevious(storeId);

  return { changed: prevStore && prevStore !== storeId, storeId };
}

export function useStoreChangeWatcher() {
  const dispatch = useDispatch();
  const { changed, storeId } = useStoreHasChanged();
  const reload = useCallback(() => dispatch(storeIdChanged({ storeId })), [dispatch, storeId]);

  useEffect(() => {
    if (changed) {
      reload();
    }
  }, [reload, changed]);
}

export function useHasCommittedToStore() {
  const initialOrderStoreId = null;
  const orderStoreId = useSelector(getOrderStoreId);

  return { committed: orderStoreId !== initialOrderStoreId, orderStoreId };
}

export function useHasCommittedToStoreWatcher() {
  const dispatch = useDispatch();
  const { committed } = useHasCommittedToStore();
  const notifyCommittedToStore = useCallback(() => dispatch(notifyHasSelectedStore()), [dispatch]);

  useEffect(() => {
    if (committed) {
      notifyCommittedToStore();
    }
  }, [committed, notifyCommittedToStore]);
}
