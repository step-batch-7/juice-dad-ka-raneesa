const assert = require("assert");
const isMatch = require("../src/queringTransactions.js").isMatch;
const queryAction = require("../src/queringTransactions.js").query;
const makingObject = require("../src/queringTransactions.js").makingObject;

describe("isMatch", function() {
  it("Should validate if given empId is present", function() {
    let userInput = { empId: "11111" };
    let transaction = {
      empId: "11111",
      beverage: "orange",
      qty: 2,
      date: "2019-11-26T02:39:14.323Z"
    };
    let actual = isMatch(userInput, transaction);
    assert.strictEqual(actual, true);
  });

  it("Should validate if given empId is not present", function() {
    let userInput = { empId: "11112" };
    let transaction = {
      empId: "11111",
      beverage: "orange",
      qty: 2,
      date: "2019-11-26T02:39:14.323Z"
    };
    let actual = isMatch(userInput, transaction);
    assert.strictEqual(actual, false);
  });

  it("Should validate if given time is present ", function() {
    let userInput = { date: "2019-11-26" };
    let transaction = {
      empId: "11111",
      beverage: "orange",
      qty: 2,
      date: "2019-11-26T02:39:14.323Z"
    };
    let actual = isMatch(userInput, transaction);
    assert.strictEqual(actual, true);
  });

  it("Should validate if given time is not present ", function() {
    let userInput = { date: "2019-11-27" };
    let transaction = {
      empId: "11111",
      beverage: "orange",
      qty: 2,
      date: "2019-11-26T02:39:14.323Z"
    };
    let actual = isMatch(userInput, transaction);
    assert.strictEqual(actual, false);
  });

  it("Should validate if given beverage is present", function() {
    let userInput = { beverage: "orange" };
    let transaction = {
      empId: "11111",
      beverage: "orange",
      qty: 2,
      date: "2019-11-26T02:39:14.323Z"
    };
    let actual = isMatch(userInput, transaction);
    assert.strictEqual(actual, true);
  });

  it("Should validate if given beverage is not present", function() {
    let userInput = { beverage: "banana" };
    let transaction = {
      empId: "11111",
      beverage: "orange",
      qty: 2,
      date: "2019-11-26T02:39:14.323Z"
    };
    let actual = isMatch(userInput, transaction);
    assert.strictEqual(actual, false);
  });
});

describe("makeObject", function() {
  it("Should give input data in object format", function() {
    let args = ["--query", "--empId", "12121", "--qty", "5"];
    let actual = makingObject(args);
    let expected = { empId: "12121", qty: "5" };
    assert.deepStrictEqual(actual, expected);
  });
});

describe("QueryAction", function() {
  it("Should return transactions of given employee", function() {
    let arguments = ["--query", "--empId", "11111"];
    let timeStamp = function() {
      return "2019-11-26T05:33:25.642Z";
    };
    let writeIntoFile = function(filepath, data) {
      return "";
    };
    let readFromFile = function(filepath) {
      return '[{"empId": "11111","beve": "orange","qty": "2","date": "2019-11-26T02:39:14.323Z"}]';
    };
    let isFilePresent = function(filepath) {
      return true;
    };
    let path = "./deepika.js";
    let actual = queryAction(
      arguments,
      isFilePresent,
      readFromFile,
      writeIntoFile,
      timeStamp,
      path
    );
    let expected = [
      {
        empId: "11111",
        beve: "orange",
        qty: "2",
        date: "2019-11-26T02:39:14.323Z"
      }
    ];

    assert.deepStrictEqual(actual, expected);
  });

  it("Should validate if file is not present", function() {
    let arguments = ["--query", "--empId", "11111"];
    let timeStamp = function() {
      return "2019-11-26T05:33:25.642Z";
    };
    let writeIntoFile = function(filepath, data) {
      return "";
    };
    let readFromFile = function(filepath) {
      return '[{"emplId": "11111","beverage": "orange","qty": "2","date": "2019-11-26T02:39:14.323Z"}]';
    };
    let isFilePresent = function(filepath) {
      return false;
    };
    let path = "./deepika.js";
    let actual = queryAction(
      arguments,
      isFilePresent,
      readFromFile,
      writeIntoFile,
      timeStamp,
      path
    );
    assert.strictEqual(actual, 0);
  });

  it("Should validate if beverage is given", function() {
    let arguments = ["--query", "--beverage", "orange"];
    let timeStamp = function() {
      return "2019-11-26T05:33:25.642Z";
    };
    let writeIntoFile = function(filepath, data) {
      return "";
    };
    let readFromFile = function(filepath) {
      return '[{"empId": "11111","beverage": "orange","qty": "2","date": "2019-11-26T02:39:14.323Z"}]';
    };
    let isFilePresent = function(filepath) {
      return true;
    };
    let path = "./deepika.js";
    let actual = queryAction(
      arguments,
      isFilePresent,
      readFromFile,
      writeIntoFile,
      timeStamp,
      path
    );
    let expected = [
      {
        empId: "11111",
        beverage: "orange",
        qty: "2",
        date: "2019-11-26T02:39:14.323Z"
      }
    ];
    assert.deepStrictEqual(actual, expected);
  });

  it("Should validate if time is given", function() {
    let arguments = ["--query", "--time", "2019-11-26"];
    let timeStamp = function() {
      return "2019-11-26T05:33:25.642Z";
    };
    let writeIntoFile = function(filepath, data) {
      return "";
    };
    let readFromFile = function(filepath) {
      return '[{"empId": "11111","beverage": "orange","qty": "2","date": "2019-11-26T02:39:14.323Z"}]';
    };
    let isFilePresent = function(filepath) {
      return true;
    };
    let path = "./deepika.js";
    let actual = queryAction(
      arguments,
      isFilePresent,
      readFromFile,
      writeIntoFile,
      timeStamp,
      path
    );
    let expected = [
      {
        empId: "11111",
        beverage: "orange",
        qty: "2",
        date: "2019-11-26T02:39:14.323Z"
      }
    ];
    assert.deepStrictEqual(actual, expected);
  });
});
