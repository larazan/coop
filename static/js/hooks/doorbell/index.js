let hasLoaded = false;

/**
 * Appends a Doorbell.io <script> tag to the document.
 *
 * (Kept as close as possible to the code snippet in the integration guide @ https://doorbell.io/applications/10381/setup)
 * @param {Object} w window object
 * @param {Object} d document object
 */
export function attachDoorbell(w, d) {
  function loadDoorbell() {
    if (hasLoaded) {
      return;
    }
    hasLoaded = true;
    window.doorbellOptions.windowLoaded = true;
    const doorbellScript = d.createElement('script');
    doorbellScript.id = 'doorbellScript';
    doorbellScript.type = 'text/javascript';
    doorbellScript.async = true;
    doorbellScript.src = `https://embed.doorbell.io/button/${
      window.doorbellOptions.id
    }?t=${new Date().getTime()}`;
    (d.getElementsByTagName('head')[0] || d.getElementsByTagName('body')[0]).appendChild(
      doorbellScript
    );
  }
  if (w.attachEvent) {
    w.attachEvent('onload', loadDoorbell);
  } else if (w.addEventListener) {
    w.addEventListener('load', loadDoorbell, false);
  } else {
    loadDoorbell();
  }
  if (d.readyState === 'complete') {
    loadDoorbell();
  }
}

export function removeDoorbell() {
  const head = document.getElementsByTagName('head')[0];
  const scriptInHead = head.querySelector('script#doorbellScript');
  const body = document.getElementsByTagName('body')[0];
  const scriptInBody = body.querySelector('script#doorbellScript');
  const removeAllNodes = () => {
    [...document.querySelectorAll("[id^='doorbell']")].map(n => n && n.remove());
  };

  hasLoaded = false;

  if (scriptInHead) {
    head.removeChild(scriptInHead);
  }

  if (scriptInBody) {
    body.removeChild(scriptInBody);
  }

  removeAllNodes();
}
