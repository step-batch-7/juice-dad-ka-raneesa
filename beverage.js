const fs = require("fs");
const timeStamp = require("./src/utilitiesLib").timeStamp;
const validateAndPerformAction = require("./src/performAction")
  .validateAndPerformAction;

const main = function() {
  const arguments = process.argv.slice(2);
  const path = "./transactionsData.json";
  const result = validateAndPerformAction(
    arguments,
    fs.existsSync,
    fs.readFileSync,
    fs.writeFileSync,
    timeStamp,
    path
  );
  console.log(result);
};

main();
