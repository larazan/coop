/* istanbul ignore file */

export const create = id => {
  const parentScript = document.createElement('script');
  parentScript.id = '#smartSurvey';
  document.body.appendChild(parentScript);
  const ss = document.createElement('script');
  ss.type = 'text/javascript';
  ss.async = true;
  ss.src = `${
    document.location.protocol === 'https:' ? 'https://' : 'http://'
  }www.smartsurvey.co.uk/s/r/embed.aspx?i=725963&c=${id}`;
  parentScript.parentNode.insertBefore(ss, parentScript);
};
