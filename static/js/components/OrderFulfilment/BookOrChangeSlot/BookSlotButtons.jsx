import React from 'react';
import { Link } from 'react-router-dom';
import '../../InfoBlock.scss';
import './BookOrChangeSlot.scss';

const BookSlotButtons = () => {
  return (
    <div className="order-slot">
      <>
        <Link to="/delivery" className="infoblock-click">
          <span className="infoblock--content">Book a slot for delivery</span>
        </Link>
        <Link to="/collection" className="infoblock-click">
          <span className="infoblock--content">Book a slot for collection</span>
        </Link>
      </>
    </div>
  );
};
export default BookSlotButtons;
