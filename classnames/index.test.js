const classNames = require("./index");

test("Realize classnames exactly", () => {
  expect(
    classNames({
      a: true,
      b: false,
      c: 0,
      d: null,
      e: undefined,
      f: 1,
    })
  ).toBe("a f");
  expect(classNames("a", 0, null, undefined, true, 1, "b")).toBe("a 1 b");
  expect(classNames({ a: true }, "b", 0)).toBe("a b");
  expect(classNames("", "b", {}, "")).toBe("b");
  expect(classNames({})).toBe("");
  expect(classNames(["a", "b"])).toBe("a b");
  expect(classNames(["a", "b"], "c")).toBe("a b c");
  expect(classNames("c", ["a", "b"])).toBe("c a b");
  expect(classNames(["a", "b"], ["c", "d"])).toBe("a b c d");
  expect(classNames(["a", 0, null, undefined, false, true, "b"])).toBe("a b");
  expect(classNames(["a", ["b", "c"]])).toBe("a b c");
  expect(classNames(["a", { b: true, c: false }])).toBe("a b");
  expect(classNames(["a", ["b", ["c", { d: true }]]])).toBe("a b c d");
  expect(classNames("a", [])).toBe("a");
  expect(classNames("a", [[]])).toBe("a");
  expect(
    classNames({
      null: null,
      emptyString: "",
      noNumber: NaN,
      zero: 0,
      negativeZero: -0,
      false: false,
      undefined: undefined,
      nonEmptyString: "foobar",
      whitespace: " ",
      function: Object.prototype.toString,
      emptyObject: {},
      nonEmptyObject: { a: 1, b: 2 },
      emptyList: [],
      nonEmptyList: [1, 2, 3],
      greaterZero: 1,
    })
  ).toBe(
    "nonEmptyString whitespace function emptyObject nonEmptyObject emptyList nonEmptyList greaterZero"
  );

  /**
   * 验证函数 本人觉得没有使用场景所以暂时不写了不测了
   *  */
  // expect(classNames({
  //   toString: function () { return 'classFromMethod'; }
  // })).toBe('classFromMethod');
  // var Class1 = function() {};
  // var Class2 = function() {};
  // Class1.prototype.toString = function() { return 'classFromMethod'; }
  // Class2.prototype = Object.create(Class1.prototype);
  // expect(classNames(new Class2())).toBe('classFromMethod');

  /**
   * 测试马老板要的antd类名功能
   */
  let prefixCls = "ant-btn";
  expect(
    classNames(
      prefixCls,
      {
        loading: true,
        primary: 1,
        error: undefined,
        addPrefixCls: () => {
          return prefixCls + "-";
        },
      },
      "a"
    )
  ).toBe("ant-btn ant-btn-loading ant-btn-primary a");
});
