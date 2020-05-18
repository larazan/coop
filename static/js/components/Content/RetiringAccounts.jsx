import React from 'react';
import Section from '../Layout/Section';

const RetiringAccounts = () => (
  <Section fillParentContainer>
    <main className="container u-container-padded" data-testid="accounts">
      <h1>We’re improving customer accounts</h1>
      <p>
        We are working on our account area to give you a better experience when using our service.
      </p>
      <p>
        If you already had a shop.coop.co.uk account with us, you will no longer be able to sign in
        to it.
      </p>

      <p>Soon you will be able to</p>
      <ul>
        <li>sign in with your existing Co-op membership account details if you’re a member</li>
        <li>earn and redeem membership rewards</li>
        <li>shop with a personalised experience</li>
      </ul>
    </main>
  </Section>
);

export default RetiringAccounts;
