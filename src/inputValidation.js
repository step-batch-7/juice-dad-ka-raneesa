const utilities = require("./utilitiesLib");

const isValidInput = function(args) {
  const validationOfAction = {
    "--save": validationOfSave,
    "--query": validationOfQuery,
    undefined: invalidInput
  };
  const index = utilities.getIndexOfAction(args);
  return validationOfAction[args[index]](args);
};

const invalidInput = function() {
  return false;
};

const validationOfSave = function(args) {
  const indexOfEmpId = args.indexOf("--empId") + 1;
  const indexOfQty = args.indexOf("--qty") + 1;
  const indexOfBeverage = args.indexOf("--beverage") + 1;
  return (
    utilities.isNumber(args[indexOfEmpId]) &&
    utilities.isNumber(args[indexOfQty]) &&
    !utilities.isNumber(args[indexOfBeverage]) &&
    args.length == 7
  );
};

const validationOfQuery = function(args) {
  if (args.length == 3) {
    let indexOfEmpId = args.indexOf("--empId") + 1;
    return utilities.isNumber(args[indexOfEmpId]);
  }
  return false;
};

exports.isValidInput = isValidInput;
exports.invalidInput = invalidInput;
exports.validateSave = validationOfSave;
exports.validateQuery = validationOfQuery;
