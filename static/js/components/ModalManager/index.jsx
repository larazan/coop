import React from 'react';
import { useSelector } from 'react-redux';
import { getShowCheckAvailability } from '../../store/ui/selectors';
import CheckProductAvailabilityContainer from '../MultiStore/CheckProductAvailability';

const ModalManager = () => {
  const showCheckAvailability = useSelector(getShowCheckAvailability);

  return showCheckAvailability ? (
    <CheckProductAvailabilityContainer visible={showCheckAvailability} />
  ) : null;
};

export default ModalManager;
