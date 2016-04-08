const test = require('tape');
const Maybe = require('.');

test('returns an object', t => {
  t.equal(typeof Maybe(42), 'object');
  t.end();
});

test('obeys the right identity monad law', t => {
  const testId = x => t.equal(Maybe(x).fromMaybe, x);

  [
    42, -42, 0,                 // numbers
    'hello', '',                // strings
    true, false,                // booleans
    undefined,                  // undefined
    null, {}, [],               // objects
    Symbol(), Symbol('hello')   // symbols
  ].forEach(testId);
  t.end();
});

test('Maybe lets me access and call valid properties', t => {
  const obj = { num: 1 };

  t.equal(Maybe(obj).num.fromMaybe, obj.num);
  t.end();
});

test('Maybe hides invalid property accesses', t => {
  const obj = {};

  t.equal(Maybe(obj).nothing.here.to.see.fromMaybe, null);
  t.equal(Maybe(obj).nothing().here().to().see().fromMaybe, null);
  t.end();
});
