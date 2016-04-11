function Maybe(value) {
  const target = {
    value
  };

  return new Proxy(target, {
    get(target, name) {
      if (typeof name === 'symbol') {
        return target[name];
      }

      if (name === 'fromMaybe') {
        return target.value;
      }

      if (target.value === null) {
        return Maybe(null);
      }

      if (target.value[name]) {
        return Maybe(target.value[name]);
      }

      return Maybe(null);
    },

    apply(target, thisArg, args) {
      if (typeof target.value === 'function') {
        const result = Reflect.apply(target.value, thisArg, args);
        return Maybe(result);
      }

      return Maybe(null);
    }
  });
}

module.exports = Maybe;
