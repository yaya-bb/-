:::tips
代码源码链接：[https://github.com/yaya-bb/web/tree/main/mustache-study](https://github.com/yaya-bb/web/tree/main/mustache-study)
:::
## 1.模版引擎的介绍
### 1.1What-模版引擎是什么？
模版引擎是将数据data变为视图view(html)的解决方案。<br />![未命名白板 (3).png](https://cdn.nlark.com/yuque/0/2022/png/25635885/1668062384720-8a7314be-450d-45ac-999d-cc0cdab5a261.png#averageHue=%23626560&clientId=u573740ce-ab77-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=1712&id=u9d72c9c6&margin=%5Bobject%20Object%5D&name=%E6%9C%AA%E5%91%BD%E5%90%8D%E7%99%BD%E6%9D%BF%20%283%29.png&originHeight=2140&originWidth=4892&originalType=binary&ratio=1&rotation=0&showTitle=false&size=2257483&status=done&style=none&taskId=u28bb1992-0fcf-4f4f-9f60-25d1afab98d&title=&width=3913.6)
### 1.2历史上将数据变为视图的方法

- 纯DOM法
- 数组join法:本质上是字符串的方法
- ES6的反引号法
- 模板引擎
## 2.mustache的基本使用
使用方法就是先定义数据，再定义模板。将数据放进一个模板李再赋值给一个变量，通过innHTML写进DOM中
#### mustache的模版语法
#arr表示开始循环arr数组，/arr表示arr数组循环结束
```javascript
<ul>
  {{#arr}}
	<li>
    <div class="hd">{{name}}的基本信息</div>
  	<div class="bd">
      <p>姓名:{{name}}</p>
    	<p>年龄:{{age}}</p>
  	</div>
  </li>
	{{/arr}}
</ul>
```
### 2.1最简单的情况——不循环对象数组
![60F45987DD658B5611B0A0C6918F6F35.png](https://cdn.nlark.com/yuque/0/2022/png/25635885/1668063143146-e27e8f5c-8f7a-4ccb-a728-b84f13a3246a.png#averageHue=%23d8d3c9&clientId=u573740ce-ab77-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=463&id=ufb415294&margin=%5Bobject%20Object%5D&name=60F45987DD658B5611B0A0C6918F6F35.png&originHeight=579&originWidth=1357&originalType=binary&ratio=1&rotation=0&showTitle=false&size=110847&status=done&style=none&taskId=uca1d9270-1e5f-4ed6-bb33-c8211020e9a&title=&width=1085.6)
```javascript
  <div id="container"></div>
  <script>
    // 模板字符串，循环本身{{.}}
    var templateStr = `
      <h1>我买了一个{{thing}}，好{{mood}}</h1>
    `;
    let data = {
      thing: "华为手机",
      mood: "开心"
    };
    // 模板字符串，数据
    let domStr = mustache.render(templateStr, data);
    let container = document.getElementById("container");
    container.innerHTML = domStr;
```
### 2.2循环最简单的数组
vue的模板语法中，可以使用v-for指令基于一个数组来渲染一个列表。在mustache中可用{{#arr}}{{/arr}}的形式来循环data中名为arr的数组<br />![7C02995DA75D9C2B67307DCCC56655C0.png](https://cdn.nlark.com/yuque/0/2022/png/25635885/1668063368526-ae2a1603-e448-4b7d-9cc0-a87705d676bc.png#averageHue=%23bbb7ab&clientId=u573740ce-ab77-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=464&id=u93ebfcfa&margin=%5Bobject%20Object%5D&name=7C02995DA75D9C2B67307DCCC56655C0.png&originHeight=580&originWidth=1223&originalType=binary&ratio=1&rotation=0&showTitle=false&size=104949&status=done&style=none&taskId=u1fd544f1-a858-4e2e-98a1-205336885eb&title=&width=978.4)
```javascript
  <div id="container"></div>
  <script>
    // 模板字符串，循环本身{{.}}
    var templateStr = `
      <ul>
        {{#arr}}
            <li>{{.}}</li>
        {{/arr}}
      </ul>
    `;
    let data = {
      arr: ['苹果', '鸭梨', '西瓜']
    };
    // 模板字符串，数据
    let domStr = mustache.render(templateStr, data);
    let container = document.getElementById("container");
    container.innerHTML = domStr;
```
### 2.3循环对象数组
![D79E02F3052274AACF1BB26E3BCC672B.png](https://cdn.nlark.com/yuque/0/2022/png/25635885/1668063544689-b78f57ba-bb5d-4bbb-8ccd-b7499254bb19.png#averageHue=%23777166&clientId=u573740ce-ab77-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=509&id=u5122bd15&margin=%5Bobject%20Object%5D&name=D79E02F3052274AACF1BB26E3BCC672B.png&originHeight=636&originWidth=1384&originalType=binary&ratio=1&rotation=0&showTitle=false&size=169678&status=done&style=none&taskId=u2fd6a00d-9f7a-451e-9c1b-b93ded4d7f5&title=&width=1107.2)
#### 补充：script模板写法
在script标签中写入模板，只要type的值不是text/javascript，都不会被当作js执行解析，这样可以在script标签中写入模板，可以高亮自动填充
```javascript
  // 不是text/javascript就不会被当作javascript被执行
  // 存储模板字符串
  <script type="text/template" id="mytemplate">
    <ul>
      {{#arr}}
        <li>
          <div class="hd">{{name}}的基本信息</div>
          <div class="bd">
            <p>姓名:{{name}}</p>
            <p>年龄:{{age}}</p>
          </div>
        </li>
      {{/arr}}
    </ul>
  </script>
  <script src="jslib/mustache.js"></script>
  <div id="container"></div>
  <script>
    // 模板字符串
    var templateStr = document.getElementById("mytemplate").innerHTML;
    let data = {
      arr: [
      { "name": "小明", "age": 12},
      { "name": "小红", "age": 14}
      ]
    };
    // 模板字符串，数据
    let domStr = mustache.render(templateStr, data);
    let container = document.getElementById("container");
    container.innerHTML = domStr;
```
### 2.4 循环嵌套【对象数组和简单数组】
![C11FC01E9C7D4DA237BF5597B856E541.png](https://cdn.nlark.com/yuque/0/2022/png/25635885/1668063953215-03bd6ba8-aecd-4502-8474-d2dfc19444ca.png#averageHue=%23bdb8ac&clientId=u573740ce-ab77-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=325&id=uce046733&margin=%5Bobject%20Object%5D&name=C11FC01E9C7D4DA237BF5597B856E541.png&originHeight=406&originWidth=778&originalType=binary&ratio=1&rotation=0&showTitle=false&size=81780&status=done&style=none&taskId=udc90c5d5-b20d-4c4e-a27e-422ee6dd7d5&title=&width=622.4)
```javascript
  <div id="container"></div>
  <script>
    // 模板字符串，循环数据项{{.}}
    var templateStr = `
      <ul>
        {{#arr}}
          <li>
            {{name}}的爱好是:
              <ol>
                {{#hobbies}}
                  <li>{{.}}</li>
                {{/hobbies}}
              </ol>
          </li>
        {{/arr}}
      </ul>
    `;
    let data = {
      arr: [
        {"name": "小明", "age": 12, "hobbies": ["游泳", "长跑"]},
      ] 
    };
    // 模板字符串，数据
    let domStr = mustache.render(templateStr, data);
    let container = document.getElementById("container");
    container.innerHTML = domStr;
```
### 2.5 布尔值【控制元素的显示与隐藏】
在mustache中，可以进行布尔值的操作，类似于Vue中的v-show指令，可以控制元素的显示与隐藏。<br />![8D7709B84D85C5A3295E004F9732161B.png](https://cdn.nlark.com/yuque/0/2022/png/25635885/1668064077031-e22a016c-2e08-4c1e-a42a-2121841fb628.png#averageHue=%23cbc6bc&clientId=u573740ce-ab77-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=306&id=u24edf9a3&margin=%5Bobject%20Object%5D&name=8D7709B84D85C5A3295E004F9732161B.png&originHeight=383&originWidth=739&originalType=binary&ratio=1&rotation=0&showTitle=false&size=50546&status=done&style=none&taskId=u13fd1e4b-0d8c-4c29-8275-ed7df972afb&title=&width=591.2)
```javascript
<div id="container"></div>
  <script>
    // 模板字符串，循环数据项{{.}}
    // {{}}中间不能写表达式
    var templateStr = `
      {{#m}}
        <h1>你好</h1>
      {{/m}}
    `;
    let data = {
      m: true 
    };
    // 模板字符串，数据
    let domStr = mustache.render(templateStr, data);
    let container = document.getElementById("container");
    container.innerHTML = domStr;
```
## 3.mustache的原理
### 3.1 实现最简单的模板数据填充
流程：通过正则表达式中的replace()方法来识别双大括号，捕获双大括号内的内容，然后将data对象中对应的数值进行替换。
#### replace()方法
这个方法接收两个参数，第一个参数可以是一个RegExp对象或一个字符串（这个字符串不会转换为正则表达式），第二个参数可以是一个字符串或一个函数。第二个参数可以是一个函数。在只有一个匹配项时，函数中的参数：第一个为匹配的部分；第二个捕获的内容,一般为$1表示第一个捕获到的元素；第三个为为匹配的东西的位置，第四个为原串
#### 正则表达式
/\{\{(\w+}\}\}/: 用于捕获{{}}双大括号

```javascript
var templateStr = '<h1>我{{thing}}是{{mood}}的</h1>';
    let data = {
      thing: "心情",
      mood: "happy"
    };
    // 写一个函数识别{{}},机理是replace方法-可以进行捕获功能:捕获里面的文字(\w+)
    // 单纯的replace只能替换第一个
    // 如果需要把所有的进行替换，则需要使用正则/g/:全局寻找 w字母
    // console.log(templateStr.replace(/\{\{(\w+)\}\}/g, function(findStr, $1) {
    //   // $1为变量，所以不能使用data.$1
    //   return data[$1];
    // }));
    // 封装成函数
    function render(templateStr, data) {
      return templateStr.replace(/\{\{(\w+)\}\}/g, function (findStr, $1) {
        return data[$1];
      });
    }
    var result = render(templateStr, data);
    console.log(result);
```
```
但正则表达式的方法难以去实现复杂的情况，比如数组嵌套遍历，所以不能通过正则表达式以及
replace()方法实现mustache。
```
### 3.2 mustache实现原理
![419A2AC95DF373FFF2E08354403AE506.png](https://cdn.nlark.com/yuque/0/2022/png/25635885/1668066801677-971759b3-79ae-4388-a03e-189ea26592f6.png#averageHue=%23c0aa61&clientId=u573740ce-ab77-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=370&id=u92836bd4&margin=%5Bobject%20Object%5D&name=419A2AC95DF373FFF2E08354403AE506.png&originHeight=463&originWidth=1125&originalType=binary&ratio=1&rotation=0&showTitle=false&size=38818&status=done&style=none&taskId=u347de72e-b24e-46ab-8f97-ca379bf85b3&title=&width=900)
:::info
将模板字符串先编译为tokens，tokens在解析的过程中与数据data结合生成dom字符串
:::
#### 3.2.1 什么是tokens？
tokens是js嵌套数组，就是模板字符串的js表示，它是抽象语法树、虚拟节点的开山鼻祖。<br />通过识别双大括号{{}}，将模板和数据分隔开；而在处理嵌套的情况下，会进行多重循环<br />![C51BB7EB46C0D8552E83AF9FAE5B42DD.png](https://cdn.nlark.com/yuque/0/2022/png/25635885/1668070949913-4be7943b-fe82-403f-98c9-73d97eb0e81f.png#averageHue=%237c7873&clientId=u573740ce-ab77-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=469&id=ue83eddeb&margin=%5Bobject%20Object%5D&name=C51BB7EB46C0D8552E83AF9FAE5B42DD.png&originHeight=586&originWidth=1262&originalType=binary&ratio=1&rotation=0&showTitle=false&size=159116&status=done&style=none&taskId=u4667d81b-2fed-4298-a80f-e2ac02186ed&title=&width=1009.6)
### 3.3实现mustache库的重点
:::tips

1. 将模板字符串编译为tokens形式
2. 将tokens结合数据data，解析为DOM字符串
:::
## 4.手写实现mustache库
:::tips
### 将模板字符串编译为tokens形式
:::
### 4.1实现Scanner扫描类

1. 首先将模板字符串转换为tokens，因此我们需要一个Scanner扫描类，通过指针识别模板字符串来获取我们需要的数据
2. scanUtil方法用于识别{{}}找除了【双括号(单纯为{{}}符号)】外的内容。指针进行扫描，直到遇见指定内容结束，并且能够返回结束之前路过的文字
3. scan方法用于当scanUtil到达指定的内容{{ 或  }},则将指针往后移动响应的长度
4. eos方法用于判断指针是否到头
```javascript
/* 扫描器类 */
export default class Scanner{
  constructor(templateStr) {
    // 将模版字符串写到实例身上,由于scanUtil需要使用
    this.templateStr = templateStr;
    // 指针
    this.pos = 0;
    // 尾巴,一开始就是模板字符串原文
    this.tail = this.templateStr;
  }
  // 功能弱，就是走过指定内容，没有返回值
  scan(tag) {
    if(this.tail.indexOf(tag) == 0) {
      // tag有多长，比如{{长度是2，就让指针后移多少位
      this.pos += tag.length;
      // 尾巴也要变
      this.tail = this.templateStr.substring(this.pos);

    }
  }
  // 让指针进行扫描，直到遇见指定内容结束，并且能够返回结束之前路过的文字
  scanUtil(stopTag) {
    // 记录一下执行本方法的时候pos的值
    const pos_backup = this.pos;
    // 当尾巴的开头不是stopTag的时候，就说明还没有扫描到stopTag
    // 不加且后面容易死循环，写&&很有必要，因为防止找不到，那么寻找到最后也要停止下来
     while(!this.eos() && this.tail.indexOf(stopTag) != 0) {
      this.pos++;
      // 尾巴包括找到stopTag后面的所有
      // 改变尾巴为从当前指针这个字符开始，到最后的全部字符
      this.tail = this.templateStr.substring(this.pos);
     }
     // 开始的位置到指针的位置不包括this.pos
     return this.templateStr.substring(pos_backup, this.pos);
  }
  // 指针是否已经到头，返回布尔值,end od string
  eos() {
    return this.pos >= this.templateStr.length;
  }
}
```
### 4.2实现parseTemplateToTokens函数
此函数的功能：将模板字符串变为tokens数组<br />此函数参数为模板字符串，

1. 先创建出扫描器，然后进行循环判断（结束条件为指针到头）
- 首先收集{{前的内容【words = scanner.scanUtil('{{');】，并将其存入tokens中【tokens.push(['text', _words]);】—扩展:在存入tokens之前，需要判断是否有空格(普通空格/标签内的空格)
- 由于{{占字符，指针需要进行移动【scanner.scan('{{');】
- 离开{{，则代表开始进行收集双括号内的内容，直到遇到}}才结束收集【words = scanner.scanUtil('}}');】；双括号中的内容代表的内容与数据data相关，因此判断上有所不同。需要根据截取文字中的首字符去判断推入到tokens的内容。一共分为三种情况：①当遇到‘#’，则代表数组循环的开始【tokens.push(['#', words.substring(1)]);】②当遇到‘/ ’，则代表数组循环的结束【tokens.push(['/', words.substring(1)]);】③除了遇到‘#’和‘/ ’的元素，则将其截取字符设置为name将其存入tokens中【tokens.push(['name', words]);】
- 由于}}占字符，指针需要进行移动【scanner.scan('}}');】
- 将最后获取的tokens放入折叠函数nestTokens,将嵌套的数组进行折叠
```javascript
import Scanner from './Scanner.js';
import nestTokens from './nestTokens.js';
// 向外默认暴露这个函数
// 将模板字符串变为tokens数组
export default function parseTemplateToTokens(templateStr) {
  var tokens = [];
  // 创建扫描器
  var scanner = new Scanner(templateStr);
  var words;
  // 让扫描器工作
  while (!scanner.eos()) {
    // 收集开始标记出现之前的文字
    words = scanner.scanUtil('{{');
    if(words != '') {
      // 尝试写一下去掉空格，智能判断是普通文字的空格，还是标签中的空格
      // 标签中的空格不能去掉，比如<div class="box">不能去掉class前面的空格
      // 是不是在尖角号里面，默认为不是
      let isJJH = false;
      let _words = '';
      for(let i = 0; i < words.length; i++) {
        // 判断是否在标签里
        if(words[i] == '<') {
          isJJH = true;
        } else if(words[i] == '>') {
          isJJH = false;
        }
        // 如果这项不是空格，拼接上
        if(!/\s/.test(words[i])) {
          _words += words[i];
        } else {
          // 如果这项是空格，只有当它在标签内的时候，才拼接上
          if(isJJH) {
            _words += ' ';
          }
          
      }
    }
    tokens.push(['text', _words]);
    // 过双大括号
    scanner.scan('{{');
    // 收集开始标记出现之前的文字
    words = scanner.scanUtil('}}');
    if(words != '') {
      // 这个words就是{{}}中间的东西，判断一下首字符
      if(words[0] == "#") {
        // 存起来，从下标为1的项开始存,因为下标为0的项是#
        tokens.push(['#', words.substring(1)]);
      }else if(words[0] == "/") {
        tokens.push(['/', words.substring(1)]);
      } else {
        tokens.push(['name', words]);
      }
    }
    scanner.scan('}}');
  }
  }
  // 返回折叠的tokens
  return nestTokens(tokens);
}
```
### 4.3实现nestTokens函数
此函数的功能：折叠tokens，将#和/之间的tokens能够整合起来，作为下标为3的项。在nestTokens()中使用了栈的思路来折叠tokens，还巧妙的运用了collector收集器，让collector数组在不同的时候指向不同的数组。

- 在开始前收集器collector指向结果数组nestTokens，当遇到’#‘的时候，将collector指向token[2]，让后面的数组直接push进token下标为2的数组中，用于实现嵌套；当遇到’/‘的时候，先弹出栈顶，根据selections的长度来判断，是改变收集器为栈顶那项的下标为2的数组【意味还有数组嵌套】还是直接返回结果数组
- 最后返回结果数组
```javascript
// 思路：栈
export default function nestTokens(tokens) {
  // 结果数组
  let nestTokens = [];
  // 栈结构，存放小tokens，栈顶（靠近端口的，最新进入的）的tokens数组中当前操作的这个tokens小数组
  let sections = [];
  // 收集器，天生指向nestedTokens结果数组，引用类型值，所以指向的是同一个数组
  // 收集器的指向会变化。当遇见#的时候，收集器会指向这个token的下标为2的新数组
  let collector = nestTokens;
  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];
    switch(token[0]) {
      case '#':
        // 收集器中放入这个token
        collector.push(token);
        // 入栈
        sections.push(token);
        // 收集器要换人,给token添加下标为2的项，并且将收集器指向它
        collector = token[2] = [];
        break;
      case '/':
        // 出栈，pop()会返回刚刚弹出的顶
        sections.pop();
        // 改变收集器为栈结构队尾(队尾是栈顶)那项的下标为2的数组
        // 如果collector没有值则指回结果
        collector = sections.length > 0 ? sections[sections.length - 1][2] : nestTokens;
        break;
      default:
        // 甭管当前的collector是谁，可能是结果nestedTokens，也可以能是token的下标为2的数组，甭管是谁，推入collector即可
        collector.push(token);
    }
  }
  return nestTokens;
}
```

:::tips
### 将tokens结合数据data，解析为DOM字符串
:::
### 4.4实现lookup函数
此函数的功能是用于获取有层叠的数据【可以在dataObj对象中，寻找用连续点符号的keyName属性】

- 首先判断keyName中是否有点符号并且不是单纯的点元素
- 如果属性中有点符号，则使用split进行拆分，通过循环找出需要data值
```javascript
/*
{
  a: {
    b: {
      c: 100
    }
  }
}
那么lookup(dataObj, 'a.b.c)结果就是100
*/
export default function lookup(dataObj, keyName) {
  // 看看keyName中有没有点符号，但不能是.本身，{{.}}单纯.也用于解析数据
  if(keyName.indexOf('.') != -1 && keyName != '.') {
    // 如果有点符号，那么拆开
    let keys = keyName.split('.');
    // 设置一个临时变量，这个临时变量用于周转，一层一层找下去
    let temp = dataObj;
    //  每找一层，就把他设置为新的临时变量
    for(let i = 0; i <keys.length; i++) {
      // 拆分属性来一层一层寻找需要的data
      temp = temp[keys[i]];
    }
    return temp;
  }
  // 如果这里面没有点符号
  return dataObj[keyName];
}
```
### 4.5实现parseArray函数
此函数的作用： 处理数组，结合renderTemplate实现递归。<br />此函数的使用还需要使用lookup【得到整体数据data中这个数组要使用的部分】、renderTemplate【有嵌套数据需要递归调用】
```javascript
import lookup from "./lookup";
import renderTemplate from "./renderTemplate";
/*
* 注意：这个函数的参数是token，而不是tokens
* token是什么，就是一个简单的['#', 'students',[]]
* 这个函数要递归调用renderTemplate函数，调用的次数由data决定
* {
    students: [
      {'name': '小明'},
      {'name': 'John'},
      {'name': 'Tom'}
    ]
  };
  那么parseArray()函数要递归调用renderTemplate函数3次，因为数组的长度为3
*/
export default function parseArray(token, data) {
  // console.log(token, data);
  // 得到整体数据data中这个数组要使用的部分
  let v = lookup(data, token[1]);
  // 结果字符串
  let resultStr = '';
  console.log(v);
  // 遍历v数组，v一定是数组
  // 下面这个循环可能是整个包中最难思考的一个循环
  // 它是遍历数据，而不是遍历tokens，数组中的数据有几条，就要遍历几条
  for (let i = 0; i < v.length; i++) {
    // 拼接返回，递归调用
    // 递归调用renderTemplate
    resultStr += renderTemplate(token[2], {
      // 现在这个数据小对象，是v[i]的展开，就是v[i]本身
      ...v[i],
    // 这里要补一个"."属性并且替代当前项
      '.': v[i]
    });
  }
  // 返回的结果会加到最后结果字符串中，由于最终测试的地方是数组
  // 因此思路要局限在数组的解析上
  return resultStr;
}
```
### 4.6实现renderTemplate函数
此函数的功能是让tokens数组变为dom字符串

- 循环遍历tokens，首先判断token的首项，根据首项不同去执行不同的流程。

此函数的使用还需要lookup【为了防止属性有层级】、parseArray【递归识别token】
```javascript
import lookup from './lookup.js';
import parseArray from './parseArray.js';
export default function renderTemplate(tokens, data) {
  let resultStr = '';
  // 结果字符串
  // 遍历tokens
  for(let i = 0; i < tokens.length; i++) {
    let token = tokens[i];
    // 看类型
    if(token[0] == 'text') {
      resultStr += token[1];
    } else if (token[0] == 'name') {
      // 如果是name类型，那么就直接使用它的值，当然要用lookup
      // 因为防止这里是"a.b.c"有点的形式
      resultStr += lookup(data, token[1]);
    } else if (token[0] == '#') {
      // 递归，解析下一层
      // 调用parseArray函数来辅助识别token[0]='#'的token
      resultStr += parseArray(token, data);
    }
  }
  return resultStr;
}
```
### 4.7实现mustache处理数据

- 通过parseTemplateToTokens实现将模板字符串变为tokens
- 通过renderTemplate实现将tokens变为dom
```javascript
import parseTemplateToTokens from './parseTemplateToTokens.js'; 
import renderTemplate from './renderTemplate.js';
// 全局提供templateEngine对象
window.templateEngine = {
  render(templateStr, data) {
    // 1.把模版字符串变成tokens，调用parseTemplateToTokens函数，让模版字符串能够变为tokens数组
    var tokens = parseTemplateToTokens(templateStr);
    // 2.把tokens变为dom，调用renderTemplate函数，让tokens数组变为dom字符串
    var domStr = renderTemplate(tokens, data);
    return domStr;
  }
}
```
> 来自尚硅谷Vue源码解析之mustache模板引擎的笔记


