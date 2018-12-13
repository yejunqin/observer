/* eslint-disable */
import { Observer } from './Observer';

const callback = function(newVal, oldValue, path) {
  alert('newValue: ' + newVal + ' --- oldValue: ' + oldValue + '--- path: ' + path);
};

// 定义一个对象
const data = {
  a: 1,
  c: {
    d: {
      f: 1
    }
  },
  b: [1, 2, 3]
};
// 实例化监测对象，在数据改变时会触发回调函数通知
const model = new Observer(data, callback);

model.$data.a = 333;
model.$data.a = 444;
model.$data.c.d.f = 555;
model.$data.b = [4, 5, 6];
model.$data.b.push(7);
model.$data.b.pop();
model.$data.b[0] = 9;
model.$data.b.push(10);
