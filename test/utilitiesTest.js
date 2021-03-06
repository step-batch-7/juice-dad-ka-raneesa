const utilities = require("../src/utilitiesLib");
const chai = require("chai");
const assert = chai.assert;

describe("isOdd", function() {
  it("Should validate if given number is odd", function() {
    assert.ok(utilities.isOdd(3));
  });
  it("Should validate if given number is not odd", function() {
    assert.notOk(utilities.isOdd(2));
  });
});

describe("isNumber", function() {
  it("should validate for numbers only", function() {
    assert.ok(utilities.isNumber("2"));
  });
  it("should validate for which are not numbers", function() {
    assert.ok(!utilities.isNumber("deep"));
    assert.ok(!utilities.isNumber("hi"));
  });
});

describe("getIndexOfAction", function() {
  it("should give index of --save", function() {
    assert.strictEqual(utilities.getIndexOfAction(["empId", "--save"]), 1);
  });
  it("should give index of --query", function() {
    assert.strictEqual(
      utilities.getIndexOfAction(["empId", "11111", "--query"]),
      2
    );
  });
  it("should give -1 if both are exists", function() {
    assert.strictEqual(utilities.getIndexOfAction(["--save", "--query"]), -1);
  });
  it("should give -1 if both doesn't exists", function() {
    assert.strictEqual(utilities.getIndexOfAction(["hi", "bye"]), -1);
  });
});

describe("invalidMsg", function() {
  it("Should give message for invalid input", function() {
    assert.strictEqual(utilities.invalidMsg(), "please enter valid input");
  });
});
