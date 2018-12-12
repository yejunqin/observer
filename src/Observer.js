/* eslint-disable */
const objectType = '[object Object]';
const arrayType = '[object Array]';

// 判断数据类型
function compareType(value, type) {
  return Object.prototype.toString.call(value) === type;
}

// 需要重写的数组方法
const arrayMethods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];

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
    if (compareType(obj, arrayType)) {
      // 如果监测对象是数组，就改写该数组的原型
      this.overWriteArrayProto(obj);
    }
    Object.keys(obj).forEach((key) => { // 遍历对象属性
      let val = obj[key]; // 保存属性的值
      Object.defineProperty(obj, key, { // 定义get， set方法
        get: () => {
          return val;
        },
        set: newVal => {
          if (newVal !== val) {
            if (compareType(newVal, objectType) || compareType(newVal, arrayType)) { // 新值是对象的话，继续观察新值
              this.observe(newVal);
            }
            // 更新属性的值，调用回调函数
            this.$callback(newVal, val);
            val = newVal;
          }
        }
      });
      // 如果属性值为对象或数组，递归调用observe方法
      if (compareType(obj[key], objectType) || compareType(obj[key], arrayType)) {
        this.observe(obj[key]);
      }
    });
  }
  // 改写传入数组的原型
  overWriteArrayProto(arr) {
    // 保存原始的Array的原型
    const originArrayProto = Array.prototype;
    // 创建一个原型为Array.prototype的对象，作为传入数组的原型
    const overWriteProto = Object.create(originArrayProto);
    // 保存Observer类的引用
    const self = this;
    // 遍历需要重写的方法
    arrayMethods.forEach(method => {
      // 给overWriteProto定义重写的方法
      Object.defineProperty(overWriteProto, method, {
        value: function(...rest) { // 形参数组
          // 以对象属性被调用时，this指向该对象，即该数组
          // 保存数组旧值
          const oldArray = [...this];
          // result为调用原始Array原型方法的结果
          const result = originArrayProto[method].apply(this, rest);
          // 执行回调，传入数组的新值和旧值
          self.$callback(this, oldArray);
          // 返回结果
          return result;
        },
        writable: true,
        enumerable: false, // 属性名不能被遍历
        configurable: true
      })
    });
    // 最后把数组实例的原型指向新创建的overWriteProto
    arr.__proto__ = overWriteProto;
  }
}
