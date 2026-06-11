const legacyFolder = 'legacy-amplience';

/**
 * URL Endpoint Function Handler for Mayerline
 *
 * @param {string} url - Full request URL including protocol, hostname, path, and query string
 * @param {string} urlPrefix - Pattern identifier from client configuration
 * @param {object} context - Read-only request context
 * @returns {object} Result object with url and optional signURL flag
 */
function handler(url, urlPrefix, context) {
  const prefixPath = '/n6z3kgjf2/may/' + legacyFolder + '/';
  const parsedUrl = new URL(url);

  if (parsedUrl.hostname === 'webmedia.mayerline.com') {
    parsedUrl.hostname = 'ik.imagekit.io';
    parsedUrl.search = '';
    let pathname = parsedUrl.pathname.replace('/i/may/', '');

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