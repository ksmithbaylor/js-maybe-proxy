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
    () => {}, function() {},    // functions
    Symbol(), Symbol('hello')   // symbols
  ].forEach(testId);
  t.end();
});

test('passes through valid property accesses', t => {
  const obj = { num: 1 };

  t.equal(Maybe(obj).num.fromMaybe, obj.num);
  t.end();
});

test('masks invalid property accesses', t => {
  const obj = {};

  t.equal(Maybe(obj).nothing.here.to.see.fromMaybe, null);
  t.end();
});

test('masks function calls on invalid properies', t => {
  const obj = {};

  t.equal(Maybe(obj).nothing().here().to().see().fromMaybe, null);
  t.end()
});
