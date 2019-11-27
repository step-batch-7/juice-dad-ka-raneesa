const generateTransactionRecord = function(input, timeStamp) {
  const indexOfEmpId = input.indexOf("--empId") + 1;
  const indexOfBeverage = input.indexOf("--beverage") + 1;
  const indexOfQty = input.indexOf("--qty") + 1;

  return {
    "Employee ID": +input[indexOfEmpId],
    Beverage: input[indexOfBeverage],
    Quantity: +input[indexOfQty],
    Date: timeStamp()
  };
};

const save = function(
  arguments,
  isFilePresent,
  readFromFile,
  writeIntoFile,
  timeStamp,
  path
) {
  let record = {};
  if (isFilePresent(path)) {
    const data = readFromFile(path, "utf8");
    record = JSON.parse(data);
  }
  const recordKeys = Object.keys(record);
  const indexOfEmpId = arguments.indexOf("--empId") + 1;
  const empId = arguments[indexOfEmpId];
  const newRecord = generateTransactionRecord(arguments, timeStamp);
  if (recordKeys.includes(empId)) {
    record[empId].push(newRecord);
  } else {
    record[empId] = [newRecord];
  }
  const stringifiedRecord = JSON.stringify(record);
  writeIntoFile(path, stringifiedRecord);
  return newRecord;
};

exports.save = save;
exports.generateTransactionRecord = generateTransactionRecord;
