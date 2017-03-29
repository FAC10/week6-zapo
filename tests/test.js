const test = require('tape');
const server = require('../src/server');

test('A test test', (t) => {
  t.equal(1, 1, '1 should equal 1');
  t.end();
});

test('Server should return 1', (t) => {
  t.equal(server, 1, 'Should be 1');
  t.end();
});
