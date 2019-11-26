const fs = require("fs");

const readFromFile = function(filepath) {
  return fs.readFileSync(filepath, "utf8");
};

const writeIntoFile = function(filepath, data) {
  fs.writeFileSync(filepath, data);
};

const isFilePresent = function(filepath) {
  return fs.existsSync(filepath);
};

const timeStamp = function() {
  return new Date().toJSON();
};

const isNumber = function(num) {
  return Number.isInteger(+num);
};

const getIndexOfAction = function(args) {
  let exorArgs = args.includes("--save") && args.includes("--query");
  if (exorArgs) {
    return -1;
  }
  return (args.indexOf("--save") + 1 || args.indexOf("--query") + 1) - 1;
};

const inValidMsg = function() {
  return "please enter valid input";
};

exports.isNumber = isNumber;
exports.timeStamp = timeStamp;
exports.invalidMsg = inValidMsg;
exports.getIndexOfAction = getIndexOfAction;
exports.isFilePresent = isFilePresent;
exports.readFromFile = readFromFile;
exports.writeIntoFile = writeIntoFile;
