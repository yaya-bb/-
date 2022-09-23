// 利用from+Set 或 ... + Set
function unique3(arr) {
  // 方法一
  // 将数组转化为集合Set
  //  let set = new Set(arr);
  //  console.log(set);
  // // 将set展开创建一个数组
  // let array = [...set];
  // console.log(array);
  // 方法二
  return [...new Set(arr)];
}