const isMatch = function(userInput, transaction) {
  let test = true;
  for (let options in userInput) {
    let optionToCheck = userInput[options];
    let optionOfCurrentData = transaction[options];

    if (options === "date") {
      let length = userInput[options].length;
      optionOfCurrentData = optionOfCurrentData.slice(0, length);
    }
    test = test && optionToCheck === optionOfCurrentData;
  }

  return test;
};

const makeObject = function(arguments) {
  const validOption = ["--beverage", "--qty", "--date", "--empId"];
  let args = arguments;
  return function(object, key, index) {
    if (validOption.includes(key)) {
      let option = key.slice(2);

      object[option] = args[index + 1];
    }

    return object;
  };
};

const makingObject = function(arguments) {
  return arguments.reduce(makeObject(arguments), {});
};

const query = function(
  arguments,
  isFilePresent,
  readFromFile,
  writeIntoFile,
  timeStamp,
  path
) {
  const userInput = makingObject(arguments);

  if (isFilePresent(path)) {
    const data = readFromFile(path);
    const record = JSON.parse(data);

    const transactions = record.filter(isMatch.bind(null, userInput));
    return transactions;
  }
  return 0;
};

exports.query = query;
exports.makeObject = makeObject;
exports.makingObject = makingObject;
