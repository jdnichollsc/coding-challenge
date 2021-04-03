"use strict";
const Utils = require("./utils");
// Print all entries, across all of the sources, in chronological order.

module.exports = (logSources, printer) => {
  const logs = []
  while (logSources.length) {
    const logSource = logSources.shift()
    while (!logSource.drained) {
      const log = logSource.pop()
      if (log) Utils.insertSorted(logs, log)
    }
  }
  for (let i = 0; i < logs.length; i++) {
    printer.print(logs[i])
  }
  printer.done()
  return console.log("Sync sort complete.");
};
