var El = require("./main.js");
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

var input;
readline.question(`请输入el语言代码：`, command => {
    input = command;
    // console.log(input);

    // 返回object对象
    var app1 = new El();


    var data = app1.el(input);
    console.log("解析结果:      " + data);
    readline.close()
})