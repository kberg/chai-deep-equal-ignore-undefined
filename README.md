# chai-deep-equal-ignore-undefined

[![npm](https://img.shields.io/npm/v/chai-deep-equal-ignore-undefined.svg)](https://www.npmjs.com/package/chai-deep-equal-ignore-undefined)
[![npm](https://img.shields.io/npm/dw/chai-deep-equal-ignore-undefined.svg)](https://www.npmjs.com/package/chai-deep-equal-ignore-undefined)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![CI Status](https://github.com/DanielKurtjak/chai-deep-equal-ignore-undefined/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/DanielKurtjak/chai-deep-equal-ignore-undefined/actions/workflows/test.yml)

This plugin allows you to ignore properties with undefined values when performing deep equal comparisons, using `deepEqualIgnoreUndefined` method and chai's expect or assert API.

It is useful when you have properties within asserting objects that have undefined values and you want to exclude them from the comparison. This plugin works with both objects and arrays of objects, including those with circular references. By using this plugin, you can ensure that only the defined properties are considered during the comparison.

## Why?

Sometimes, when performing deep equal comparisons, you may encounter properties within asserting objects that have undefined values. This plugin allows you to ignore those properties during the comparison.

It works with both objects and arrays of objects, including those with circular references. By using this plugin, you can ensure that only the defined properties are considered during the comparison.

Both the assert and expect API are supported, making it easy to integrate into your testing framework.

If you have any questions or encounter any issues, please create an issue [here](https://github.com/DanielKurtjak/chai-deep-equal-ignore-undefined/issues).

This plugin is licensed under the MIT License.

## Installation

```bash
npm install chai-deep-equal-ignore-undefined --save-dev
```

```bash
yarn add chai-deep-equal-ignore-undefined --dev
```

## Usage

### Require

```js
const chai = require("chai");
const chaiDeepEqualIgnoreUndefined = require("chai-deep-equal-ignore-undefined");

chai.use(chaiDeepEqualIgnoreUndefined);
```

### ES6 Import

```js
import chai from "chai";
import chaiDeepEqualIgnoreUndefined from "chai-deep-equal-ignore-undefined";

chai.use(chaiDeepEqualIgnoreUndefined);
```

### TypeScript

```js
import * as chai from "chai";
import chaiDeepEqualIgnoreUndefined from "chai-deep-equal-ignore-undefined";

chai.use(chaiDeepEqualIgnoreUndefined);

// The typings for chai-deep-equal-ignore-undefined are included with the package itself.
```

## Examples

All these examples are for JavaScript.

#### Assertion examplees

1. Ignore a top level property from an object

```js
// Expect API
expect({ aa: undefined, bb: "b" }).to.deepEqualIgnoreUndefined({
  bb: "b",
  cc: undefined,
});
// Assert API
assert.deepEqualIgnoreUndefined(
  { a: undefined, b: "b" },
  { b: "b", c: undefined }
);
```

2. Ignore properties within an array with undefined values

```js
const expectedArray = [{ aa: undefined, bb: "b" }];
const actualArray = [{ cc: undefined, bb: "b" }];
// Expect API
expect(actualArray).to.deepEqualIgnoreUndefined(expectedArray);
// Assert API
assert.deepEqualIgnoreUndefined(expectedArray, actualArray);
```

3. Ignore nested properties with undefined values

```js
// Expect API
expect({
  topLevelProp: { aa: undefined, bb: "b" },
}).to.deepEqualIgnoreUndefined({
  topLevelProp: { bb: "b", cc: undefined },
});
// Assert API
assert.deepEqualIgnoreUndefined(
  { a: { b: undefined, c: "c" } },
  { a: { c: "c", d: undefined } }
);
```

4. Works with circular dependencies

```js
const actualObject = { aa: undefined, bb: "b" };
actualObject.c = actualObject;

const expectedObject = { bb: "b", cc: undefined };
expectedObject.c = expectedObject;

// Expect API
expect(actualObject).to.deepEqualIgnoreUndefined(expectedObject);
// Assert API
assert.deepEqualIgnoreUndefined(actualObject, expectedObject);
```

#### Deep clone function example

```js
import chai from "chai";
import {
  deepClone,
  deepCloneIgnoreUndefined,
} from "chai-deep-equal-ignore-undefined";

const object = { a: { b: undefined, c: "c" }, d: undefined };
object.f = object;
const cloneWithoutUndefined = deepCloneIgnoreUndefined(object);
const clone = deepClone(object);

// Using regular `to.deep.equal` here to perform assertion.
expect(cloneWithoutUndefined).to.deep.equal({ a: { c: "c" }, f: "[Circular]" });
expect(clone).to.deep.equal({
  a: { b: undefined, c: "c" },
  d: undefined,
  f: "[Circular]",
});
```

## Contributing

Contributions are welcome. If you have any questions create an issue [here](https://github.com/DanielKurtjak/chai-deep-equal-ignore-undefined/issues).

## License

[MIT](LICENSE)
