import { isNil } from 'lodash/fp';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { pageTypes } from '../../api/cms/banner/constants';
import { usePrevious } from '../../hooks/usePrevious';
import { ServiceRestrictionAlert } from '../Covid-19';
import Section from '../Layout/Section';
import SlotInfo from '../OrderFulfilment/BookOrChangeSlot/SlotInfo';
import slotProps from '../propTypes/slot';
import QuickSlotPicker from '../OrderFulfilment/QuickSlotPicker/container';
import { SupplierBannerByPage } from '../SupplierBanner';
import Hero from './Hero';
import HowItWorks from './HowItWorks';
import MealIdeas from './MealIdeas';
import ReasonsToShop from './ReasonsToShop';
import SponsoredProducts from './SponsoredProducts';

const PickerOrPlayback = ({ orderFulfilment, storeId }) => {
  const { reservedSlot } = orderFulfilment;
  if (isNil(reservedSlot) && isNil(storeId)) {
    return <QuickSlotPicker />;
  }

  const { fulfilmentType, selectedAddress } = orderFulfilment;
  return (
    <Section theme="default">
      <SlotInfo
        fulfilmentType={fulfilmentType}
        reservedSlot={reservedSlot}
        selectedAddress={selectedAddress}
      />
    </Section>
  );
};

PickerOrPlayback.propTypes = {
  orderFulfilment: PropTypes.shape({
    fulfilmentType: PropTypes.string,
    reservedSlot: PropTypes.shape(slotProps),
    selectedAddress: PropTypes.instanceOf(Object)
  }),
  storeId: PropTypes.string
};

PickerOrPlayback.defaultProps = {
  orderFulfilment: {},
  storeId: null
};

const Homepage = ({ orderFulfilment, postcode, storeId }) => {
  const previousPostcode = usePrevious(postcode);

  useEffect(() => {
    if (postcode !== null && previousPostcode !== postcode) {
      window.scrollTo(0, 0);
    }
  }, [previousPostcode, postcode]);

  return (
    <>
      <ServiceRestrictionAlert />
      {postcode || storeId ? (
        <PickerOrPlayback orderFulfilment={orderFulfilment} storeId={storeId} />
      ) : (
        <Hero />
      )}
      <SupplierBannerByPage page={pageTypes.homepage} />
      <MealIdeas theme="default" />
      <SponsoredProducts />
      <HowItWorks />
      <ReasonsToShop />
    </>
  );
};

Homepage.propTypes = {
  orderFulfilment: PropTypes.shape({
    fulfilmentType: PropTypes.string,
    reservedSlot: PropTypes.shape(slotProps),
    selectedAddress: PropTypes.instanceOf(Object)
  }),
  // shopping-in
  postcode: PropTypes.string,
  storeId: PropTypes.string
};

Homepage.defaultProps = {
  orderFulfilment: {},
  postcode: null,
  storeId: null
};

export default Homepage;
