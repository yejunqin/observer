/* eslint-disable */
import { Observer } from './Observer';

const callback = function(newVal, oldValue) {
  alert('newValue: ' + newVal + ' --- oldValue: ' + oldValue);
};

// 定义一个对象
const data = {
  a: 1,
  c: {
    d: 4
	},
	// b: [1, 2, 3]
};
// 实例化监测对象，在数据改变时会触发回调函数通知
const model = new Observer(data, callback);

model.$data.a = 333;
model.$data.a = 444;
model.$data.c.d = 555;
