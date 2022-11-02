import Compile from "./Compile";
import observe from "./observe";
import Watcher from "./Watcher";

export default class Vue {
  constructor(options) {
    // 把参数options对象存为$options
    this.$options = options || {};
    // 数据
    this._data = options.data || undefined;
    // 将数据变为响应式，监测data
    observe(this._data);
    // 调用初始化data
    this._initData();
    // this._initComputed();
    // 数据变为响应式
    // 解析模板编译
    new Compile(options.el, this);
    // 底层代码主动调用
    // options.created();
    //  调用默认的watch
    this._initWatch();
  }
  _initData() {
    // 备份
    var self = this;
    // 遍历自己身上所有的data
    Object.keys(this._data).forEach(key => {
      // 自己身上绑定key
    // Object.defineProperty方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。
      Object.defineProperty(self, key, {
        get() {
          return self._data[key];
        },
        set(newValue) {
          // 
          self._data[key] = newValue;
        }
      });
    });
  }
  _initWatch() {
    var self = this;
    var watch = this.$options.watch;
    Object.keys(watch).forEach(key =>{
      new Watcher(self, key, watch[key])
    })
  }
}