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

const deepCloneIgnoreUndefined = (value) => {
  const deepCloneIgnoreUndefinedInner = (object) => {
    if (Array.isArray(object)) {
      return object.map(deepCloneIgnoreUndefinedInner);
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
        clonedObject[key] = deepCloneIgnoreUndefinedInner(object[key]);
      }
    }

    return clonedObject;
  };
  const cloned = deepClone(value);
  return deepCloneIgnoreUndefinedInner(cloned);
};

module.exports.deepClone = deepClone;
module.exports.deepCloneIgnoreUndefined = deepCloneIgnoreUndefined;
