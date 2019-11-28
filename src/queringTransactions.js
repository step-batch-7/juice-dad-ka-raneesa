const filterDate = function(filteredData, userData) {
  filteredData = filteredData.filter(function(transactions) {
    const length = userData.length;
    return transactions["date"].slice(0, length) == userData;
  });
  return filteredData;
};

const filterbeve = function(filteredData, userData) {
  filteredData = filteredData.filter(function(trasactions) {
    return trasactions["beve"] == userData;
  });
  return filteredData;
};

const concatData = function(record) {
  return function(concatedData, key) {
    return concatedData.concat(record[key]);
  };
};

const filterData = function(record, userInput) {
  const keys = Object.keys(record);
  let filteredData = keys.reduce(concatData(record), []);

  if (userInput["--empId"] != undefined) {
    filteredData = record[userInput["--empId"]];
  }

  if (filteredData != undefined) {
    if (userInput["--beve"] != undefined) {
      filteredData = filterbeve(filteredData, userInput["--beve"]);
    }
  }

  if (filteredData != undefined) {
    if (userInput["--date"] != undefined) {
      return filterDate(filteredData, userInput["--date"]);
    }
  }
  return filteredData;
};

const makeObject = function(arguments) {
  const validOption = ["--beve", "--qty", "--date", "--empId"];
  let args = arguments;
  return function(object, key, index) {
    if (validOption.includes(key)) {
      object[key] = args[index + 1];
    }
    return object;
  };
};

const query = function(
  arguments,
  isFilePresent,
  readFromFile,
  writeIntoFile,
  timeStamp,
  path
) {
  const userInput = arguments.reduce(makeObject(arguments), {});

  if (isFilePresent(path)) {
    const data = readFromFile(path);
    const record = JSON.parse(data);
    const transactions = filterData(record, userInput);
    return transactions;
  }
  return 0;
};

exports.query = query;
