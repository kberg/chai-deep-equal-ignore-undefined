const { deepCloneIgnoreUndefined, deepClone } = require("./deep-clone");

function chaiDeepEqualIgnoreUndefined(chai, utils) {
  const { Assertion, assert } = chai;

  const assertDeepEqualIgnoreUndefined = (actual, expected, message, not) => {
    const a = new Assertion(deepCloneIgnoreUndefined(actual), message).to;
    if (not) {
      a.not;
    }
    a.deep.equal(deepCloneIgnoreUndefined(expected));
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

module.exports = chaiDeepEqualIgnoreUndefined;
module.exports.deepClone = deepClone;
module.exports.deepCloneIgnoreUndefined = deepCloneIgnoreUndefined;
module.exports.default = chaiDeepEqualIgnoreUndefined;
