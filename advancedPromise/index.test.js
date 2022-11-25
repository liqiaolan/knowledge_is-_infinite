import MyPromise from "./index";

describe("Realize MyPromise exactly", () => {
  test("normal", () => {
    new MyPromise((resolve, reject) => {
      resolve(1);
    }).then((value) => {
      expect(value).toBe(1);
    });
    new MyPromise((resolve, reject) => {
      resolve(2);
      resolve(3);
    }).then((value) => {
      expect(value).toBe(2);
    });
    new MyPromise((resolve, reject) => {
      reject("错误1");
    }).then(
      (value) => {
        console.log("不走这里");
      },
      (err) => {
        expect(err).toBe("错误1");
      }
    );

    new MyPromise((resolve, reject) => {
      reject("错误2");
      reject("错误3");
    }).then(
      (value) => {
        console.log("不走这里");
      },
      (err) => {
        expect(err).toBe("错误2");
      }
    );

    new MyPromise((resolve, reject) => {
      setTimeout(() => {
        resolve("异步执行1");
      }, 1000);
    })
      .then(
        (value) => {
          expect(value).toBe("异步执行1");
          return "异步执行2";
        },
        (err) => {
          console.log("不走这里");
        }
      )
      .then(
        (value) => {
          expect(value).toBe("异步执行2");
        },
        (err) => {
          console.log("不走这里");
        }
      );
    new MyPromise((resolve, reject) => {
      setTimeout(() => {
        reject("异步执行3");
      }, 1000);
    })
      .then(
        (value) => {
          console.log("不走这里");
        },
        (err) => {
          expect(err).toBe("异步执行3");
          return "异步执行4";
        }
      )
      .then(
        (value) => {
          console.log("不走这里");
        },
        (err) => {
          expect(err).toBe("异步执行4");
        }
      );

    new MyPromise((resolve, reject) => {
      reject("错误4");
    })
      .then()
      .catch((err) => {
        console.log(err, "错误222");
      });
  });
});
