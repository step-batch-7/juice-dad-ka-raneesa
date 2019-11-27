const assert = require("assert");
const generateTransactionRecord = require("../src/savingTransactions.js")
  .generateTransactionRecord;
const saveAction = require("../src/savingTransactions.js").save;

describe("generateTransactionRecord", function() {
  it("Should generate transaction record", function() {
    const data = [
      "--save",
      "--qty",
      "1",
      "--empId",
      "11111",
      "--beverage",
      "orange"
    ];

    const expected = {
      "Employee ID": 11111,
      Beverage: "orange",
      Quantity: 1,
      Date: "2019-11-26T05:33:25.642Z"
    };

    const timeStamp = function() {
      return "2019-11-26T05:33:25.642Z";
    };
    assert.deepStrictEqual(
      generateTransactionRecord(data, timeStamp),
      expected
    );
  });
});

describe("save", function() {
  it("Should validate new Transaction data", function() {
    let arguments = [
      "--save",
      "--qty",
      "1",
      "--empId",
      "11111",
      "--beverage",
      "orange"
    ];
    let timeStamp = function() {
      return "2019-11-26T05:33:25.642Z";
    };
    let writeIntoFile = function(filepath, data) {
      return "";
    };
    let readFromFile = function(filepath) {
      return "{}";
    };
    let isFilePresent = function(filepath) {
      return false;
    };
    let path = "./deepika.js";
    let actual = saveAction(
      arguments,
      isFilePresent,
      readFromFile,
      writeIntoFile,
      timeStamp,
      path
    );
    let expected = {
      "Employee ID": 11111,
      Beverage: "orange",
      Quantity: 1,
      Date: "2019-11-26T05:33:25.642Z"
    };
    assert.deepStrictEqual(actual, expected);

    path = "./transactionsData";
    isFilePresent = function(filepath) {
      return true;
    };
    actual = saveAction(
      arguments,
      isFilePresent,
      readFromFile,
      writeIntoFile,
      timeStamp,
      path
    );
    expected = {
      "Employee ID": 11111,
      Beverage: "orange",
      Quantity: 1,
      Date: "2019-11-26T05:33:25.642Z"
    };
    assert.deepStrictEqual(actual, expected);

    readFromFile = function(filepath) {
      return '{"11111": [{"Employee ID": "11111","Beverage": "orange","Quantity": "2","Date": "2019-11-26T02:39:14.323Z"}]}';
    };
    actual = saveAction(
      arguments,
      isFilePresent,
      readFromFile,
      writeIntoFile,
      timeStamp,
      path
    );
    expected = {
      "Employee ID": 11111,
      Beverage: "orange",
      Quantity: 1,
      Date: "2019-11-26T05:33:25.642Z"
    };
    assert.deepStrictEqual(actual, expected);
  });
});
