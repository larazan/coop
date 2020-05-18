import { useEffect } from 'react';
import { DOORBELL_APP_ID, DOORBELL_APP_KEY } from '../constants';
import { isUserFeedbackEnabled } from '../utils/featureFlag';
import { attachDoorbell, removeDoorbell } from './doorbell';

export function useDoorbellFeedback(feedbackEnabled) {
  useEffect(() => {
    if (isUserFeedbackEnabled()) {
      window.doorbellOptions = {
        id: DOORBELL_APP_ID,
        appKey: DOORBELL_APP_KEY
      };

      if (feedbackEnabled) {
        attachDoorbell(window, document);
      } else {
        removeDoorbell();
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
