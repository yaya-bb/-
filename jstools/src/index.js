export function test() {
  document.write('测试自定义包');
  console.log('test()');
}
// 引入其他文件，然后在暴露
// 1.目标文件中暴露数据export数据
// 2.导入
// import {chunk} from './array/chunk';
// // 3.暴露数据
// export {chunk};
export {chunk} from './array/chunk';
export {concat} from './array/concat';
export {drop} from './array/drop';
export {difference} from './array/difference';
export {dropRight} from './array/dropRight';
// 只导入部分