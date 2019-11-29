const fs = require("fs");

const timeStamp = function() {
  return new Date().toJSON();
};

const isOdd = function(num) {
  return num % 2 != 0;
};

const isNumber = function(num) {
  return Number.isInteger(+num);
};

const getIndexOfAction = function(args) {
  let result = args.includes("--save") && args.includes("--query");
  if (result) {
    return -1;
  }
  return (args.indexOf("--save") + 1 || args.indexOf("--query") + 1) - 1;
};

const inValidMsg = function() {
  return "please enter valid input";
};

exports.isOdd = isOdd;
exports.isNumber = isNumber;
exports.timeStamp = timeStamp;
exports.invalidMsg = inValidMsg;
exports.getIndexOfAction = getIndexOfAction;
