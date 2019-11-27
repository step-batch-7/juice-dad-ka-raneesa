const assert = require("assert");
const isValidInput = require("../src/inputValidation.js").isValidInput;
const invalidInput = require("../src/inputValidation").invalidInput;
const validateSave = require("../src/inputValidation").validateSave;
const validateQuery = require("../src/inputValidation").validateQuery;

describe("isValidInput", function() {
  it("Should valid for save action", function() {
    assert.ok(
      isValidInput([
        "--empId",
        "11111",
        "--save",
        "--qty",
        "2",
        "--beverage",
        "orange"
      ])
    );
  });
  it("Should valid for query action", function() {
    assert.ok(["--empId", "11111", "--query"]);
  });
  it("should validate for invalid args", function() {
    assert.ok(!isValidInput(["--save", "--query", "--empId", "11111"]));
    assert.ok(!isValidInput(["--empId", "11111"]));
  });
});

describe("invalidInput", function() {
  it("should return false for invalid inputs", function() {
    assert.ok(!invalidInput("fgdsajf"));
  });
});

describe("validateSave", function() {
  it("should validate for valid arguments for save", function() {
    assert.ok(
      validateSave([
        "--save",
        "--empId",
        11111,
        "--beverage",
        "orange",
        "--qty",
        1
      ])
    );
  });
  it("should validate for invalid arguments for save", function() {
    assert.ok(
      !validateSave([
        "--save",
        "--empId",
        "deepika",
        "--beverage",
        "123",
        "--qty",
        1
      ])
    );
  });
});

describe("validateQuery", function() {
  it("should validate valid query args are given", function() {
    assert.ok(validateQuery(["--query", "--empId", "343434"]));
  });
  it("should validate invalid query args are given", function() {
    assert.ok(!validateQuery(["--query", "--dfghj", "11111"]));
    assert.ok(!validateQuery(["--query", "--empId", "11111", "--qty", "3"]));
  });
});
