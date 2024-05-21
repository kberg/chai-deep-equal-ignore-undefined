/* eslint-env mocha */

const { use, assert, expect } = require("chai");

const {
  default: chaiEqualIgnoreUndefinedProps,
  deepClone,
} = require("./chai-deep-equal-ignore-undefined");

use(chaiEqualIgnoreUndefinedProps);

describe("chai-equal-ignore-undefined-props", () => {
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

      // Use assert.deepEqual to compare the cloned object with the original object
      assert.deepEqual(deepClone(obj), obj);
    });
  });

  describe("assert.deepEqualIgnoreUndefined", () => {
    // Repeat the tests for the expect method
    describe("with promises", () => {
      it("should work when actual param is a promise", async () => {
        await assert.deepEqualIgnoreUndefined(
          Promise.resolve({ a: undefined, b: "b" }),
          { b: "b", c: undefined }
        );
      });

      it("should work when expected param is a promise", async () => {
        await assert.deepEqualIgnoreUndefined(
          { a: undefined, b: "b" },
          Promise.resolve({ b: "b", c: undefined })
        );
      });
    });

    it("should fail if used with primitive types", () => {
      assert.throws(() => {
        assert.deepEqualIgnoreUndefined({}, null);
      }, "expected {} to deeply equal null");

      assert.throws(() => {
        assert.deepEqualIgnoreUndefined({}, true);
      }, "expected {} to deeply equal true");

      assert.throws(() => {
        assert.deepEqualIgnoreUndefined({}, undefined);
      }, "expected {} to deeply equal undefined");

      assert.throws(() => {
        assert.deepEqualIgnoreUndefined({}, 0);
      }, "expected {} to deeply equal +0");

      assert.throws(() => {
        assert.deepEqualIgnoreUndefined({}, "string");
      }, "expected {} to deeply equal 'string'");
    });

    it("should throw when Maps are compared", () => {
      const mapA = new Map([
        ["b", "b"],
        ["withUndefinedKey", { aa: undefined, b: "b" }],
      ]);
      const mapB = new Map([
        ["b", "b"],
        ["withUndefinedKey", { cc: undefined, b: "b" }],
      ]);

      assert.throws(() => {
        assert.deepEqualIgnoreUndefined(mapA, mapB);
      }, "object tested must be an array, an object, or a promise, but map given");
    });

    it("should fail when comparing set objects", () => {
      const setA = new Set(["b", [1, 2]]);
      const setB = new Set(["b", [1, 2]]);
      assert.throws(() => {
        assert.deepEqualIgnoreUndefined(setA, setB);
      }, "object tested must be an array, an object, or a promise, but set given");
    });

    it("should ignore key(s) with undefined value from comparison for both expected value and actual value", () => {
      assert.deepEqualIgnoreUndefined(
        { a: undefined, b: "b" },
        { b: "b", c: undefined }
      );

      assert.deepEqualIgnoreUndefined(
        { a: undefined, aa: undefined, b: "b" },
        { b: "b", c: undefined, cc: undefined }
      );
    });

    it("should handle circular references on a top level properties", () => {
      const actualObject = { a: undefined, b: "b" };
      actualObject.c = actualObject;

      const expectedObject = { b: "b", c: undefined };
      expectedObject.c = expectedObject;

      assert.deepEqualIgnoreUndefined(actualObject, expectedObject);
      assert.deepEqualIgnoreUndefined(actualObject, {
        b: "b",
        c: "[Circular]",
      });
    });

    it("should work with negated", () => {
      assert.notDeepEqualIgnoreUndefined(
        { a: undefined, b: "b2" },
        { b: "b", c: undefined }
      );
    });

    it("should ignore key(s) with undefined value from comparison for both expected value and actual value in arrays with mixed objects", () => {
      assert.deepEqualIgnoreUndefined(
        [{ a: undefined, b: "b" }, ["c"], { d: "d" }],
        [{ b: "b" }, ["c"], { d: "d", e: undefined }]
      );
    });

    it("should throw when negated and the values are the same", () => {
      assert.throws(() => {
        assert.notDeepEqualIgnoreUndefined(
          { a: undefined, b: "b" },
          { b: "b", c: undefined }
        );
      }, "expected { b: 'b' } to not deeply equal { b: 'b' }");
    });

    it("should ignore key(s) with undefined value from comparison for expected value ", () => {
      assert.deepEqualIgnoreUndefined({ a: undefined, b: "b" }, { b: "b" });

      assert.deepEqualIgnoreUndefined(
        { a: undefined, c: undefined, b: "b" },
        { b: "b" }
      );
    });

    it("should ignore key(s) with undefined value from comparison from actual value", () => {
      assert.deepEqualIgnoreUndefined({ b: "b" }, { b: "b", a: undefined });

      assert.deepEqualIgnoreUndefined(
        { b: "b" },
        { b: "b", a: undefined, c: undefined }
      );
    });

    it("should ignore key(s) with undefined value from comparison for nested objects", () => {
      assert.deepEqualIgnoreUndefined(
        { a: { b: undefined, c: "c" } },
        { a: { c: "c", d: undefined } }
      );

      assert.deepEqualIgnoreUndefined(
        { a: { b: undefined, bb: undefined, c: "c" } },
        { a: { c: "c", d: undefined, dd: undefined } }
      );
    });

    it("should throw an error if the actual value does not match the expected value", () => {
      assert.throws(() => {
        assert.deepEqualIgnoreUndefined(
          { a: undefined, b: "b" },
          { b: "wrong value", c: undefined }
        );
      }, "expected { b: 'b' } to deeply equal { b: 'wrong value' }");
    });

    it("should handle undefined value if assertion is deep equal for arrays", () => {
      assert.notDeepEqualIgnoreUndefined([undefined, "b"], ["b"]);
      assert.deepEqualIgnoreUndefined(
        [
          [undefined, "a"],
          ["b", undefined],
        ],
        [
          [undefined, "a"],
          ["b", undefined],
        ]
      );
    });
  });

  describe("expect(...).to[.deep].eq[ua]l[s](...)", () => {
    describe("with promises", () => {
      it("should work when actual param is a promise", async () => {
        await expect(
          Promise.resolve({ a: undefined, b: "b" })
        ).to.deepEqualIgnoreUndefined({
          b: "b",
          c: undefined,
        });
      });

      it("should work when expected param is a promise", async () => {
        await expect({ a: undefined, b: "b" }).to.deepEqualIgnoreUndefined(
          Promise.resolve({ b: "b", c: undefined })
        );
      });
    });

    it("should fail if used with primitive types", () => {
      expect(() => {
        expect({}).to.deepEqualIgnoreUndefined(null);
      }).to.throw("expected {} to deeply equal null");

      expect(() => {
        expect({}).to.deepEqualIgnoreUndefined(true);
      }).to.throw("expected {} to deeply equal true");

      expect(() => {
        expect({}).to.deepEqualIgnoreUndefined(undefined);
      }).to.throw("expected {} to deeply equal undefined");

      expect(() => {
        expect({}).to.deepEqualIgnoreUndefined(0);
      }).to.throw("expected {} to deeply equal +0");

      expect(() => {
        expect({}).to.deepEqualIgnoreUndefined("string");
      }).to.throw("expected {} to deeply equal 'string'");
    });

    it("should fail if used negated with the primitive types", () => {
      expect(() => {
        expect(undefined).to.not.deepEqualIgnoreUndefined(undefined);
      }).to.throw(
        "object tested must be an array, an object, or a promise, but undefined given"
      );

      expect(() => {
        expect(null).to.not.deepEqualIgnoreUndefined(null);
      }).to.throw(
        "object tested must be an array, an object, or a promise, but null given"
      );

      expect(() => {
        expect(true).to.not.deepEqualIgnoreUndefined(true);
      }).to.throw(
        "object tested must be an array, an object, or a promise, but boolean given"
      );

      expect(() => {
        expect(0).to.not.deepEqualIgnoreUndefined(0);
      }).to.throw(
        "object tested must be an array, an object, or a promise, but number given"
      );

      expect(() => {
        expect("").to.not.deepEqualIgnoreUndefined("");
      }).to.throw(
        "object tested must be an array, an object, or a promise, but string given"
      );
    });

    it("should throw when Maps are compared", () => {
      const mapA = new Map([
        ["b", "b"],
        ["withUndefinedKey", { aa: undefined, b: "b" }],
      ]);
      const mapB = new Map([
        ["b", "b"],
        ["withUndefinedKey", { cc: undefined, b: "b" }],
      ]);

      expect(() => {
        expect(mapA).to.deepEqualIgnoreUndefined(mapB);
      }).to.throw(
        "object tested must be an array, an object, or a promise, but map given"
      );
    });

    it("should fail when comparing set objects", () => {
      const setA = new Set(["b", [1, 2]]);
      const setB = new Set(["b", [1, 2]]);
      expect(() => {
        expect(setA).to.deepEqualIgnoreUndefined(setB);
      }).to.throw(
        "object tested must be an array, an object, or a promise, but set given"
      );
    });

    it("should ignore key(s) with undefined value from comparison for both expected value and actual value", () => {
      expect({ a: undefined, b: "b" }).to.deepEqualIgnoreUndefined({
        b: "b",
        c: undefined,
      });

      expect({
        a: undefined,
        aa: undefined,
        b: "b",
      }).to.deepEqualIgnoreUndefined({
        b: "b",
        c: undefined,
        cc: undefined,
      });
    });

    it("should work with negated values", () => {
      expect({ a: undefined, b: "b2" }).to.not.deepEqualIgnoreUndefined({
        b: "b",
        c: undefined,
      });
    });

    it("should throw when negated and values are the same", () => {
      expect(() => {
        expect({ a: undefined, b: "b" }).to.not.deepEqualIgnoreUndefined({
          b: "b",
          c: undefined,
        });
      }).to.throw("expected { b: 'b' } to not deeply equal { b: 'b' }");
    });

    it("should ignore key(s) with undefined value from comparison for expected value ", () => {
      expect({ a: undefined, b: "b" }).to.deepEqualIgnoreUndefined({
        b: "b",
      });

      expect({
        a: undefined,
        c: undefined,
        b: "b",
      }).to.deepEqualIgnoreUndefined({
        b: "b",
      });
    });

    it("should ignore key(s) with undefined value from comparison from actual value", () => {
      expect({ b: "b" }).to.deepEqualIgnoreUndefined({ b: "b", a: undefined });

      expect({ b: "b" }).to.deepEqualIgnoreUndefined({
        b: "b",
        a: undefined,
        c: undefined,
      });
    });

    it("should ignore key(s) with undefined value from comparison for nested objects", () => {
      expect({ a: { b: undefined, c: "c" } }).to.deepEqualIgnoreUndefined({
        a: { c: "c", d: undefined },
      });

      expect({
        a: { b: undefined, bb: undefined, c: "c" },
      }).to.deepEqualIgnoreUndefined({
        a: { c: "c", d: undefined, dd: undefined },
      });
    });

    it("should throw an error if the actual value does not match the expected value", () => {
      expect(() => {
        expect({ a: undefined, b: "b" }).to.deepEqualIgnoreUndefined({
          b: "wrong value",
          c: undefined,
        });
      }).to.throw("expected { b: 'b' } to deeply equal { b: 'wrong value' }");
    });

    it("should handle undefined value if assertion is deep equal for arrays", () => {
      expect([undefined, "b"]).to.not.equals(["b"]);
      expect([
        [undefined, "a"],
        ["b", undefined],
      ]).to.deepEqualIgnoreUndefined([
        [undefined, "a"],
        ["b", undefined],
      ]);
    });

    it("should throw an error if the actual value is not an object or array", () => {
      expect(() => {
        expect(undefined).to.deepEqualIgnoreUndefined({ a: undefined });
      }).to.throw(
        "object tested must be an array, an object, or a promise, but undefined given"
      );

      expect(() => {
        expect(null).to.deepEqualIgnoreUndefined({ a: undefined });
      }).to.throw(
        "object tested must be an array, an object, or a promise, but null given"
      );

      expect(() => {
        expect("string").to.deepEqualIgnoreUndefined({ a: undefined });
      }).to.throw(
        "object tested must be an array, an object, or a promise, but string given"
      );

      expect(() => {
        expect(123).to.deepEqualIgnoreUndefined({ a: undefined });
      }).to.throw(
        "object tested must be an array, an object, or a promise, but number given"
      );

      expect(() => {
        expect(true).to.deepEqualIgnoreUndefined({ a: undefined });
      }).to.throw(
        "object tested must be an array, an object, or a promise, but boolean given"
      );
    });

    it("should ignore key(s) with undefined value from comparison for both expected value and actual value in mixed objects and arrays", () => {
      expect([{ a: undefined, b: "b" }, ["c"]]).to.deepEqualIgnoreUndefined([
        { b: "b" },
        ["c"],
      ]);
    });

    it("should ignore key(s) with undefined value from comparison for both expected value and actual value in mixed nested objects and arrays", () => {
      expect({ a: [{ b: undefined, c: "c" }] }).to.deepEqualIgnoreUndefined({
        a: [{ c: "c" }],
      });
      expect({ a: [{ b: undefined, c: "c" }] }).to.deepEqualIgnoreUndefined({
        a: [{ c: "c", d: undefined }],
      });
    });

    it("should not replace with [Circular] if the circular reference is not detected", () => {
      const ref = { r: "r" };
      // There is some reference to the same object but it is not circular
      const actualObject = { a: undefined, b: "b", ref, c: { ref } };
      const expectedObject = { c: undefined, b: "b", ref, c: { ref } };

      expect(actualObject).to.deepEqualIgnoreUndefined(expectedObject);
      expect(actualObject).to.deepEqualIgnoreUndefined({
        b: "b",
        ref,
        c: { ref },
      });
    });

    it("should handle circular references on a top level properties", () => {
      const actualObject = { a: undefined, b: "b" };
      actualObject.c = actualObject;

      const expectedObject = { b: "b", c: undefined };
      expectedObject.c = expectedObject;

      expect(actualObject).to.deepEqualIgnoreUndefined(expectedObject);
      expect(actualObject).to.deepEqualIgnoreUndefined({
        b: "b",
        c: "[Circular]",
      });
    });

    it("should handle circular references with nested objects", () => {
      const actualObject = { a: { b: undefined, c: "c" } };
      actualObject.a.d = actualObject;

      const expectedObject = { a: { c: "c", d: undefined } };
      expectedObject.a.d = expectedObject;

      expect(actualObject).to.deepEqualIgnoreUndefined(expectedObject);
      expect(actualObject).to.deepEqualIgnoreUndefined({
        a: { c: "c", d: "[Circular]" },
      });
    });

    it("should handle circular references with arrays", () => {
      const actualArray = [undefined, "b"];
      actualArray.push(actualArray);

      const expectedArray = [undefined, "b"];
      expectedArray.push(expectedArray);

      expect(actualArray).to.deepEqualIgnoreUndefined(expectedArray);
      expect(actualArray).to.deepEqualIgnoreUndefined([
        undefined,
        "b",
        "[Circular]",
      ]);
    });

    it("should handle circular references with mixed objects and arrays", () => {
      const actualMixed = [{ a: undefined, b: "b" }, ["c"]];
      actualMixed.push(actualMixed);

      const expectedMixed = [{ b: "b" }, ["c"]];
      expectedMixed.push(expectedMixed);

      expect(actualMixed).to.deepEqualIgnoreUndefined(expectedMixed);
      expect(actualMixed).to.deepEqualIgnoreUndefined([
        { b: "b" },
        ["c"],
        "[Circular]",
      ]);
    });

    it("should handle multiple levels of circular references", () => {
      const actualObject = { one: undefined, b: "b" };
      actualObject.c = { d: actualObject };
      actualObject.c.e = { f: actualObject.c };

      const expectedObject = { b: "b", another: undefined };
      expectedObject.c = { d: expectedObject };
      expectedObject.c.e = { f: expectedObject.c };

      expect(actualObject).to.deepEqualIgnoreUndefined(expectedObject);
      expect(actualObject).to.deepEqualIgnoreUndefined({
        b: "b",
        c: {
          d: "[Circular]",
          e: {
            f: "[Circular]",
          },
        },
      });
    });
  });
});
