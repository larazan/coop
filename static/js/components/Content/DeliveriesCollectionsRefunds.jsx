import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

const DeliveriesCollectionsRefunds = () => (
  <main className="container u-container-padded">
    <h1>Find out about deliveries, collections and refunds</h1>
    <p>
      We want our service to be as convenient for you as possible. But we understand that sometimes
      things might not always go as smoothly as we would like. On this page you can find out how to:
    </p>

    <nav>
      <ul className="content-list--plain">
        <li>
          <Link to="/help/deliveries-collections-refunds#missed-delivery">
            Get your order if you miss a delivery or collection
          </Link>
        </li>
        <li>
          <Link to="/help/deliveries-collections-refunds#refunds">Get a refund</Link>
          <ul className="content-list--plain">
            <li>
              <Link to="/help/deliveries-collections-refunds#refunds-damaged-product">
                for a damaged product
              </Link>
            </li>
            <li>
              <Link to="/help/deliveries-collections-refunds#refunds-missing-product">
                for a missing product
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>

    <h2 id="missed-delivery">Get your order if you miss your delivery or collection</h2>
    <p>
      You’ll need to collect your order from the Co-op store that processed it. We’ll only keep it
      until store closing time of your chosen delivery or collection date.
    </p>
    <p>
      If you can’t collect your order, we’ll give you a refund. However, you’ll be charged for the
      cost of delivery plus any fresh products. For more details{' '}
      <Link to="/terms-of-service">read our Terms and Conditions</Link>.
    </p>

    <h2 id="refunds">Get a refund</h2>
    <p>We do not offer refunds for the following products unless they are damaged or faulty:</p>
    <ul>
      <li>Fresh or frozen food</li>
      <li>
        Products that cannot be returned for hygiene or safety reasons once unwrapped, unpackaged or
        unsealed
      </li>
      <li>Newspapers and magazines</li>
    </ul>
    <p>
      For all other products, you have 30 days to return it to a store for an exchange or refund. If
      you return all the products from your order, we will also refund the cost of delivery.
    </p>
    <p>You will get your refund 3 working days after you request it.</p>

    <h2 id="refunds-damaged-product">Get a refund for a damaged product</h2>
    <p>
      We do not offer exchanges but we will refund the cost of any faulty or damaged products. If
      it’s a fresh product (anything with a best before date) then you must contact us before it
      goes out of date.
    </p>
    <p>
      Call our support team on <a href="tel:03300417737">0330 041 7737</a> or email{' '}
      <a href="mailto:cooponlinedelivery@coop.co.uk">cooponlinedelivery@coop.co.uk</a>.
    </p>
    <p>
      This is only a summary of your legal rights. They are subject to certain exceptions. For
      detailed information call <a href="tel:03454040506">03454 04 05 06</a> or visit the{' '}
      <a href="https://www.citizensadvice.org.uk/">Citizens Advice website</a>.
    </p>

    <h2 id="refunds-missing-product">Get a refund for a missing product </h2>
    <p>
      If any of your order is missing call our support team on{' '}
      <a href="tel:03300417737">0330 041 7737</a> or email{' '}
      <a href="mailto:cooponlinedelivery@coop.co.uk">cooponlinedelivery@coop.co.uk</a>.
    </p>
  </main>
);

export default DeliveriesCollectionsRefunds;
