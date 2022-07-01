it("节流Throttle", (done) => {
  const { throttle } = require("./防抖节流/index");
  console.log(throttle)
  // 定义一个Mock函数
  const mockFn = jest.fn();

  // 封装为节流方法
  const fn = throttle(mockFn, 10);

  // 同步调用两次
  fn(1);
  fn(2);

  setTimeout(() => {
    const calls = mockFn.mock.calls;

    // 断言 mock方法只调用一次
    expect(calls.length).toBe(1);
    // 根据参数判断以第一次调用为准
    expect(calls[0][0]).toBe(1);
    done();
  }, 50);
});
