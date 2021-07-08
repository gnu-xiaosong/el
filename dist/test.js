"use strict";

var El = require("./main.js");
var readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

var input;
readline.question("\u8BF7\u8F93\u5165el\u8BED\u8A00\u4EE3\u7801\uFF1A", function (command) {
    input = command;
    // console.log(input);

    // 返回object对象
    var app1 = new El();

    var data = app1.el(input);
    console.log("解析结果:      " + data);
    readline.close();
});