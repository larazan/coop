import isEmpty from 'lodash/fp/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCollectionStores, getCollectionStores } from '../../../store/addresses/actions';
import { selectCollectionStore } from '../../../store/order/actions';
import PostcodeSearch from '../PostcodeSearch';
import PageHeader from '../../PageHeader';
import StoreLocationCard from '../StoreLocationCard';

const SelectStore = ({
  error,
  isFetching,
  onSelectStore,
  onSubmitPostcode,
  postcode,
  setChangeAddress,
  stores
}) => {
  const hasAddressOptions = !isEmpty(stores);

  return (
    <div className="order-fulfilment">
      <div className="container">
        <PageHeader title="Choose a store for collection" />
        <PostcodeSearch
          btnClassName="btn btn--secondary form-button"
          btnContent="Find store"
          error={error}
          initialPostcode={postcode}
          isFetching={isFetching}
          label="Enter a postcode"
          onSubmitPostcode={p => onSubmitPostcode(p)}
        />
        {hasAddressOptions ? (
          <div className="card-list" role="listbox" data-testid="address-list">
            {stores.map(store => (
              <StoreLocationCard
                key={store.id}
                onClick={() => {
                  onSelectStore(store);
                  setChangeAddress(false);
                }}
                {...store}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

SelectStore.propTypes = {
  error: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  onSelectStore: PropTypes.func,
  onSubmitPostcode: PropTypes.func,
  postcode: PropTypes.string,
  setChangeAddress: PropTypes.func,
  stores: PropTypes.instanceOf(Array)
};

SelectStore.defaultProps = {
  error: null,
  onSubmitPostcode: () => null,
  onSelectStore: () => null,
  postcode: '',
  setChangeAddress: () => null,
  stores: []
};

export const SelectStoreContainer = ({ error, isFetching, postcode, setChangeAddress }) => {
  // ! FIXME extract these selectors
  const stores = useSelector(s => s.addresses.collectionStores);

  const dispatch = useDispatch();
  const onSubmitPostcode = p => dispatch(getCollectionStores(p));
  const onSelectStore = ({ id, name }) => {
    dispatch(selectCollectionStore({ id, name }));
    dispatch(clearCollectionStores());
  };

  return (
    <SelectStore
      error={error}
      isFetching={isFetching}
      onSubmitPostcode={onSubmitPostcode}
      onSelectStore={onSelectStore}
      postcode={postcode}
      setChangeAddress={setChangeAddress}
      stores={stores}
    />
  );
};

SelectStoreContainer.propTypes = {
  error: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  postcode: PropTypes.string,
  setChangeAddress: PropTypes.func
};

SelectStoreContainer.defaultProps = {
  error: null,
  postcode: '',
  setChangeAddress: () => null
};

export default SelectStore;
