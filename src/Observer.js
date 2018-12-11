/* eslint-disable */
const objectType = '[object Object]';
const arrayType = '[object Array]';

// 判断数据类型
function compareType(value, type) {
  return Object.prototype.toString.call(value) === type;
}

// 定义实现监测对象的类
export class Observer {
  constructor(obj, callback) { // 接受的参数为要监测的对象，回调方法
    // 校验传入的参数类型为对象
    if (!compareType(obj, objectType)) {
      throw new Error('This parameter must be an object：' + obj);
    }
    this.$data = obj;
    // 记录回调函数
    this.$callback = callback;
    this.observe(obj);
  }
  // 实现监测属性的方法
  observe(obj) {
    Object.keys(obj).forEach((key) => { // 遍历对象属性
      let val = obj[key]; // 保存属性的值
      Object.defineProperty(obj, key, { // 定义get， set方法
        get: () => {
          return val;
        },
        set: newVal => {
          if (newVal !== val) {
            if (compareType(newVal, objectType)) { // 新值是对象的话，继续观察新值
              this.observe(newVal);
            }
            // 更新属性的值，调用回调函数
            this.$callback(newVal, val);
            val = newVal;
          }
        }
      });
      // 如果属性值为对象，递归调用observe方法
      if (compareType(obj[key], objectType)) {
        this.observe(obj[key]);
      }
    });
  }
}
