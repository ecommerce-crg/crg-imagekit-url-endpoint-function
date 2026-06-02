const { handler, legacyFolder } = require('./cks');

describe('URL Endpoint Function Handler (CKS)', () => {
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

  it('should transform a CKS product image URL correctly', () => {
    const url = 'https://webmedia.cks-fashion.com/i/cks/314327RDD_50_l/slacy-mouwloze%20top?$desktop-medium$&img404=image-404&qlt=default&fmt=auto';
    const urlPrefix = '/';

    const result = handler(url, urlPrefix, mockContext);

    expect(result.url).toBe('https://ik.imagekit.io/n6z3kgjf2/cks/' + legacyFolder + '/314327RDD_50_l.jpg');
    expect(result.signURL).toBe(false);
  });

  it('should transform a CKS content image URL correctly', () => {
    const url = 'https://webmedia.cks-fashion.com/i/cks/CKS_SS26_DESKTOP_W22_5?qlt=95';
    const urlPrefix = '/';

    const result = handler(url, urlPrefix, mockContext);

    expect(result.url).toBe('https://ik.imagekit.io/n6z3kgjf2/cks/' + legacyFolder + '/CKS_SS26_DESKTOP_W22_5.jpg');
    expect(result.signURL).toBe(false);
  });
});