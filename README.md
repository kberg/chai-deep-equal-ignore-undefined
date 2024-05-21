# chai-deep-equal-ignore-undefined

[![npm](https://img.shields.io/npm/v/chai-deep-equal-ignore-undefined.svg)](https://www.npmjs.com/package/chai-deep-equal-ignore-undefined)
[![npm](https://img.shields.io/npm/dw/chai-deep-equal-ignore-undefined.svg)](https://www.npmjs.com/package/chai-deep-equal-ignore-undefined)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![CI Status](https://github.com/DanielKurtjak/chai-deep-equal-ignore-undefined/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/DanielKurtjak/chai-deep-equal-ignore-undefined/actions/workflows/test.yml)

Ignore keys with undefined value to compare from a deep equal operation with chai [expect](http://chaijs.com/api/bdd/).

## Why?

Sometimes you will have properties within asserting objects which have undefined value.
This plugin ignore those properties from comparison.

Works with both objects and array of objects with or without circular references.

Assert and expect API are supported

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
const chaiIgnoreUndefinedProperties = require("chai-deep-equal-ignore-undefined");

chai.use(chaiIgnoreUndefinedProperties);
```

### ES6 Import

```js
import chai from "chai";
import chaiIgnoreUndefinedProperties from "chai-deep-equal-ignore-undefined";

chai.use(chaiIgnoreUndefinedProperties);
```

### TypeScript

```js
import * as chai from "chai";
import chaiIgnoreUndefinedProperties from "chai-deep-equal-ignore-undefined";

chai.use(chaiIgnoreUndefinedProperties);

// The typings for chai-deep-equal-ignore-undefined are included with the package itself.
```

## Examples

All these examples are for JavaScript.

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

2. Ignore properties within array with undefined values

```js
const expectedArray = [{ aa: undefined, bb: "b" }];
const actualArray = [{ cc: undefined, bb: "b" }];
// Expect API
expect(actualArray).to.deepEqualIgnoreUndefined(expectedArray);
// Assert API
assert.deepEqualIgnoreUndefined(expectedArray, actualArray);
```

3. Ignore a nested properties with undefined value (only for deep equal comparison)

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

## Contributing

Contributions are welcome. If you have any questions create an issue [here](https://github.com/DanielKurtjak/chai-deep-equal-ignore-undefined/issues).

## License

[MIT](LICENSE)
