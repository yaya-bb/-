let Ha = "haha";
let h = 111;
// 函数的this与函数调用形式有关
// 以函数形式调用就是window，以方法形式调用就是调用方法对象
// 在严格模式下还有所不同
function fn() {
  // alert(this); //this不明确（由于调用方式不明确）
  // 开启检查：不允许不明确类型的this，会报错
}
let box = document.getElementById("box");
// box? 如果box有则执行
box?.addEventListener("click", function() {
  alert('hello');
});
