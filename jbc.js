const legacyFolder = 'legacy-amplience';
const customHost = 'media.jbc.be';
/**
 * URL Endpoint Function Handler
 * 
 * This is a default no-op handler that returns the URL unchanged.
 * Modify this function to implement your custom URL transformation logic.
 * 
 * @param {string} url - Full request URL including protocol, hostname, path, and query string
 * @param {string} urlPrefix - Pattern identifier from client configuration
 * @param {object} context - Read-only request context
 * @param {string} context.host - Request hostname
 * @param {string} context.clientNumber - Client identifier
 * @param {boolean} context.isDebug - Debug mode flag
 * @param {object} context.logger - Request logger
 * 
 * @returns {object} Result object with url and optional signURL flag
 */
function handler(url, urlPrefix, context) {
  const prefixPath = '/jbc/' + legacyFolder + '/';
  // Default behavior: return URL unchanged without signing
  const parsedUrl = new URL(url);
  if (parsedUrl.hostname === 'webmedia.jbc.be') {
    parsedUrl.hostname = customHost;
    parsedUrl.search = '';
    let pathname = parsedUrl.pathname.replace('/i/jbc/', '');
    
    // Extract the base filename (before any slash or special characters)
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
