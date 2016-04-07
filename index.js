const Target = Object.create(null);
Object.assign(Target, {
  and_then(f) {
    if (this.value !== null && this.value !== undefined) {
      return f(this.value);
    }

    return Maybe(this.value);
  }
});

function Maybe(value) {
  const target = Object.create(Target);
  Object.assign(target, {
    value,
    get fromMaybe() { return value; }
  });

  return new Proxy(target, {
    get(target, name) {
      if (name in target) {
        return Reflect.get(target, name);
      }

      return null;
    }
  });
}

module.exports = Maybe;
