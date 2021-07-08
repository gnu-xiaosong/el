"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 *描述: 这是主程序入口文件
 */

// // 导入字符串解析模块
// const parse = require("./parse/parse_string.js");
// //导入语法模块
var parse_output_html = require("./gramme_unit/index.js");
// // //导入语法解析错误模块

//导入生命周期模块


var El = function () {
    function El(el) {
        _classCallCheck(this, El);

        /** El生命周期原理
        * el是对象类型
        * parameter:
             { 
                 el："id",       //绑定dom元素id上  仅仅在mode设置为mount模式可用
                 data:String,      //被解析的轻语言字符流 【必传】
                 ...生命周期函数...   //生命周期函数 占位
                 ...........       //欢迎拓展功能函数    
             }
        * 
        * */

        if (typeof el != "undefined") {
            // 响应式文本解析----挂载模式-----输入的语法同el()函数一样
            var data_generate_html = this.el(el);

            //  挂载模式------挂载到DOM的id值元素上
            document.getElementById(el.el).innerHTML = data_generate_html;
        }
    }

    //data 阶段函数


    _createClass(El, [{
        key: "data_dispose",
        value: function data_dispose(data) {
            // delete string 两端的空白符 
            data = data.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
            // console.log("删掉两端空格后：" + data);
            return data;
        }

        // created 阶段函数

    }, {
        key: "created",
        value: function created(data) {
            return data;
        }

        // parse 阶段 函数

    }, {
        key: "parse",
        value: function parse(data) {
            //  利用空格分隔 截取第一个字符作为标识符
            var pre_label = data.split(' ')[0];
            return { data: data, pre_label: pre_label };
        }
        // generate 阶段函数 

    }, {
        key: "generate",
        value: function generate(data) {
            // 调用模块方法
            var data_html = parse_output_html(data);
            return data_html;
        }

        // 生命周期过程函数

    }, {
        key: "life_cycle",
        value: function life_cycle(data) {
            /***********************************El生命周期********************************* */
            /*  
             *参数： data  单元语法el代码  非文本型
             */

            // data 处理
            // console.log("原数据：" + data)
            var data = this.data_dispose(data);

            // console.log(`处理后的数据：${data}`);
            // created 阶段
            var data_created = this.created(data);

            // console.log(`created数据：${data_created}`);
            // parse 阶段  
            var data_parse = this.parse(data_created);

            // console.log(`parse数据：${data_parse}`);
            // generate 阶段
            var data_generate_html = this.generate(data_parse);

            // console.log(`generate数据：${data_generate_html}`);


            // 返回解析的后的html单元语法
            return data_generate_html;
        }

        //原型函数式

    }, {
        key: "el",
        value: function el(data) {
            /** 
             * 参数：data  el语法  支持单元语法输入和文本语法输入，但文本语法输入每个单元语法模块之间用||||||以上分隔
             **/

            // html代码载体
            var text_html = "";
            // 判断文本输入还是单元语法----标识符为||||||以上
            var pattern = /\|\|\|\|\|\|/;
            if (pattern.test(data)) {
                //   文本输入模式

                // 分隔文本语法为单元语法模块
                var data_unit_array = data.split("||||||");
                //遍历数组单元语法
                for (var index in data_unit_array) {

                    // console.log("unit:" + data_unit_array[index]);
                    // 生命周期函数解析生成html代码
                    text_html = text_html + this.life_cycle(data_unit_array[index]) + "<br>";
                    // console.log(this.life_cycle(data_unit_array[index]))
                }
            } else {
                //   单元语法型
                text_html = this.life_cycle(data);
            }

            //输出html
            return text_html;
        }
    }]);

    return El;
}();

module.exports = El;