import React from 'react';
import AlertCard from '../../AlertCard';
import { getMaxBasketSize } from '../../../utils/environment';

export const ServiceRestrictionAlert = () => (
  <AlertCard title="Demand for deliveries is really&nbsp;high">
    <p>
      Some of our delivery slots are booked up now. Keep checking back to see when more
      become&nbsp;available.
    </p>
    <p>{`To ensure availability for all our customers, some products have limits and you can only order a maximum of ${getMaxBasketSize()} items in total.`}</p>
    <p>
      <a href="https://www.coop.co.uk/coronavirus">
        Find out how we are helping communities during the coronavirus&nbsp;outbreak.
      </a>
    </p>
  </AlertCard>
);

export default ServiceRestrictionAlert;
