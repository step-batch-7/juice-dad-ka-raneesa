const fs = require("fs");
let content = require("../information");

const checkingValidData = function(inputData, validData, time) {
  if (validData) {
    let inputOfObj = convertToObj(validData);
    let checkedData = checkingUserInput(inputData, inputOfObj, time);
    return checkedData;
  }
  return 0;
};

const convertToObj = function(validData) {
  let inputOfObj = {};
  for (let index = 0; index < validData.length; index++) {
    if (validData[index][0] == "--empId") {
      inputOfObj["Employee Id"] = +validData[index][1];
    } else if (validData[index][0] == "--beverage") {
      inputOfObj["Beverage"] = validData[index][1];
    } else {
      inputOfObj["Quantity"] = +validData[index][1];
    }
  }
  return inputOfObj;
};

const checkingUserInput = function(inputData, inputOfObj, time) {
  if (inputData.includes("--save")) {
    let empDetails = enteringData(inputOfObj, time);
    let keys = Object.keys(empDetails);
    let values = Object.values(empDetails);
    return "Transaction Recorded:\n" + keys + "\n" + values;
  }
  let empDetails = givingData(inputOfObj);
  return empDetails;
};

const enteringData = function(inputOfObj, time) {
  let empDetails = inputOfObj;
  empDetails["Date"] = time();
  content["table"].push(empDetails);
  let fileContent = JSON.stringify(content);
  fs.writeFileSync("./information.json", fileContent, "utf8");
  return empDetails;
};

const givingData = function(inputOfObj) {
  let transactions = [];
  let juices = 0;
  let fileContent = content["table"];
  let keys = Object.keys(fileContent[0]) + "\n";
  for (index = 0; index < fileContent.length; index++) {
    if (inputOfObj["Employee Id"] == fileContent[index]["Employee Id"]) {
      transactions.push("\n" + Object.values(fileContent[index]));
      juices = juices + fileContent[index]["Quantity"];
    }
  }
  return keys + transactions + "\nTotal : " + juices + "juices";
};
exports.checkingValidData = checkingValidData;
