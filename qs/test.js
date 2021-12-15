const queryStringTest = require("./index");

describe("Realize queryStringTest exactly", () => {
  test("Realize", () => {
    expect(queryStringTest.parse("?foo=bar")).toEqual({ foo: "bar" });
    expect(queryStringTest.parse("#foo=bar")).toEqual({ foo: "bar" });
    expect(queryStringTest.parse("&foo=bar&foo=baz")).toEqual({
      foo: ["bar", "baz"],
    });
    expect(queryStringTest.parse("&foo=bar&foo=baz&foo=bas")).toEqual({
      foo: ["bar", "baz", "bas"],
    });
    expect(queryStringTest.parse("foo=bar&")).toEqual({ foo: "bar" });
  });
});
