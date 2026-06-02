const { handler, legacyFolder } = require('./jbc');

describe('URL Endpoint Function Handler', () => {
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

  it('should transform a JBC product image URL correctly', () => {
    const url = 'https://webmedia.jbc.be/i/jbc/314690GLL_2_l_model/jurk-met-volant%2C-34-46?$mobile-medium$&img404=image-404&qlt=default&fmt=auto';
    const urlPrefix = '/';
    
    const result = handler(url, urlPrefix, mockContext);
    
    expect(result.url).toBe('https://ik.imagekit.io/n6z3kgjf2/jbc/' + legacyFolder + '/314690GLL_2_l_model.jpg');
    expect(result.signURL).toBe(false);
  });

  it('should transform a JBC content image URL correctly', () => {
    const url = 'https://webmedia.jbc.be/i/jbc/HB-D-NICEFAM-W21-1?fmt=auto&qlt=98';
    const urlPrefix = '/';
    
    const result = handler(url, urlPrefix, mockContext);
    
    expect(result.url).toBe('https://ik.imagekit.io/n6z3kgjf2/jbc/' + legacyFolder + '/HB-D-NICEFAM-W21-1.jpg');
    expect(result.signURL).toBe(false);
  });
});
