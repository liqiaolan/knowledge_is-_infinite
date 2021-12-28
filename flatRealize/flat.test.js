const { ReduceRealizeFlat, ConcatRealizeFlat } = require("./flat");

const arr1 = [
  1,
  2,
  3,
  4,
  [1, 2, 3, [1, 2, 3, [1, 2, 3]]],
  5,
  "string",
  { name: "弹铁蛋同学" },
];
const result1 = [
  1,
  2,
  3,
  4,
  1,
  2,
  3,
  [1, 2, 3, [1, 2, 3]],
  5,
  "string",
  { name: "弹铁蛋同学" },
];
const result2 = [
  1,
  2,
  3,
  4,
  1,
  2,
  3,
  1,
  2,
  3,
  [1, 2, 3],
  5,
  "string",
  { name: "弹铁蛋同学" },
];
const result3 = [
  1,
  2,
  3,
  4,
  1,
  2,
  3,
  1,
  2,
  3,
  1,
  2,
  3,
  5,
  "string",
  { name: "弹铁蛋同学" },
];

describe("Realize flat exactly", () => {
  test("ReduceRealizeFlat realize exactly ", () => {
    expect(ReduceRealizeFlat(arr1)).toEqual(result1);
    expect(ReduceRealizeFlat(arr1, 0)).toEqual(arr1);
    expect(ReduceRealizeFlat(arr1, 1)).toEqual(result1);
    expect(ReduceRealizeFlat(arr1, 2)).toEqual(result2);
    expect(ReduceRealizeFlat(arr1, Infinity)).toEqual(result3);
  });

  test("ConcatRealizeFlat realize exactly ", () => {
    expect(ConcatRealizeFlat(arr1)).toEqual(result1);
    expect(ConcatRealizeFlat(arr1, 0)).toEqual(arr1);
    expect(ConcatRealizeFlat(arr1, 1)).toEqual(result1);
    expect(ConcatRealizeFlat(arr1, 2)).toEqual(result2);
    expect(ConcatRealizeFlat(arr1, Infinity)).toEqual(result3);
  });
});
