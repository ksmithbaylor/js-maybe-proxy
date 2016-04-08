const test = require('tape');
const Maybe = require('.');

test('Maybe returns an object', t => {
  t.equal(typeof Maybe(42), 'object');
  t.end();
});

test('Maybe lets me get the value', t => {
  t.equal(Maybe(42).fromMaybe, 42);
  t.end();
});

test('Maybe lets me call and_then', t => {
  t.equal(Maybe(42).and_then(x => Maybe(x + 1)).fromMaybe, 43);
  t.end();
});

test('Maybe lets me omit the and_then call', t => {
  const obj = {
    num: 1,
    inc() { return this.num + 1 }
  };
  const m = Maybe(obj);

  t.equal(Maybe(obj).inc().fromMaybe, 2);
  t.end();
})
