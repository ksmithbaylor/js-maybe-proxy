function Maybe(value) {
  const target = {
    value: value
  };
  return new Proxy(target, {
    get(target, name) {
      if (name === 'fromMaybe') {
        return target.value;
      }

      return null;
    }
  });
}

module.exports = Maybe;
