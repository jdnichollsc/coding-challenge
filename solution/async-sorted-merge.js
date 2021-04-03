"use strict";
const P = require("bluebird");
const Utils = require("./utils");
// Print all entries, across all of the *async* sources, in chronological order.

module.exports = (logSources, printer) => {
  return new Promise((resolve, reject) => {
    const logs = []
    P.map(logSources, async (logSource) => {
      while (!logSource.drained) {
        const log = await logSource.popAsync()
        if (log) Utils.insertSorted(logs, log)
      }
      return
    })
    .then(() => {
      for (let i = 0; i < logs.length; i++) {
        printer.print(logs[i])
      }
      printer.done()
    })
    .catch(reject)
  })
  .then(() => console.log("Async sort complete."));
};
