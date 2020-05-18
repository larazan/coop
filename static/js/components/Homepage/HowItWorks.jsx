import React from 'react';
import './HowItWorks.scss';
import { Link } from 'react-router-dom';

const HowItWorks = () => (
  <section className="container how-it-works">
    <h2 id="how-it-works" className="u-anchor">
      How it works
    </h2>
    <ol>
      <li>
        <h3>Select a free delivery or collection slot that suits you.</h3>
      </li>
      <li>
        <h3>
          Fill your basket with our wide range of products from your local store. You need to spend
          a minimum of £15.
        </h3>
      </li>
      <li>
        <h3>We’ll pack your shopping for you.</h3>
      </li>
      <li>
        <h3>Track and keep up to date with your order.</h3>
      </li>
    </ol>
    <p>
      <Link to="/terms-of-service">See our terms of service</Link> for full details.
    </p>
  </section>
);

export default HowItWorks;
