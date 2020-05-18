import React from 'react';
import { Switch } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';
import { useBasketProductsLoader } from '../../hooks/useBasket';
import { useHasCommittedToStoreWatcher, useStoreChangeWatcher } from '../../hooks/useStore';
import { isAccountEnabled } from '../../utils/featureFlag';
import { PostSignIn } from '../Account/PostSignIn';
import { PreSignIn } from '../Account/PreSignIn';
import { SignOut } from '../Account/SignOut';
import Basket from '../Basket/container';
import Category from '../Category/container';
import Checkout from '../Checkout/container';
import ContactPage from '../Content/Contact';
import DeliveriesCollectionsRefunds from '../Content/DeliveriesCollectionsRefunds';
import PrivacyPage from '../Content/Privacy';
import RetiringAccounts from '../Content/RetiringAccounts';
import TermsOfService from '../Content/TermsOfService';
import Homepage from '../Homepage/container';
import ContentHeader from '../Layout/ContentHeader';
import UtilityHeader from '../Layout/UtilityHeader/container';
import OrderComplete from '../OrderComplete';
import Collection from '../OrderFulfilment/Collection';
import Delivery from '../OrderFulfilment/Delivery';
import { ConfirmAddressOnlyContainer } from '../OrderFulfilment/Delivery/ConfirmAddressOnly';
import PageNotFound from '../PageNotFound';
import Payment from '../Payment/Payment';
import PaymentProcessing from '../Payment/PaymentProcessing';
import Product from '../ProductDetails/container';
import SearchResults from '../SearchResults/container';
import AppRoute from './AppRoute';
import { Pathnames } from './pathnames';

/* eslint-disable react/jsx-props-no-spreading */
const UtilityRoute = props => <AppRoute header={UtilityHeader} hasFooter={false} {...props} />;
const ContentRoute = props => (
  <AppRoute header={UtilityHeader} footerProps={{ hasFulfilmentLinks: false }} {...props} />
);

const CheckoutRoute = props => (
  <AppRoute header={ContentHeader} hasFooter={false} feedback={false} {...props} />
);

const BasketRoute = props => <AppRoute hasFooter={false} {...props} />;
/* eslint-enable react/jsx-props-no-spreading */

const Routes = () => {
  useBasketProductsLoader();
  useStoreChangeWatcher();
  useHasCommittedToStoreWatcher();

  return (
    <LastLocationProvider>
      <Switch>
        <AppRoute exact path="/" component={Homepage} />
        <AppRoute path="/product/:id" component={Product} />
        <AppRoute path="/category/:id" component={Category} />
        <AppRoute path="/search" component={SearchResults} />
        <BasketRoute path="/basket" component={Basket} />
        <UtilityRoute path="/collection" component={Collection} />
        <UtilityRoute exact path="/delivery" component={Delivery} />
        <UtilityRoute
          exact
          path="/delivery/:date/:slotId"
          component={ConfirmAddressOnlyContainer}
        />
        <CheckoutRoute path="/checkout" component={Checkout} />
        <CheckoutRoute path="/payment" component={Payment} />
        <CheckoutRoute path="/payment-status" component={PaymentProcessing} />
        <CheckoutRoute
          path="/order-complete"
          component={OrderComplete}
          hasFooter
          footerProps={{ hasFulfilmentLinks: false }}
        />
        <ContentRoute path="/contact" component={ContactPage} />
        <ContentRoute
          path="/help/deliveries-collections-refunds"
          component={DeliveriesCollectionsRefunds}
        />
        <ContentRoute path="/terms-of-service" component={TermsOfService} />
        <ContentRoute path="/privacy" component={PrivacyPage} />
        <ContentRoute path="/customer-accounts" component={RetiringAccounts} />
        {isAccountEnabled() ? (
          <CheckoutRoute exact path={Pathnames.preSignIn} component={PreSignIn} />
        ) : null}
        {isAccountEnabled() ? (
          <AppRoute exact path={Pathnames.postSignIn} component={PostSignIn} hasFooter={false} />
        ) : null}
        {isAccountEnabled() ? (
          <AppRoute exact path={Pathnames.signOut} component={SignOut} hasFooter={false} />
        ) : null}
        <AppRoute component={PageNotFound} />;
      </Switch>
    </LastLocationProvider>
  );
};

export default Routes;
