// reduce + 递归
const ReduceRealizeFlat = (arr, depth = 1) => {
  return depth > 0
    ? arr.reduce(
        (pre, cur) =>
          pre.concat(Array.isArray(cur) ? ReduceRealizeFlat(cur, --depth) : cur),
        []
      )
    : arr;
};

// concat + 递归
const ConcatRealizeFlat = (arr, depth = 1) => {
  if (depth > 0) {
    let tempArr = [];
    arr.forEach((element) => {
      if (Array.isArray(element) && depth > 0) {
        tempArr = tempArr.concat(ConcatRealizeFlat(element, --depth));
      } else {
        tempArr.push(element);
      }
    });
    return tempArr;
  } else {
    return arr;
  }

};

module.exports = { ReduceRealizeFlat, ConcatRealizeFlat };
