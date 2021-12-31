/**
 * 写发布订阅的误区：
 * 第一次写我觉得发布订阅就是写一个redux，感觉写不来，但是经过查阅得出这是两个概念
 * 发布订阅是redux的第一步实现，redux还要侦测数据变更（使用Proxy），变更数据（创建store模式）
 * 完整的发布订阅要考虑到数据变更，所以redux是最后的结果
 * 发布订阅的核心原理：
 * 订阅就是将所有要执行的放在数组队列中【先进先出】，发布就是将队列中内容输出执行
 *
 * 问题引出需要解答
 * 基本类型存放于栈  引用类型的指针存放于堆 
 *   栈 堆 
 *   队列   
 */
class PubSub {
  constructor() {
    // 维护所有注册的回调函数
    this.listeners = [];
  }
  /**
   * 发布
   * @type {import('.'}.publish
   */
  publish(event, data) {
    const currentEventListeners = this.listeners[event];
    if (currentEventListeners) {
      currentEventListeners.forEach((listener) => {
        listener(data);
      });
    }
  }
  /**
   * 订阅
   * @type {import('.'}.subscribe
   */
  subscribe(event, callback) {
    if (typeof callback !== "function") {
      throw Error("callback is not a function!");
    }
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }
}

export default new PubSub();
