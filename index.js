const Target = Object.create(null);
Object.assign(Target, {
  and_then(f) {
    if (this.value !== null && this.value !== undefined) {
      return f(this.value);
    }

    return Maybe(this.value);
  }
});


// Maybe(obj) -> must be a Maybe
// m.inc -> must be (...args) => Maybe(target.value.inc(args))
// m.foo -> must be Maybe(target.value.foo)

//function method_missing(target, name, ...args) {
  //if (name in target.value) {
    //const prop = Reflect.get(target.value, name);
    //if (typeof prop === 'function') {
      //return Maybe(prop.apply(target.value, args));
    //}
    //return Maybe(prop)
  //}
  //return Maybe(target.value);
//}

function Maybe(value) {
  const target = Object.create(Target);
  Object.assign(target, {
    value,
    get fromMaybe() { return this.value; }
  });

  return new Proxy(target, {
    get(target, name) {
      if (name in target) {
        return Reflect.get(target, name, target);
      }

      if (name in target.value) {
        if (typeof target.value[name] === 'function') {
          return (...args) => Maybe(target.value[name](...args));
        }
        return Maybe(target.value[name]);
      }
      return Maybe(null);
    }
  });
}

module.exports = Maybe;
