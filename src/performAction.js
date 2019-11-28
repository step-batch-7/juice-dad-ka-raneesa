const save = require("./savingTransactions").save;
const query = require("./queringTransactions").query;
const getIndexOfAction = require("./utilitiesLib").getIndexOfAction;
const isValidInput = require("./inputValidation").isValidInput;
const invalidMsg = require("./utilitiesLib").invalidMsg;

const changingLabels = function(key) {
  if (key == "beve") {
    return "Beverage";
  }
  if (key == "empId") {
    return "Employee ID";
  }
  if (key == "qty") {
    return "Quantity";
  }
  if (key == "date") {
    return "Date";
  }
};

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
    const tableColumns = Object.keys(newRecord);
    let modifiedTableColumns = tableColumns.map(changingLabels);
    const tableValues = Object.values(newRecord);
    return (
      "Transaction Recorded:\n" + modifiedTableColumns + "\n" + tableValues
    );
  }
  if (arguments.includes("--query")) {
    const empData = query(
      arguments,
      isFilePresent,
      readFromFile,
      writeIntoFile,
      timeStamp,
      path
    );
    if (empData != 0 && empData != undefined) {
      const empTotalBeverages = empData.reduce(function(sum, obj) {
        return sum + parseInt(obj["qty"]);
      }, 0);
      const headings = Object.keys(empData[0]);
      let modifiedHeadings = headings.map(changingLabels);
      const fields = empData.map(function(obj) {
        return Object.values(obj);
      });
      return (
        modifiedHeadings +
        "\n" +
        fields.join("\n") +
        "\n" +
        "Total Beverages: " +
        empTotalBeverages
      );
    } else {
      return "Records Not Found";
    }
  }
};

exports.validateAndPerformAction = validateAndPerformAction;
exports.performAction = performAction;
