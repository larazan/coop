import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { getAddressListFromPostcode } from '../../../store/addresses/actions';
import { getOptions } from '../../../store/addresses/selectors';
import { selectAddress } from '../../../store/order/actions';
import { getDeliveryStore, getPostcode } from '../../../store/shoppingIn/selectors';
import { isDelivery } from '../../../store/slots/selectors';
import AddressList from './AddressList';
import Section from '../../Layout/Section';
import PageHeader from '../../PageHeader';

const redirectHome = redirect => (redirect ? <Redirect to="/" /> : null);

const ConfirmAddressOnly = ({ onClickAddress, options }) => {
  const [redirect, setRedirect] = useState(false);
  const [hasSeenOptions, setHasSeenOptions] = useState(false);

  // TODO maybe show a loading skeleton whilst fetching addresses?

  useEffect(() => {
    // one-time set
    if (!hasSeenOptions && options) {
      setHasSeenOptions(true);
    }

    // close this component if an address has been selected (which nulls the options)
    if (hasSeenOptions && !options) {
      setRedirect(true);
    }
  }, [hasSeenOptions, options]);

  return (
    <Section fillParentContainer theme="default">
      <>
        {redirectHome(redirect)}
        <PageHeader title="Confirm address" />
        <AddressList options={options} onClick={address => onClickAddress(address)} />
      </>
    </Section>
  );
};

ConfirmAddressOnly.propTypes = {
  onClickAddress: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      displayName: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired
    })
  )
};

ConfirmAddressOnly.defaultProps = {
  onClickAddress: () => null,
  options: []
};
export default ConfirmAddressOnly;

const okToRender = ({ postcode, store, validSlot }) => {
  // <Redirect /> if there's no shopping-in delivery store
  // <Redirect /> if there's no postcode
  // <Redirect /> if the slot is invalid
  return !(!postcode || !store || !validSlot);
};

export const ConfirmAddressOnlyContainer = () => {
  // get the slot details from the url
  const { date, slotId } = useParams();

  const postcode = useSelector(getPostcode);
  const store = useSelector(getDeliveryStore);
  const validSlot = useSelector(isDelivery({ date, id: slotId }));

  const options = useSelector(getOptions);

  const dispatch = useDispatch();

  // load addresses on mount
  useEffect(() => {
    if (postcode) {
      dispatch(getAddressListFromPostcode(postcode));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postcode]);

  if (!okToRender({ postcode, store, validSlot })) {
    return <Redirect to="/" />;
  }

  const onClickAddress = address => {
    const { link } = address;
    const { id: storeId } = store;
    dispatch(selectAddress({ link, storeId, slot: { slotId, date } }));
  };

  return <ConfirmAddressOnly onClickAddress={onClickAddress} options={options} />;
};
