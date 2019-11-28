const chai = require("chai");
const assert = chai.assert;
const performAction = require("../src/performAction").performAction;
const createQueryMsg = require("../src/performAction").createQueryMsg;
const getTotalBeverages = require("../src/performAction").getTotalBeverages;

describe("createQueryMsg", function() {
  it("should give a text representation of list of one transaction", function() {
    const newTransactionRecord = [
      {
        beve: "orange",
        empId: 123,
        qty: 4,
        date: "2019-11-20T05:50:28.267Z"
      }
    ];
    const actual = createQueryMsg(newTransactionRecord);
    const expected =
      "Employee ID,Beverage,Quantity,Date\n123,orange,4,2019-11-20T05:50:28.267Z\nTotal: 4 Juices";
    assert.strictEqual(actual, expected);
  });
});

describe("getTotalBeverages", function() {
  it("should return total count of beverages when one transaction took place", function() {
    const empTransactions = [
      {
        empId: 123,
        beverage: "org",
        qty: 4,
        date: "2019-11-20T05:50:28.267Z"
      }
    ];
    const actual = getTotalBeverages(empTransactions);
    const expected = 4;
    assert.strictEqual(actual, expected);
  });
  it("should return total count of beverages when two transaction took place", function() {
    const empTransactions = [
      {
        empId: 123,
        beverage: "org",
        qty: 4,
        date: "2019-11-20T05:50:28.267Z"
      },
      {
        empId: 123,
        beverage: "org",
        qty: 4,
        date: "2019-11-20T05:50:28.267Z"
      }
    ];
    const actual = getTotalBeverages(empTransactions);
    const expected = 8;
    assert.strictEqual(actual, expected);
  });
});

describe("performAction", function() {
  it("Should validate save function", function() {
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
      return "{}";
    };
    let isFilePresent = function(filepath) {
      return false;
    };
    let path = "./deepika.js";
    let actual = performAction(
      arguments,
      isFilePresent,
      readFromFile,
      writeIntoFile,
      timeStamp,
      path
    );
    let expected =
      "Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date\n11111,orange,1,2019-11-26T05:33:25.642Z";
    assert.strictEqual(actual, expected);
  });

  it("Should should work for query", function() {
    let arguments = ["--query", "--empId", "11111"];
    let timeStamp = function() {
      return "2019-11-26T05:33:25.642Z";
    };
    let writeIntoFile = function(filepath, data) {
      return "";
    };
    let readFromFile = function(filepath) {
      return '[{"empId":"11111","beve":"orange","qty":"2","date":"2019-11-26T05:33:25.642Z"}]';
    };
    let isFilePresent = function(filepath) {
      return true;
    };
    let path = "./deepika.js";
    let actual = performAction(
      arguments,
      isFilePresent,
      readFromFile,
      writeIntoFile,
      timeStamp,
      path
    );
    let expected =
      "Employee ID,Beverage,Quantity,Date\n" +
      "11111,orange,2,2019-11-26T05:33:25.642Z\n" +
      "Total: 2 Juices";
    assert.strictEqual(actual, expected);
  });
});
