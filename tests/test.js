const test = require('tape');
// const server = require('../src/server');

test('A test test', (t) => {
  t.equal(1, 1, '1 should equal 1');
  t.end();
});

require('./src/router.test.js');
