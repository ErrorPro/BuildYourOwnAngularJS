var sayHello = require('../src/hello.js');

describe("Hello", function() {
  it("says hello", function() {
    expect(sayHello('Jane')).toBe("Hello, Jane!");
  });
});
