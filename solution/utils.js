function insertSorted(arr, log) {
  let low = 0
  let high = arr.length
  while (low < high) {
    const mid = Math.floor(low + (high-low)/2)
    const currentLog = arr[mid]
    if (currentLog && currentLog.date.getTime() - log.date.getTime() > 0) {
      high = mid
    } else {
      low = mid + 1
    }
  }
  arr.splice(low, 0, log)
}

module.exports = {
  insertSorted
}
