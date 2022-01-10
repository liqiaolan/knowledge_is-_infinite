/**
 * 轮询调用requestStatus接口，直到状态非checking，查询完成
 * 要求：轮询间隔为1s，5s没有结果抛出超时 timeout。
 */

const timeStart = Date.now();
const requestStatus = () => {
  return "completed" | "error" | "timeout";
};
const poll = async () => {
  const timeEnd = Date.now();
  if (timeEnd - timeStart >= 5000) {
    return "timeout";
  }
  const res = await requestStatu();
  if (res === "completed") {
    return res;
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(poll());
    }, 1000);
  });
};
