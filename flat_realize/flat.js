// reduce + 递归
const ReduceRealizeFlat = (arr, num = 1) => {
  return num > 0
    ? arr.reduce(
        (pre, cur) =>
          pre.concat(Array.isArray(cur) ? ReduceRealizeFlat(cur, --num) : cur),
        []
      )
    : arr;
};

// concat + 递归
const ConcatRealizeFlat = (arr, num = 1) => {
  if (num > 0) {
    let tempArr = [];
    arr.forEach((element) => {
      if (Array.isArray(element)) {
        tempArr = tempArr.concat(ConcatRealizeFlat(element, --num));
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
