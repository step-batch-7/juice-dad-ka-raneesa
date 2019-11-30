const generateTransactionRecord = function(input, timeStamp) {
  const indexOfEmpId = input.indexOf("--empId") + 1;
  const indexOfBeverage = input.indexOf("--beverage") + 1;
  const indexOfQty = input.indexOf("--qty") + 1;

  return {
    empId: +input[indexOfEmpId],
    beverage: input[indexOfBeverage],
    qty: +input[indexOfQty],
    date: timeStamp()
  };
};

const readRecords = function(readFromFile, path) {
  const records = readFromFile(path, "utf8");
  return JSON.parse(records);
};

const writeRecords = function(record, writeIntoFile, path) {
  const stringifiedRecord = JSON.stringify(record);
  writeIntoFile(path, stringifiedRecord);
};

const save = function(
  arguments,
  isFilePresent,
  readFromFile,
  writeIntoFile,
  timeStamp,
  path
) {
  let record = [];
  if (isFilePresent(path)) {
    record = readRecords(readFromFile, path);
  }
  let newRecord = generateTransactionRecord(arguments, timeStamp);
  record.push(newRecord);
  writeRecords(record, writeIntoFile, path);
  return newRecord;
};

exports.save = save;
exports.generateTransactionRecord = generateTransactionRecord;
