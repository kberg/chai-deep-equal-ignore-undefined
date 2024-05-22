import * as chai from "chai";
import { expectType } from "tsd";

import ".";
import chaiEqualIgnoreUndefinedProperties, {
  deepClone,
  deepCloneIgnoreUndefined,
} from "./chai-deep-equal-ignore-undefined";

// @ts-ignore
chai.use(chaiEqualIgnoreUndefinedProperties);

// *** Usage ***
// BDD API (expect)
expectType<Chai.Assertion>(
  chai
    .expect({ a: undefined, b: "b" })
    .to.deepEqualIgnoreUndefined({ b: "b", c: undefined }),
);

// Assert API
chai.assert.deepEqualIgnoreUndefined(
  { a: undefined, b: "b" },
  { b: "b", c: undefined },
  "message",
);

chai.assert.notDeepEqualIgnoreUndefined(
  { a: undefined, b: "b2" },
  { b: "b", c: undefined },
  "message",
);

// *** Deep clone function ***

expectType<any>(deepClone({ a: undefined, b: "b" }));
expectType<any>(deepCloneIgnoreUndefined({ a: undefined, b: "b" }));
