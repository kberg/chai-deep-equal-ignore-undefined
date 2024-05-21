import * as chai from "chai";
import { expectType } from "tsd";

import ".";
import * as chaiEqualIgnoreUndefinedProperties from "./chai-deep-equal-ignore-undefined";

// @ts-ignore
chai.use(chaiEqualIgnoreUndefinedProperties);

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
