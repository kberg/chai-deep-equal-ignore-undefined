const { expect } = require("chai");

const { deepCloneIgnoreUndefined, deepClone } = require("./deep-clone");

describe("deepClone", () => {
  it("should clone an object", () => {
    const obj = {
      a: 1,
      b: new Date(),
      c: /abc/,
      d: new Map([["key1", "value1"]]),
      e: new Set([1, 2, 3]),
      f: function () {
        return "f";
      },
      g: Symbol("g"),
      h: null,
      i: undefined,
      j: true,
      k: [1, 2, { l: "m" }],
      m: {
        n: {
          o: "p",
        },
      },
    };

    // Use `expect.to.deep.equal` to compare the cloned object with the original object
    expect(deepClone(obj)).to.deep.equal(obj);
  });

  it("should not ignore properties with undefined values within an object", () => {
    const object = { a: { b: undefined, c: "c" }, d: undefined };
    object.f = object;
    const clone = deepClone(object);

    // Using regular `to.deep.equal` here to perform assertion.
    expect(clone).to.deep.equal({
      a: { b: undefined, c: "c" },
      d: undefined,
      f: "[Circular]",
    });
  });
});

describe("deepCloneIgnoreUndefined", () => {
  it("should clone an object", () => {
    const obj = {
      a: 1,
      b: new Date(),
      c: /abc/,
      d: new Map([["key1", "value1"]]),
      e: new Set([1, 2, 3]),
      f: function () {
        return "f";
      },
      g: Symbol("g"),
      h: null,
      // i: undefined,
      j: true,
      k: [1, 2, { l: "m" }],
      m: {
        n: {
          o: "p",
        },
      },
    };

    // Use `expect.to.deep.equal` to compare the cloned object with the original object
    expect(deepCloneIgnoreUndefined(obj)).to.deep.equal(obj);
  });

  it("should ignore properties with undefined values within an object", () => {
    const object = { a: { b: undefined, c: "c" }, d: undefined };
    object.f = object;
    const clone = deepCloneIgnoreUndefined(object);

    // Using regular `to.deep.equal` here to perform assertion.
    expect(clone).to.deep.equal({ a: { c: "c" }, f: "[Circular]" });
  });

  it("should ignore properties with undefined values within an array", () => {
    const clone = deepCloneIgnoreUndefined([
      { a: { b: undefined, c: "c" }, d: undefined },
    ]);

    // Using regular `to.deep.equal` here to perform assertion.
    expect(clone).to.deep.equal([{ a: { c: "c" } }]);
  });
});
