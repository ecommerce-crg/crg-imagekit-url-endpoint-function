const { handler, legacyFolder, customHost } = require('./may');

describe('URL Endpoint Function Handler (Mayerline)', () => {
  // Mock context object for testing
  const mockContext = {
    host: 'ik.imagekit.io',
    clientNumber: 'test-client-123',
    isDebug: false,
    logger: {
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn()
    }
  };

  it('should return an ImageKit URL unchanged', () => {
    const url = 'https://ik.imagekit.io/demo/image.jpg';
    const urlPrefix = '/';

    const result = handler(url, urlPrefix, mockContext);

    expect(result.url).toBe(url);
    expect(result.signURL).toBe(false);
  });

  it('should transform a Mayerline product image URL correctly', () => {
    const url = 'https://webmedia.mayerline.com/i/may/006401BRD_10_l_model/mouwloze-ajourcardigan?$desktop-small$&img404=404Mayerline&qlt=default&fmt=auto';
    const urlPrefix = '/';

    const result = handler(url, urlPrefix, mockContext);

    expect(result.url).toBe('https://' + customHost + '/may/' + legacyFolder + '/006401BRD_10_l_model.jpg');
    expect(result.signURL).toBe(false);
  });

  it('should transform a Mayerline content image URL correctly', () => {
    const url = 'https://webmedia.mayerline.com/i/may/MAY_HERO_MYFIT_BANNER_1?qlt=97';
    const urlPrefix = '/';

    const result = handler(url, urlPrefix, mockContext);

    const expectedUrl = 'https://' + customHost + '/may/' + legacyFolder + '/MAY_HERO_MYFIT_BANNER_1.jpg';
    expect(result.url).toBe(expectedUrl);
    console.log('INPUT URL: ' + url);
    console.log(`EXP URL: ${expectedUrl}`);
    console.log(`ACT URL: ${result.url}`);
    expect(result.signURL).toBe(false);
  });
});