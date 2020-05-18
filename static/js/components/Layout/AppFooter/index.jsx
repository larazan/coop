import PropTypes from 'prop-types';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { isAccountEnabled } from '../../../utils/featureFlag';
import { Pathnames } from '../../App/pathnames';
import { LinkInNewTab } from '../../Links';
import ShopFromAStoreNearYou from '../../MultiStore/ShopFromAStoreNearYou/container';
import { NoticeWithIcon } from '../../Notice';
import BookOrChangeSlot from '../../OrderFulfilment/BookOrChangeSlot';
import slot from '../../propTypes/slot';
import './AppFooter.scss';

const FulfilmentLinks = ({ orderStoreId, postcode, orderFulfilment }) => (
  <div className="container order-slot--wrapper">
    {!postcode && !orderStoreId ? (
      <ShopFromAStoreNearYou />
    ) : (
      <BookOrChangeSlot
        fulfilmentType={orderFulfilment.fulfilmentType}
        reservedSlot={orderFulfilment.reservedSlot}
        selectedAddress={orderFulfilment.selectedAddress}
      />
    )}
  </div>
);

FulfilmentLinks.propTypes = {
  orderStoreId: PropTypes.string,
  orderFulfilment: PropTypes.shape({
    reservedSlot: PropTypes.shape(slot),
    selectedAddress: PropTypes.instanceOf(Object),
    fulfilmentType: PropTypes.string
  }),
  postcode: PropTypes.string
};

FulfilmentLinks.defaultProps = {
  orderFulfilment: null,
  orderStoreId: null,
  postcode: null
};

function usePreviousAccountMessage() {
  // TODO remove this message when the account feature flag is removed
  const { pathname } = useLocation();
  const isOnHomepage = pathname === Pathnames.home;
  if (!isAccountEnabled() && isOnHomepage) {
    return (
      <div className="container app-footer--links">
        <NoticeWithIcon>
          If you’re a customer who already had an account with us, you will no longer be able to
          sign into it. <Link to="/customer-accounts">Find out more</Link>.
        </NoticeWithIcon>
      </div>
    );
  }
  return null;
}

const AppFooter = ({ orderFulfilment, orderStoreId, hasFulfilmentLinks, postcode }) => {
  return (
    <>
      <footer className="app-footer">
        {hasFulfilmentLinks ? (
          <FulfilmentLinks
            orderFulfilment={orderFulfilment}
            orderStoreId={orderStoreId}
            postcode={postcode}
          />
        ) : null}

        {usePreviousAccountMessage()}

        <nav className="container app-footer--links">
          <ul className="app-footer--list">
            <li className="app-footer--list-item">
              <Link to="/contact">Contact customer support</Link>
            </li>
            <li className="app-footer--list-item">
              <Link to="/help/deliveries-collections-refunds">
                Find out about delivery and refunds
              </Link>
            </li>
            <li className="app-footer--list-item">
              <Link to="/terms-of-service">Terms of service</Link>
            </li>
            <li className="app-footer--list-item">
              <LinkInNewTab
                to="https://www.coop.co.uk/terms/privacy-notice"
                text="Privacy policy"
              />
            </li>
            <li className="app-footer--list-item">
              <LinkInNewTab
                to="https://www.coop.co.uk/product-information/product-recalls"
                text="Product recalls"
              />
            </li>
          </ul>
        </nav>
      </footer>
    </>
  );
};

AppFooter.propTypes = {
  hasFulfilmentLinks: PropTypes.bool,
  orderFulfilment: PropTypes.shape({
    reservedSlot: PropTypes.shape(slot),
    selectedAddress: PropTypes.instanceOf(Object),
    fulfilmentType: PropTypes.string
  }),
  orderStoreId: PropTypes.string,
  postcode: PropTypes.string
};

AppFooter.defaultProps = {
  orderStoreId: null
};

AppFooter.defaultProps = {
  hasFulfilmentLinks: true,
  orderFulfilment: null,
  postcode: null
};

export default AppFooter;
