import React from 'react';
import { LinkInNewTab } from '../Links';
import Notice from '../Notice';

const AgeChallengeNotice = () => (
  <Notice>
    If you are purchasing an age restricted product, you may be asked to show your ID when receiving
    your order due to our{' '}
    <LinkInNewTab
      to="https://www.drinkaware.co.uk/alcohol-facts/alcohol-and-the-law/buying-alcohol/"
      text="challenge 25 policy"
    />
    .
  </Notice>
);

export default AgeChallengeNotice;
