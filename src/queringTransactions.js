const query = function(
  args,
  isFilePresent,
  readFromFile,
  writeIntoFile,
  timeStamp,
  path
) {
  if (isFilePresent(path)) {
    const data = readFromFile(path);
    const record = JSON.parse(data);
    const indexOfEid = args.indexOf("--empId") + 1;
    const empId = args[indexOfEid];
    const allEmpIds = Object.keys(record);
    if (allEmpIds.includes(empId)) {
      const empData = record[empId];
      return empData;
    }
  }
  return 0;
};

exports.query = query;
