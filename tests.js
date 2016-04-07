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

test('Maybe lets me call and_then', t => {
  t.assert(43 === Maybe(42).and_then(x => Maybe(x + 1)).fromMaybe);
  t.end();
});
