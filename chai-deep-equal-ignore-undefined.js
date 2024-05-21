function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

function isPrimitive(value) {
  return value !== Object(value);
}

function isFunction(value) {
  return typeof value === "function";
}

const deepClone = (value, hash = new WeakMap(), parents = []) => {
  if (isPrimitive(value) || isFunction(value)) {
    return value;
  }

  // Check for circular references
  if (hash.has(value)) {
    return parents.includes(value) ? "[Circular]" : hash.get(value);
  }

  // Handle Date
  if (value instanceof Date) {
    return new Date(value);
  }

  // Handle RegExp
  if (value instanceof RegExp) {
    return new RegExp(value);
  }

  // Handle Map
  if (value instanceof Map) {
    const result = new Map();
    hash.set(value, result);
    value.forEach((val, key) => {
      result.set(
        deepClone(key, hash, [...parents, value]),
        deepClone(val, hash, [...parents, value]),
      );
    });
    return result;
  }

  // Handle Set
  if (value instanceof Set) {
    const result = new Set();
    hash.set(value, result);
    value.forEach((val) => {
      result.add(deepClone(val, hash, [...parents, value]));
    });
    return result;
  }

  // Handle Array and Objects
  const result = Array.isArray(value)
    ? []
    : Object.create(Object.getPrototypeOf(value));
  hash.set(value, result);

  // Copy properties recursively
  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      result[key] = deepClone(value[key], hash, [...parents, value]);
    }
  }

  // Handle Symbols in object keys
  const symbols = Object.getOwnPropertySymbols(value);
  for (const symbol of symbols) {
    if (value.propertyIsEnumerable(symbol)) {
      result[symbol] = deepClone(value[symbol], hash, [...parents, value]);
    }
  }

  return result;
};

function cloneIgnoringUndefinedProperties(value) {
  function cloneIgnoringUndefinedPropertiesInner(object) {
    if (Array.isArray(object)) {
      return object.map(cloneIgnoringUndefinedPropertiesInner);
    }

    if (!isPlainObject(object) || object === null) {
      return object;
    }

    const clonedObject = {};
    for (const key in object) {
      if (
        Object.prototype.hasOwnProperty.call(object, key) &&
        object[key] !== undefined
      ) {
        clonedObject[key] = cloneIgnoringUndefinedPropertiesInner(object[key]);
      }
    }

    return clonedObject;
  }
  const cloned = deepClone(value);
  return cloneIgnoringUndefinedPropertiesInner(cloned);
}

function chaiEqualIgnoreUndefinedProps(chai, utils) {
  const { Assertion, assert } = chai;

  const assertDeepEqualIgnoreUndefined = (actual, expected, message, not) => {
    const a = new Assertion(cloneIgnoringUndefinedProperties(actual), message)
      .to;
    if (not) {
      a.not;
    }
    a.deep.equal(cloneIgnoringUndefinedProperties(expected));
  };

  utils.addMethod(
    assert,
    "deepEqualIgnoreUndefined",
    function (actual, expected, message) {
      new Assertion(actual).to.deepEqualIgnoreUndefined(expected, message);
    },
  );

  utils.addMethod(
    assert,
    "notDeepEqualIgnoreUndefined",
    function (actual, expected, message) {
      new Assertion(actual).to.not.deepEqualIgnoreUndefined(expected, message);
    },
  );

  Assertion.addMethod("deepEqualIgnoreUndefined", function (expected, message) {
    utils.expectTypes(this, ["object", "array", "promise"]);
    const negate = utils.flag(this, "negate");

    if (expected instanceof Promise || this._obj instanceof Promise) {
      return Promise.all([
        Promise.resolve(this._obj),
        Promise.resolve(expected),
      ]).then(([resolvedActual, resolvedExpected]) => {
        return assertDeepEqualIgnoreUndefined(
          resolvedActual,
          resolvedExpected,
          message,
          negate,
        );
      });
    }

    return assertDeepEqualIgnoreUndefined(this._obj, expected, message, negate);
  });
}

module.exports = chaiEqualIgnoreUndefinedProps;
module.exports.deepClone = deepClone;
module.exports.default = chaiEqualIgnoreUndefinedProps;
