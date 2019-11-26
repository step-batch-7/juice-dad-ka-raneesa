const filtering = function(string) {
  return !["--save", "--query"].includes(string);
};

const filterEmpData = function(input) {
  return input.filter(filtering);
};

const isNumber = function(num) {
  return Number.isInteger(parseInt(num));
};

const isValid = function(input) {
  if (["--empId", "--qty"].includes(input[0])) {
    return isNumber(input[1]);
  }
  if (["--beverage".includes(input[0])]) {
    return !isNumber(input[1]);
  }
  return 0;
};

const validateArguments = function(pairedData) {
  if (pairedData.every(isValid)) {
    return pairedData;
  }
  return 0;
};

const pairArguments = function(input) {
  let pairedArguments = [];
  for (let index = 0; index < input.length; index += 2) {
    pairedArguments.push([input[index], input[index + 1]]);
  }
  return pairedArguments;
};

const getValidInput = function(userInput, OptionLength) {
  let filteredData = filterEmpData(userInput);
  let pairedData = pairArguments(filteredData);
  let validData = validateArguments(pairedData);
  if (validData.length == OptionLength) {
    return validData;
  }
  return 0;
};

const inputValidation = function(userInput) {
  if (userInput.includes("--save")) {
    let validData = getValidInput(userInput, 3);
    return validData;
  }
  if (userInput.includes("--query")) {
    let validData = getValidInput(userInput, 1);
    return validData;
  }
  return 0;
};

exports.inputValidation = inputValidation;
