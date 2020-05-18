import React from 'react';
import ContentCard from '../Content/ContentCard';
import britishSpotlight from '../../assets/images/british_spotlight_16_9@2x.jpg';
import fairtradeSpotlight from '../../assets/images/fairtrade_spotlight_16_9@2x.jpg';
import './ReasonsToShop.scss';

const ReasonsToShop = () => (
  <section className="container reasons-to-shop">
    <h2>Reasons to shop with us</h2>
    <ul>
      <li>
        <ContentCard
          theme="perk-card"
          title="Membership"
          content="Earn rewards <br /> for you and your <br /> community"
        />
      </li>
      <li>
        <ContentCard
          theme="feature-card"
          title="100% British"
          content="We support British farming and the amazing local food producers across the UK"
        >
          <img src={britishSpotlight} alt="100% British" />
        </ContentCard>
      </li>
      <li>
        <ContentCard
          theme="feature-card"
          title="Fairtrade"
          content="We support ethical trading and believe everyone involved in supplying our products
              should be treated fairly"
        >
          <img src={fairtradeSpotlight} alt="Fairtrade" />
        </ContentCard>
      </li>
    </ul>
  </section>
);

export default ReasonsToShop;
