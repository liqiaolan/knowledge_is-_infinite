import DeepEqual from "./index";

describe("Realize deepEqual exactly", () => {
  test("scalars", () => {
    expect(DeepEqual(1, 1)).toBe(true);
    expect(DeepEqual(1, 2)).toBe(false);
    expect(DeepEqual(1, [])).toBe(false);
    expect(DeepEqual(1, "1")).toBe(false);
    expect(DeepEqual(Infinity, Infinity)).toBe(true);
    expect(DeepEqual(Infinity, -Infinity)).toBe(false);
    expect(DeepEqual(NaN, undefined)).toBe(false);
    expect(DeepEqual(NaN, null)).toBe(false);
    expect(DeepEqual(NaN, NaN)).toBe(true);
    expect(DeepEqual(1, -1)).toBe(false);
    expect(DeepEqual(0, -0)).toBe(true);

    expect(DeepEqual(null, null)).toBe(true);
    expect(DeepEqual(void 0, undefined)).toBe(true);
    expect(DeepEqual(undefined, undefined)).toBe(true);
    expect(DeepEqual(null, undefined)).toBe(false);
    expect(DeepEqual("", null)).toBe(false);
    expect(DeepEqual(0, null)).toBe(false);

    expect(DeepEqual(true, true)).toBe(true);
    expect(DeepEqual(false, false)).toBe(true);
    expect(DeepEqual(true, false)).toBe(false);
    expect(DeepEqual(0, false)).toBe(false);
    expect(DeepEqual(1, true)).toBe(false);

    expect(DeepEqual("a", "a")).toBe(true);
    expect(DeepEqual("a", "b")).toBe(false);
  });

  test("Objects", () => {
    expect(DeepEqual({}, {})).toBe(true);
    expect(DeepEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
    expect(DeepEqual({ b: 2, a: 1 }, { a: 1, b: 2 })).toBe(true);

    expect(DeepEqual({ a: 1, b: 2, c: [] }, { a: 1, b: 2 })).toBe(false);
    expect(DeepEqual({ a: 1, b: 2 }, { a: 1, b: 2, c: [] })).toBe(false);
    expect(DeepEqual({ a: 1, c: 3 }, { a: 1, b: 2 })).toBe(false);

    expect(DeepEqual({ a: [{ b: 1 }] }, { a: [{ b: 1 }] })).toBe(true);
    expect(DeepEqual({ a: [{ b: 2 }] }, { a: [{ b: 1 }] })).toBe(false);
    expect(DeepEqual({ a: [{ c: 1 }] }, { a: [{ b: 1 }] })).toBe(false);

    expect(DeepEqual([], {})).toBe(false);
    expect(DeepEqual({}, [])).toBe(false);
    expect(DeepEqual({}, null)).toBe(false);
    expect(DeepEqual({}, undefined)).toBe(false);

    expect(DeepEqual({ a: void 0 }, {})).toBe(false);
    expect(DeepEqual({}, { a: undefined })).toBe(false);
    expect(DeepEqual({ a: undefined }, { b: undefined })).toBe(false);
  });

  test("dictionary", () => {
    const foo = Object.create(null);
    const bar = Object.create(null);
    expect(DeepEqual(foo, bar)).toBe(true);
    foo.hello = "world";
    expect(DeepEqual(foo, bar)).toBe(false);
  });

  test("Arrays", () => {
    expect(DeepEqual([], [])).toBe(true);
    expect(DeepEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(DeepEqual([1, 2, 4], [1, 2, 3])).toBe(false);
    expect(DeepEqual([1, 2], [1, 2, 3])).toBe(false);
    expect(DeepEqual([{ a: 1 }, { b: 2 }], [{ a: 1 }, { b: 2 }])).toBe(true);
    expect(DeepEqual([{ a: 2 }, { b: 2 }], [{ a: 1 }, { b: 2 }])).toBe(false);
    expect(DeepEqual({ 0: 0, 1: 1, length: 2 }, [0, 1])).toBe(false);
  });

  test("Dates", () => {
    expect(
      DeepEqual(
        new Date("2015-05-01T22:16:18.234Z"),
        new Date("2015-05-01T22:16:18.234Z")
      )
    ).toBe(true);
    expect(
      DeepEqual(
        new Date("2015-05-01T22:16:18.234Z"),
        new Date("2017-01-01T00:00:00.000Z")
      )
    ).toBe(false);
    expect(
      DeepEqual(
        new Date("2015-05-01T22:16:18.234Z"),
        "2015-05-01T22:16:18.234Z"
      )
    ).toBe(false);
    expect(DeepEqual(new Date("2015-05-01T22:16:18.234Z"), 1430518578234)).toBe(
      false
    );
    expect(DeepEqual(new Date("2015-05-01T22:16:18.234Z"), {})).toBe(false);
  });

  test("RegExps", () => {
    expect(DeepEqual(/foo/, /foo/)).toBe(true);
    expect(DeepEqual(/foo/i, /foo/i)).toBe(true);
    expect(DeepEqual(/foo/, /bar/)).toBe(false);
    expect(DeepEqual(/foo/, /foo/i)).toBe(false);
    expect(DeepEqual(/foo/, "foo")).toBe(false);
    expect(DeepEqual(/foo/, {})).toBe(false);
  });

  test("Functions", () => {
    let foo = () => {};
    let bar = () => {};
    expect(DeepEqual(foo, foo)).toBe(true);
    expect(DeepEqual(foo, bar)).toBe(false);
    expect(DeepEqual(foo, () => {})).toBe(false);
  });

  test("class", () => {
    class Foobar {}
    expect(DeepEqual(new Foobar(), new Foobar())).toBe(true);
  });

  test("prototype", () => {
    function Test() {}
    Test.prototype.val = 42;
    expect(DeepEqual(new Test(), new Test())).toBe(true);
  });

  test("Sets flat", () => {
    const hello = new Set();
    const world = new Set();
    expect(DeepEqual(hello, world)).toBe(true);
    world.add("hello");
    expect(DeepEqual(hello, world)).toBe(false);
    hello.add("foo");
    expect(DeepEqual(hello, world)).toBe(false);
    world.add("foo");
    hello.add("hello");
    expect(DeepEqual(hello, world)).toBe(true);
  });

});
