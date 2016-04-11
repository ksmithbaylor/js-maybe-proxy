const test = require('tape');
const Maybe = require('.');

test('returns an object', t => {
  t.equal(typeof Maybe(42), 'object');
  t.end();
});

test('obeys the right identity monad law', t => {
  const testId = x => t.equal(Maybe(x).value, x);

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

  t.equal(Maybe(obj).num.value, obj.num);
  t.end();
});

test('masks invalid property accesses', t => {
  const obj = {};

  t.equal(Maybe(obj).nothing.here.to.see.value, null);
  t.end();
});

test('passes through function calls on valid properies', t => {
  const obj = {
    foo: 56,
    f() { return this.foo; }
  };

  t.equal(Maybe(obj).f().value, obj.f());
  t.end()
});

test('masks function calls on invalid properies', t => {
  const obj = {};

  t.equal(Maybe(obj).nothing().here().to().see().value, null);
  t.end()
});

test('passes through valid function calls', t => {
  const f = function (a, b, c) { return a + b + c; };

  t.equal(Maybe(f)(1, 2, 3).value, f(1, 2, 3));
  t.end();
});

test('masks invalid function calls', t => {
  t.equal(Maybe(null)().value, null);
  t.end();
});
