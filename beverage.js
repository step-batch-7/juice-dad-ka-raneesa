const lib = require("./src/beverageLib.js");
const inputValidation = require("./src/inputValidation.js").inputValidation;
let inputData = process.argv.slice(2);

let validData = inputValidation(inputData);

const generateTime = function() {
  return new Date();
};

let result = lib.checkingValidData(inputData, validData, generateTime);
console.log(result);

exports.generateTime = generateTime;
