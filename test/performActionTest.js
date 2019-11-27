const assert = require("assert");
const fs = require("fs");

const performAction = require("../src/performAction").performAction;

describe("performAction", function() {
  it("Should validate save function", function() {
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
    let actual = performAction(
      arguments,
      isFilePresent,
      readFromFile,
      writeIntoFile,
      timeStamp,
      path
    );
    let expected =
      "Transaction Recorded:\n" +
      "Employee ID,Beverage,Quantity,Date" +
      "\n" +
      "11111,orange,1,2019-11-26T05:33:25.642Z";
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
      return '{"11111":[{"Employee ID":11111,"Beverage":"orange","Quantity":2,"Time":"2019-11-26T05:33:25.642Z"}]}';
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
      "Employee ID,Beverage,Quantity,Time\n" +
      "11111,orange,2,2019-11-26T05:33:25.642Z\n" +
      "Total Beverages: 2";
    assert.strictEqual(actual, expected);
  });
});
