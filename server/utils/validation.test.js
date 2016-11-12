const expect = require('expect');
const { isRealString } = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    var res = isRealString(31);
    expect(res).toBe(false);
  });

  it('should reject string with only spaces', () => {
    var res = '      ';
    expect(isRealString(res)).toBe(false);
  });

  it('should allow string with non-space characters', () => {
    var res = '  real string value ';
    expect(isRealString(res)).toBe(true);
  });
});
