 //声明全局变量
 let that;
class Tab{
    constructor(id){
        that = this;
        //获取元素
        //获取tab的id
        this.main = document.querySelector(id);
        //console.log(this.lis);
        this.add = this.main.querySelector('.tabadd');
       
       //li的父元素
       this.ul = this.main.querySelector('.firstnav ul:first-child');
       //ul的父元素
       this.fsection = this.main.querySelector('.tabscon');
        this.init();
        
    }
    //init初始化操作让相关的元素绑定事件
    init(){
        this.updateNode();
        this.add.onclick = this.addTab;
        //由于新加入的li无法被获取到，所有应当每次点击后重新获取所有的li
        for(let i = 0;i <this.lis.length; i++)
        {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;
            
        }
    }
    //获取所有的小li和section
    updateNode(){
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
    }
    // 1.切换tb
    toggleTab(){
        that.clearClass();
        //点击谁，就添加哪个类
        this.className = 'liactive';//这里的this指lis
        that.sections[this.index].className = 'conactive';//由于that存放的this是constructor的this
    }
    //清空原先的样式
    clearClass(){
        for(let i = 0; i<this.lis.length;i++)
        {
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    }
    //2.增加Tab
    addTab(){
        //创建前进行清除所有li和section的类
        that.clearClass();
        // 1.创建li元素和section元素
        let li = '<li class="liactive"><span>测试1</span><span class="close"><i>+</i></span></li>';
        let selection = '<section class="conactive">测试1</section>';
        //利用insertAdjacentHTML(position,text)可以直接把字符串格式元素添加到父元素中
        //[appendChild不支持追加字符串的子元素]
        // 2.把这两个元素追加到对应的父元素里面
        that.ul.insertAdjacentHTML('beforeend',li);//this指向的是add里面的按钮，但按钮里面没有ul因此需用到constructor里面的this，因此用that
        that.fsection.insertAdjacentHTML('beforeend',selection);
        that.init();//可以有效的获取到新添加的元素
    }
    //3.删除Tab
    moveTab(){

    }
    //4.修改Tab
    editorTab(){

    }
}
//第一个实例对象,传递参数，可传到constructor里面
new Tab('#tab');