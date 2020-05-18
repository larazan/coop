import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import hero from '../../assets/images/food-instore@2x.jpg';
import ShopFromAStoreNearYou from '../MultiStore/ShopFromAStoreNearYou/container';
import './Hero.scss';

const Hero = () => (
  <div className="hero" data-theme="hero">
    <img src={hero} alt="Co-op Food Hero" className="hero--img" />
    <div className="container">
      <h1 className="hero__title">
        <span>On-demand groceries</span>
      </h1>
      <div className="hero__content">
        <div className="hero__checklist">
          <ul>
            <li>Delivery in as little as 2 hours</li>
            <li>Picked with care by our store team</li>
            <li>Collection or delivery for free</li>
          </ul>
          <p className="hero__cta">
            <Link to="#how-it-works">How it works</Link>
          </p>
        </div>
        <ShopFromAStoreNearYou label="See next available slot" />
      </div>
    </div>
  </div>
);

export default Hero;
