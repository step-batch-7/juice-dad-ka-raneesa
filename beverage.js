const fs = require("fs");
const { timeStamp, getDataStorePath } = require("./src/config");
//const timeStamp = require("./src/utilitiesLib").timeStamp;
const validateAndPerformAction = require("./src/performAction")
  .validateAndPerformAction;

const main = function() {
  const arguments = process.argv.slice(2);
  const path = getDataStorePath(process.env);
  const timeStampWithEnv = timeStamp.bind(null, process.env);
  const result = validateAndPerformAction(
    arguments,
    fs.existsSync,
    fs.readFileSync,
    fs.writeFileSync,
    timeStampWithEnv,
    path
  );
  console.log(result);
};

main();
