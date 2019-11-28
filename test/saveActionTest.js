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
      "--beve",
      "orange"
    ];

    const expected = {
      empId: 11111,
      beve: "orange",
      qty: 1,
      date: "2019-11-26T05:33:25.642Z"
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
  it("Should validate new Transaction if file is not exist", function() {
    let arguments = [
      "--save",
      "--qty",
      "1",
      "--empId",
      "11111",
      "--beve",
      "orange"
    ];
    let timeStamp = function() {
      return "2019-11-26T05:33:25.642Z";
    };
    let writeIntoFile = function(filepath, data) {
      return "";
    };
    let readFromFile = function(filepath) {
      return "[]";
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
      empId: 11111,
      beve: "orange",
      qty: 1,
      date: "2019-11-26T05:33:25.642Z"
    };
    assert.deepStrictEqual(actual, expected);
  });
  it("Should validate for new Transaction if file is exist", function() {
    let arguments = [
      "--save",
      "--qty",
      "1",
      "--empId",
      "11111",
      "--beve",
      "orange"
    ];
    let timeStamp = function() {
      return "2019-11-26T05:33:25.642Z";
    };
    let writeIntoFile = function(filepath, data) {
      return "";
    };
    let readFromFile = function(filepath) {
      return "[]";
    };
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
      empId: 11111,
      beve: "orange",
      qty: 1,
      date: "2019-11-26T05:33:25.642Z"
    };
    assert.deepStrictEqual(actual, expected);
  });
});
