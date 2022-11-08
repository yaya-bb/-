export default function(sel, data, children, text, elm) {
  const key = data.key;
  // 将这五个参数拼成一个对象返回
  return {
    sel,
    data,
    children,
    text,
    elm,
    key
  }
}
