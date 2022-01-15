import { resolveModuleName } from "typescript";
import MyPromise from "./index";

describe("Realize MyPromise exactly", () => {
  test("normal", () => {
    new MyPromise((resolve, reject) => {
      resolve(1);
    }).then((value) => {
      expect(value).toBe(1);
    });
    
    new MyPromise((resolve, reject) => {
      reject(2);
    })
      .then((value) => {
        // console.log(value)
      })
      .catch((error) => {
        expect(error).toBe(2);
      });

    const promise1 = MyPromise.resolve(123);
    promise1.then((value) => {
      console.log(value);
      expect(value).toBe(123);
    });

    const promise2 = new MyPromise((resolve, reject) => {
      reject('error');
    });
    promise2.then((value,reject) => {
      console.log(value);
      console.log(reject);
      // expected output: "Success!"
    }).catch(error => {
      console.log(error,'errorerrorerrorerror')
      expect(error).toEqual('error');
    });
  });

  test("all", () => {
    const promise1 = MyPromise.resolve(3);
    const promise2 = 42;
    const promise3 = new MyPromise((resolve, reject) => {
      resolve("foo");
    });

    MyPromise.all([promise1, promise2, promise3]).then((values) => {
      expect(values).toEqual([3, 42, "foo"]);
    });
  });

  test("race", () => {
    const promise1 = new MyPromise((resolve, reject) => {
      resolve("hahaguo");
    });
    const promise2 = new MyPromise((resolve, reject) => {
      reject(1);
    });
    
    MyPromise.race([promise1, promise2]).then((value) => {
      expect(value).toBe("hahaguo");
    });
  });
});
