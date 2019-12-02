const save = require("./savingTransactions").save;
const query = require("./queringTransactions").query;
const isValidInput = require("./inputValidation").isValidInput;
const invalidMsg = require("./utilitiesLib").invalidMsg;

const validateAndPerformAction = function(
  arguments,
  isFilePresent,
  readFromFile,
  writeIntoFile,
  timeStamp,
  path
) {
  {
    if (!isValidInput(arguments)) {
      return invalidMsg();
    }
    return performAction(
      arguments,
      isFilePresent,
      readFromFile,
      writeIntoFile,
      timeStamp,
      path
    );
  }
};

const reducerForBeverages = function(totalBeverages, obj) {
  return totalBeverages + parseInt(obj["qty"]);
};

const getTotalBeverages = function(empRecord) {
  return empRecord.reduce(reducerForBeverages, 0);
};

const toRow = function(transaction) {
  return [
    transaction.empId,
    transaction.beverage,
    transaction.qty,
    transaction.date
  ];
};

const createQueryMsg = function(empRecord) {
  const totalBeverages = getTotalBeverages(empRecord);
  const heading = "Employee ID, Beverage, Quantity, Date";

  const rows = empRecord.map(toRow);
  let juices = "Juices";
  if (totalBeverages == 1) {
    juices = "Juice";
  }

  return [heading, ...rows, `Total: ${totalBeverages} ${juices}`].join("\n");
};

const performAction = function(
  arguments,
  isFilePresent,
  readFromFile,
  writeIntoFile,
  timeStamp,
  path
) {
  if (arguments.includes("--save")) {
    const newRecord = save(
      arguments,
      isFilePresent,
      readFromFile,
      writeIntoFile,
      timeStamp,
      path
    );
    const tableColumns = ["Employee ID", " Beverage", " Quantity", " Date"];
    const tableValues = [
      newRecord.empId,
      newRecord.beverage,
      newRecord.qty,
      newRecord.date.toJSON()
    ];
    return "Transaction Recorded:\n" + tableColumns + "\n" + tableValues;
  }
  if (arguments.includes("--query")) {
    const empRecord = query(
      arguments,
      isFilePresent,
      readFromFile,
      writeIntoFile,
      timeStamp,
      path
    );

    if (empRecord != 0 && empRecord != undefined) {
      const queryMsg = createQueryMsg(empRecord);
      return queryMsg;
    } else {
      return createQueryMsg([]);
    }
  }
};

exports.validateAndPerformAction = validateAndPerformAction;
exports.performAction = performAction;
exports.createQueryMsg = createQueryMsg;
exports.getTotalBeverages = getTotalBeverages;
