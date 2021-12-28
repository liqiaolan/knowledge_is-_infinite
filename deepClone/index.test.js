const DeepClone = require("./index");

describe("Realize deepclone exactly", () => {
  // number类型复制
  test("Number deepclone realize exactly ", () => {
    let oldArg = 1;
    let newArg = DeepClone(oldArg);
    expect(newArg).toBe(1);
    newArg = 2;
    expect(newArg).toBe(2);
    expect(oldArg).toBe(1);
  });

  // 字符串类型复制
  test("String deepclone realize exactly ", () => {
    let oldArg = "旧的字符串";
    let newArg = DeepClone(oldArg);
    expect(newArg).toBe("旧的字符串");
    newArg = "新的字符串";
    expect(newArg).toBe("新的字符串");
    expect(oldArg).toBe("旧的字符串");
  });

  // 布尔值类型复制
  test("Boolean deepclone realize exactly ", () => {
    let oldArg = true;
    let newArg = DeepClone(oldArg);
    expect(newArg).toBe(true);
    newArg = false;
    expect(newArg).toBe(false);
    expect(oldArg).toBe(true);
  });

  // Undefined类型复制
  test("Undefined deepclone realize exactly ", () => {
    let oldArg = undefined;
    let newArg = DeepClone(oldArg);
    expect(newArg).toBe(undefined);
    newArg = "hahaguo";
    expect(newArg).toBe("hahaguo");
    expect(oldArg).toBe(undefined);
  });

  // Null类型复制
  test("Null deepclone realize exactly ", () => {
    let oldArg = null;
    let newArg = DeepClone(oldArg);
    expect(newArg).toBe(null);
    newArg = "hahaguo";
    expect(newArg).toBe("hahaguo");
    expect(oldArg).toBe(null);
  });

  // Array类型复制
  test("Array deepclone realize exactly ", () => {
    let oldArg = [1, 2, [3, 4, [5]], 6];
    let newArg = DeepClone(oldArg);
    newArg[2][0] = "ha";
    expect(newArg[2][0]).toBe("ha");
    expect(oldArg[2][0]).toBe(3);
  });

  // Object类型复制
  test("Object deepclone realize exactly ", () => {
    let oldArg = {
      id: 1,
      name: "哈哈果",
      child: {
        childname: "哈哈果1",
        age: 18,
      },
      add: (arg1, arg2) => {
        return arg1 + arg2;
      },
    };
    Object.defineProperty(oldArg, "__proto__", {
      value: 20,
      configurable: true,
      enumerable: true,
      writable: true,
    });
    let newArg = DeepClone(oldArg);
    newArg.id = 2;
    expect(oldArg.id).toBe(1);
    expect(newArg.id).toBe(2);
    newArg.child.age = 20;
    expect(oldArg.child.age).toBe(18);
    expect(newArg.child.age).toBe(20);
    newArg.add = function (arg1, arg2) {
      return arg1 * arg2;
    };
    expect(oldArg.add(1, 2)).toBe(3);
    expect(newArg.add(1, 2)).toBe(2);
    newArg["__proto__"] = 21;
    expect(newArg["__proto__"]).toBe(21);
    expect(oldArg["__proto__"]).toBe(20);
  });

  // Set类型复制
  test("Set deepclone realize exactly ", () => {
    let oldArg = new Set([1, 2, 4, 5, 6]);
    let newArg = DeepClone(oldArg);
    newArg.add("hahaguo");
    expect(oldArg.size).toBe(5);
    expect(newArg.size).toBe(6);
  });
});
