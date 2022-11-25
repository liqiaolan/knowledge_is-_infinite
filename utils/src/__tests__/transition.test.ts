import { toCDB } from "../transition";

// 全角转半角验证  ，为全角 ,为半角
test("test toCDB", () => {
  expect(toCDB("")).toBe("");
  expect(toCDB(",,,")).not.toBe("，，，");
  expect(toCDB("，，，")).not.toBe("，，，");
  expect(toCDB(",,,")).toBe(",,,");
  expect(toCDB("，，，")).toBe(",,,");
});
