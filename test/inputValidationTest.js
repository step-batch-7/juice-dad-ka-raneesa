const chai = require("chai");
const assert = chai.assert;
const isValidInput = require("../src/inputValidation").isValidInput;
const invalidInput = require("../src/inputValidation").invalidInput;
const validateSave = require("../src/inputValidation").validateSave;
const validateQuery = require("../src/inputValidation").validateQuery;
const optionChecking = require("../src/inputValidation").optionChecking;

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
    assert.notOk(isValidInput(["--save", "--query", "--empId", "11111"]));
    assert.notOk(isValidInput(["--empId", "11111"]));
  });
});

describe("invalidInput", function() {
  it("should return false for invalid inputs", function() {
    assert.notOk(invalidInput("fgdsajf"));
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
    assert.notOk(
      validateSave([
        "--save",
        "--empId",
        "deepika",
        "--beveragerage",
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
    assert.ok(validateQuery(["--query", "--dfghj", "11111"]));
    assert.ok(
      !validateQuery([
        "--query",
        "--empId",
        "11111",
        "--beverage",
        "orange",
        "gdsg",
        "--qty",
        "3"
      ])
    );
  });
});

describe("optionChecking", function() {
  it("Should validate for if the given options are valid", function() {
    assert.ok(optionChecking(["--empId", "5363", "--qty", "--beverage"]));
  });
  it("Should validate for if the given options are invalid", function() {
    assert.notOk(optionChecking(["--empId", "5363", "--beverage"]));
  });
});
