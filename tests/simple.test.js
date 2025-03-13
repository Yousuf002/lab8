describe('Simple test suite', () => {
    test('should pass this simple test', () => {
      console.log('Running simple test...');
      expect(true).toBe(true);
    });
    
    test('basic application logic test', () => {
      console.log('Testing basic app logic...');
      const sum = (a, b) => a + b;
      expect(sum(2, 3)).toBe(5);
    });
  });