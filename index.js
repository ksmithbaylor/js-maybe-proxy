const Nothing = {};

function Maybe(value) {
  const target = { value, __isMaybe: true };

  return new Proxy(target, {
    get(target, name) {
      if (typeof name === 'symbol') {
        return target.value[name];
      }

      if (name === 'value') {
        if (target.value === Nothing) {
          return null;
        }

        return target.value;
      }

      if (target.value === Nothing) {
        return Maybe(Nothing);
      }

      if (target.value[name]) {
        return Maybe(target.value[name]);
      }

      return Maybe(Nothing);
    },

    apply(target, thisArg, args) {
      if (typeof target.value === 'function') {
        try {
          if (thisArg.__isMaybe) {
            return Maybe(Reflect.apply(target.value, thisArg.value, args));
          }
        } catch (e) {
          return Maybe(Reflect.apply(target.value, thisArg, args));
        }
      }

      return Maybe(Nothing);
    }
  });
}

module.exports = Maybe;
