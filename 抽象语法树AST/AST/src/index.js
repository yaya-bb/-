import parse from "./parse";
// 模板字符串
let templateStr = `
  <div class="box">
    <h3 class="title"></h3>
    <ul>
      <li id="label">A</li>
      <li>B</li>
      <li>C</li>
    </ul>
  </div>
`;
const ast = parse(templateStr);
console.log(ast);