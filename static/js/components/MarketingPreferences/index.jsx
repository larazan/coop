import React, { createRef, useEffect } from 'react';
import * as SmartSurvey from './SmartSurvey';

const MarketingPreferences = () => {
  const id = '872044';
  const target = createRef();

  useEffect(() => {
    SmartSurvey.create(id);
  }, []);

  return (
    <div>
      <h2>
        We&rsquo;d love to keep you updated with the latest offers and benefits from Co-op Food
      </h2>
      <div id={`ss-embed-${id}`} ref={target} />
    </div>
  );
};

export default MarketingPreferences;
