const test = require('tape');
const Maybe = require('.');

test('Maybe returns an object', t => {
  t.assert(typeof Maybe(42) === 'object');
  t.end();
});

test('Maybe lets me get the value', t => {
  t.assert(42 === Maybe(42).fromMaybe);
  t.end();
});
