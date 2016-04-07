const test = require('tape');
const Maybe = require('.');

test('Maybe returns an object', t => {
  t.assert(typeof Maybe(42) === 'object');
  t.end();
})
