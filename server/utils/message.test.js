var expect = require('expect');
var { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'Jen';
    var text = 'Some message';
    var message = generateMessage(from, text);

    // expect(message.from).toBe(from);
    // expect(message.text).toBe(text);
    expect(message).toInclude({from, text});
    expect(message.createdAt).toBeA('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'Rich';
    var latitude = 31;
    var longitude = 12;
    var message = generateLocationMessage(from, latitude, longitude);
    var url = `https://www.google.com/maps?q=${latitude},${longitude}`;

    expect(message).toInclude({from, url});
    expect(message.createdAt).toBeA('number');
  });
});
