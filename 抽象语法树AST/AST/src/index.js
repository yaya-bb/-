import parse from "./parse";
// 模板字符串
let templateStr = `
  <div>
    <h3></h3>
    <ul>
      <li>A</li>
      <li>B</li>
      <li>C</li>
    </ul>
  </div>
`;
const ast = parse(templateStr);
console.log(ast);