const legacyFolder = 'legacy-amplience';
const customHost = 'media.cks-fashion.com';

/**
 * URL Endpoint Function Handler for CKS
 *
 * @param {string} url - Full request URL including protocol, hostname, path, and query string
 * @param {string} urlPrefix - Pattern identifier from client configuration
 * @param {object} context - Read-only request context
 * @returns {object} Result object with url and optional signURL flag
 */
function handler(url, urlPrefix, context) {
  const prefixPath = '/cks/' + legacyFolder + '/';
  const parsedUrl = new URL(url);

  if (parsedUrl.hostname === 'webmedia.cks-fashion.com') {
    parsedUrl.hostname = customHost;
    parsedUrl.search = '';
    let pathname = parsedUrl.pathname.replace('/i/cks/', '');

    // Keep only the asset identifier before any extra path segments.
    const filename = pathname.split('/')[0];
    pathname = prefixPath + filename + '.jpg';
    parsedUrl.pathname = pathname;
  }

  return {
    url: parsedUrl.toString(),
    signURL: false
  };
}

module.exports.handler = handler;
module.exports.legacyFolder = legacyFolder;
module.exports.customHost = customHost;