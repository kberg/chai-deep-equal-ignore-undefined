/// <reference types="@types/chai" />
declare module "chai-deep-equal-ignore-undefined" {
  export default function chaiEqualIgnoreUndefinedProps(
    chai: Chai.ChaiStatic,
    utils: Chai.ChaiUtils,
  ): void;
}

declare namespace Chai {
  interface Assertion
    extends LanguageChains,
      NumericComparison,
      TypeComparison {
    /**
     * Asserts that actual is deeply equal while ignoring undefined properties.
     *
     * @param expected  Expected value.
     * @param message   Message to display on error.
     */
    deepEqualIgnoreUndefined<T>(expected: T | T[], message?: string): Assertion;
  }

  interface Assert {
    /**
     * Asserts that actual is deeply equal while ignoring undefined properties.
     *
     * @param actual    Actual value.
     * @param expected  Expected value.
     * @param message   Message to display on error.
     */
    deepEqualIgnoreUndefined<T>(
      actual: T | T[],
      expected: T | T[],
      message?: string,
    ): void;

    /**
     * Asserts that actual is not deeply equal while ignoring undefined properties.
     *
     * @param actual    Actual value.
     * @param expected  Expected value.
     * @param message   Message to display on error.
     */
    notDeepEqualIgnoreUndefined<T>(
      actual: T | T[],
      expected: T | T[],
      message?: string,
    ): void;
  }
}
