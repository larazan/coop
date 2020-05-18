import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

const Contact = () => (
  <main className="container u-container-padded">
    <h1>Contact customer support</h1>
    <p>
      If you’re about to contact us about your delivery, collection or a refund then you might want
      to take a look at our support pages:
    </p>

    <nav>
      <ul className="content-list--plain">
        <li>
          <Link to="/help/deliveries-collections-refunds#change-slot">
            Find out about deliveries, collections and refunds
          </Link>
        </li>
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

    <p>For anything else:</p>
    <h3>Email</h3>
    <p>
      <a href="mailto:cooponlinedelivery@coop.co.uk">cooponlinedelivery@coop.co.uk</a>
    </p>
    <h3>Phone</h3>
    <p>
      <a href="tel:03300417737">0330 041 7737</a>
    </p>
    <p>
      Calls are free and we are open 9am to 10pm Monday to Saturday, and 11am to 5pm on Sundays.
    </p>

    <p>We can help with:</p>
    <ul>
      <li>general support</li>
      <li>product issues or returns</li>
    </ul>

    <h2>Make and deal with a complaint</h2>
    <p>
      Contact our support team if for any reason you are unhappy with the service you have received
      and would like to make a complaint.
    </p>
    <h3>Email</h3>
    <p>
      <a href="mailto:cooponlinedelivery@coop.co.uk">cooponlinedelivery@coop.co.uk</a>
    </p>
    <h3>Phone</h3>
    <p>
      <a href="tel:03300417737">0330 041 7737</a>
    </p>
    <p>You can send a letter with any details of your complaint to:</p>
    <address>
      Co-op Food
      <br />
      Customer Relations
      <br />
      Freepost MR 9473
      <br />
      Manchester
      <br />
      M4 8BA
      <br />
    </address>
    <p>
      If you are not happy with how we have handled your complaint you can&nbsp;
      <a href="https://ec.europa.eu/consumers/odr/main/?event=main.consumer.rights">
        contact the European Commission Online Dispute Resolution
      </a>
      . Your complaint will be handled by an independent dispute resolution body.
    </p>
  </main>
);

export default Contact;
