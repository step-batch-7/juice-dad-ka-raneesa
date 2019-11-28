const assert = require("assert");
const queryAction = require("../src/queringTransactions.js").query;

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

  it("Should should validate if file is not present", function() {
    let arguments = ["--query", "--empId", "11111"];
    let timeStamp = function() {
      return "2019-11-26T05:33:25.642Z";
    };
    let writeIntoFile = function(filepath, data) {
      return "";
    };
    let readFromFile = function(filepath) {
      return '{"123": [{"Employee ID": "11111","Beverage": "orange","Quantity": "2","Date": "2019-11-26T02:39:14.323Z"}]}';
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

  it("Should should validate if empId is not present", function() {
    let arguments = ["--query", "--empId", "11111"];
    let timeStamp = function() {
      return "2019-11-26T05:33:25.642Z";
    };
    let writeIntoFile = function(filepath, data) {
      return "";
    };
    let readFromFile = function(filepath) {
      return '{"11111": [{"Employee ID": "11111","Beverage": "orange","Quantity": "2","Date": "2019-11-26T02:39:14.323Z"}]}';
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
});
