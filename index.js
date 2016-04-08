//const Target = Object.create(null);
//Object.assign(Target, {
  //and_then(f) {
    //console.log("AND_THEN");
    //if (this.value !== null && this.value !== undefined) {
      //return f(this.value);
    //}

    //return Maybe(this.value);
  //}
//});

function hasProperties(thing) {
  return thing !== null && typeof thing !== 'undefined';
}

function Maybe(value) {
  const target = {
    value
  };

  return new Proxy(target, {
    get(target, name) {
      if (name === 'fromMaybe') {
        return target.value;
      }

      if (typeof name === 'symbol') {
        return Maybe(target[name]);
      }

      const val = target.value;

      if (hasProperties(val) && Reflect.has(val, name)) {
        return Maybe(Reflect.get(val, name, val));
      }

      return Maybe(null);
    },

    apply(target, thisArg, args) {
      const val = target.value;

      if (typeof val === 'function') {
        return Maybe(Reflect.apply(val, thisArg, args));
      }

      return Maybe(null);
    }
  });
}

module.exports = Maybe;
