/*
介绍:这是公共语法模块(函数)

为了便于后期维护，请严格按下面格式进行代码   提交:

格式:
author:  xxxxx         (作者)
description: xxxx       (描述)
github:  xxxxxx        (可选)
rule:  xxxxx           (标记符)
example: xxxxxxx      (实例)
*/



// 全局变量-----标识符后面的文本内容
var text_later;



// 文本处理函数

function text_deal(data) {
    var data_html;
    for (let item of text) {
        // 遍历文本解析处理
        for (let i of item.reg_array) {
            // 匹配规则

            var re = new RegExp(i);
            // console.log("re:" + re);
            // console.log(re.test(data));
            // 判断是否匹配存在
            if (re.test(data)) {
                //  匹配成功
                data = item.parse_generate(data, i);
                // console.log("data.data:" + data);
                data_html = data;
            } else {
                //  未匹配成功
                data_html = data;
            }
        }
    }

    return data_html;
}






//解析生成html代码
function parse_output_html(data) {

    /*
     *参数说明:
     *aparm: data ={
         data: string    el语法文本  eg：# This is first title
         pre_label:string   el语法前缀 eg: #
     }
     */
    // 调用unit模块遍历匹配输出
    for (let item of unit) {
        //  采用正则进行匹配
        var pattern = new RegExp(item.pre_label);
        // console.log(pattern);
        // console.log("Th：" + data.data);
        // console.log(pattern.test(data.data))
        if (pattern.test(data.data)) {
            // console.log(data)
            var data_html = item.parse_generate(data);
            // console.log("处理文本：" + text_later)
            // 对标识符后的文本进行处理采用替换的方法
            var data_change = text_deal(text_later);
            data_html = data_html.replace(text_later, data_change);
            break;
        }
    }


    // 未能匹配----默认原样返回(文本格式化处理)
    if (typeof data_html == "undefined") {
        // 文本处理----默认主持内嵌html代码
        var data_html = text_deal(data.data);
    }

    return data_html;
}




//***********↓↓↓↓↓以下是单元语法，用于上面的解析函数调用↓↓↓↓↓↓↓↓↓↓


// 带有前缀标识符的匹配
var unit = [

    // 标题
    {
        //  利用正则进行匹配
        pre_label: "^#{1,6}\\s+",
        description: "",
        example: "# 这是一个级标题",
        parse: function(data) {
            //解析
            var length = data.pre_label.length;

            // console.log(length)
            // 赋值给全局变量txet_later
            text_later = data.data.replace(/#+\s+/, "");

            var gramme_obj = {
                pre_label: data.pre_label,
                length: length,
                data: text_later
            }
            return gramme_obj;
        },
        generate: function(data) {
            // 解析对象语法树生成目标代码(默认为Html)
            var data_html = `<h${data.length}>${data.data}</h${data.length}>`;
            this.example = `# 这是${data.length}级标题`;
            return data_html;
        },
        parse_generate: function(data) {
            // 一次解析并生成目标代码

            //解析生成对象语法树
            var parse = this.parse(data);
            // 解析语法对象树生成目标代码
            var data_html = this.generate(parse);

            return data_html;

        }
    },
    // 段落
    {
        //  利用正则进行匹配
        pre_label: "^p{1,6}\\s+",
        description: "",
        example: "# 这是一个段落",
        parse: function(data) {
            //解析
            var length = data.pre_label.length;

            // console.log(length)
            // 赋值给全局变量txet_later
            text_later = data.data.replace(/p+\s+/, "");

            var gramme_obj = {
                pre_label: data.pre_label,
                data: text_later
            }
            return gramme_obj;
        },
        generate: function(data) {
            // 解析对象语法树生成目标代码(默认为Html)
            var data_html = `<p>${data.data}</p>`;
            return data_html;
        },
        parse_generate: function(data) {
            // 一次解析并生成目标代码

            //解析生成对象语法树
            var parse = this.parse(data);
            // 解析语法对象树生成目标代码
            var data_html = this.generate(parse);

            return data_html;

        }
    },
    // 列表
    {
        //  利用正则进行匹配
        pre_label: "^\\*\\s+.*",
        description: "",
        example: "* 这是一个列表",
        parse: function(data) {
            //解析
            // 赋值给全局变量txet_later
            text_later = data.data.replace(/\*\s+/, "");
            // console.log("列表：" + text_later);
            var gramme_obj = {
                pre_label: data.pre_label,
                data: text_later
            }
            return gramme_obj;
        },
        generate: function(data) {
            // 解析对象语法树生成目标代码(默认为Html)
            var data_html = `<li style="margin-left:42px">${data.data}</li>`;
            this.example = `* 这是列表`;
            return data_html;
        },
        parse_generate: function(data) {
            // 一次解析并生成目标代码

            //解析生成对象语法树
            var parse = this.parse(data);
            // 解析语法对象树生成目标代码
            var data_html = this.generate(parse);

            return data_html;

        }
    },
    // 表格
    {
        //  利用正则进行匹配
        pre_label: "^t:\\s*",
        description: "表格",
        example: `
        table:
            -1  2  4  5  6
            -3  3  3  4  4
            -1  4  4  5  7
        `,
        parse: function(data) {
            //解析
            // 赋值给全局变量txet_later
            text_later = data.data.replace(/^t:\s*/, "");
            // console.log("table：" + text_later);
            var gramme_obj = {
                pre_label: data.pre_label,
                data: text_later
            }
            return gramme_obj;
        },
        generate: function(data) {

            var data_html_table = "";
            var data_html;
            // 拆分
            var item_array = data.data.split("-");
            var t = 0;
            // console.log(item_array);
            // // 解析对象语法树生成目标代码(默认为Html) 行
            for (var i = 0; i < item_array.length; i++) {
                if (item_array[i].length == 0) {
                    t = 1;
                    // 跳过该行
                    continue;
                }
                data_html = "";
                // console.log(i);
                // 列
                var i_array = item_array[i].replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '').split(" ");
                // console.log(i_array)
                for (var j = 0; j < i_array.length; j++) {
                    // console.log(j)
                    if (t == 1 || t == 0) {
                        // 默认第一行为加粗
                        data_html += `<th>${i_array[j]}</th>`;
                    } else {
                        data_html += `<td>${i_array[j]}</td>`;
                    }

                    t = 2;
                }
                data_html_table += `<tr>${data_html}</tr>`;
                // console.log(data_html_table)
            }
            // 拼接table表
            data = `<table align="center" cellpadding="20" cellspacing="0" width="500" border="1">${data_html_table}</table>`

            return data;
        },
        parse_generate: function(data) {
            // 一次解析并生成目标代码

            //解析生成对象语法树
            var parse = this.parse(data);
            // 解析语法对象树生成目标代码
            var data_html = this.generate(parse);

            return data_html;

        }
    },
    // 引用
    {
        //  利用正则进行匹配
        pre_label: "^>\\s+(.*)",
        description: "引用语法",
        example: "> 引用",
        parse: function(data) {
            //解析
            text_later = data.data.replace(/^>\s+/, "");
            var gramme_obj = {
                pre_label: data.pre_label,
                data: text_later
            }
            return gramme_obj;
        },
        generate: function(data) {
            // 解析对象语法树生成目标代码(默认为Html)
            var data_html = `<blockquote>
                              <div style="display: inline-block;background-color:#DFE2E5;width: 5px;text-indent: 2em;">
                                        <div style="padding: 6px;color: #999;font-size: 1rem;">
                                         ${data.data}
                                        </div>
                                   </div>
                            </blockquote>`;
            return data_html;
        },
        parse_generate: function(data) {
            // 一次解析并生成目标代码

            //解析生成对象语法树
            var parse = this.parse(data);
            // 解析语法对象树生成目标代码
            var data_html = this.generate(parse);

            return data_html;

        }
    },
]



// 对文本处理的匹配处理(一般在前缀解析处理后再进行处理)
var text = [

    // 分割线
    {
        //  利用正则进行匹配
        reg_array: ["^[-*]{3,}$|^分割线$"],
        description: "三个及其以上的连续-或*或中文 分割线   后面不能有空格",
        example: "-------- 或 *********  或 分割线",
        parse_generate: function(data, reg) {

            var data_html = '<hr style="margin:19px"> ';
            // console.log("分割线" + data_html)
            return data_html;

        }
    },
    // 两边夹字体匹配
    {
        // 匹配 数组
        reg_array: ["\\/(.+)\\/", "\\*\\*(.+)\\*\\*", "~~(.+)~~", "__(.+)__", "\\^(.+)", "(.+)\\^"],
        html_generate_array: ["<i>text</i>", "<strong>text</strong>", "<del>text</del>", "<ins>text</ins>", "<sup>text</sup>", " <sub>text</sub>"],
        description: "[斜体，加粗，删除线, 下划线,上标，下标]",
        example: "/斜体/",
        parse_generate: function(data, reg) {
            //文本解析替换
            var rg = new RegExp(reg); //注意对字符串进行双重转义
            var text = data.match(rg);

            console.log(text);
            // html代码替换
            var dataed = this.html_generate_array[this.reg_array.indexOf(reg)].replace("text", text[1]);

            // console.log("html:" + dataed);
            // 嵌入到原data中
            var data_html = data.replace(text[0], dataed);


            // console.log(data_html);
            return data_html;

        }
    },
    //  字体匹配
    {
        // 匹配 数组
        reg_array: ["<%(.*)>(.+)<(.*)%>", ],
        html_generate_array: ['<font color="#" size="&">text</font>'],
        description: "[字体颜色和大小，]",
        example: "",
        parse_generate: function(data, reg) {
            //文本解析替换
            var rg = new RegExp(reg); //注意对字符串进行双重转义
            var text = data.match(rg);

            // console.log(text);
            // html代码替换
            var dataed = this.html_generate_array[this.reg_array.indexOf(reg)].replace("text", text[2]).replace("#", text[1]).replace("&", text[3]);

            // console.log("html:" + dataed);
            // 嵌入到原data中
            var data_html = data.replace(text[0], dataed);

            // console.log(data_html);
            return data_html;

        }
    },
    //    代码片段
    {
        // 匹配 数组
        reg_array: ["```([\\s\\S]*)```", ],
        html_generate_array: ['<pre style="background-color: rgb(252, 252, 252); border: 1px solid rgb(225, 225, 232);"><code>text</code></pre >'],
        description: "[代码片段]",
        example: "",
        parse_generate: function(data, reg) {
            //文本解析替换
            var rg = new RegExp(reg); //注意对字符串进行双重转义
            var text = data.match(rg);

            // console.log(text);
            // html代码替换第一个---颜色
            var dataed = this.html_generate_array[this.reg_array.indexOf(reg)].replace("text", text[1]);
            // console.log("html:" + dataed);
            // 嵌入到原data中
            var data_html = data.replace(text[0], dataed);

            // console.log(data_html);
            return data_html;

        }
    },
    //  标签id位置注入
    {
        // 匹配 数组
        reg_array: ["\\(#(.+)\\)"],
        html_generate_array: ['<div id="#id#"></div>'],
        description: "[代码片段]",
        example: "",
        parse_generate: function(data, reg) {
            //文本解析替换
            var rg = new RegExp(reg); //注意对字符串进行双重转义
            var text = data.match(rg);

            // console.log(text);
            // html代码替换第一个---颜色
            var dataed = this.html_generate_array[this.reg_array.indexOf(reg)].replace("#id#", text[1]);
            // console.log("html:" + dataed);
            // 嵌入到原data中
            var data_html = data.replace(text[0], dataed);

            // console.log(data_html);
            return data_html;

        }
    },
    // 锚点链接
    {
        // 匹配 数组
        reg_array: ["<#(.*)-(.+)"],
        html_generate_array: ['<a href="#id" style=" text-decoration: none;">{text}</a>'],
        description: "[锚点链接, 锚点注入点id默认div包裹]",
        example: "<#id-链接>",
        parse_generate: function(data, reg) {
            //文本解析替换
            var rg = new RegExp(reg); //注意对字符串进行双重转义
            var text = data.match(rg);

            // console.log(text);
            // html代码替换
            var dataed = this.html_generate_array[this.reg_array.indexOf(reg)].replace("{text}", text[2]).replace("id", text[1]);

            // console.log("html:" + dataed);
            // 嵌入到原data中
            var data_html = data.replace(text[0], dataed);
            // console.log(data_html);
            return data_html;

        }
    },
    // 图片
    {
        // 匹配 数组
        reg_array: ['!\\[(.+)\\]\\((.+)\\s+(.+)\\)', '!\\[(.+)\\]\\((.+)\\)'],
        html_generate_array: ['<img src="#url" alt="#alt" title="#title">', '<img src="#url" alt="#alt">'],
        description: "",
        example: "<#id-链接>",
        parse_generate: function(data, reg) {
            //文本解析替换
            var rg = new RegExp(reg); //注意对字符串进行双重转义
            var text = data.match(rg);


            console.log(text)
                // console.log(text);
                // html代码替换
            var dataed = this.html_generate_array[this.reg_array.indexOf(reg)].replace("#url", text[2]).replace("#alt", text[1]).replace("#title", text[3]);

            // console.log("html:" + dataed);
            // 嵌入到原data中
            var data_html = data.replace(text[0], dataed);
            // console.log(data_html);
            return data_html;

        }
    },
    // 普通链接
    {
        // 匹配 数组
        reg_array: ["<url=(.*)-(.+)"],
        html_generate_array: ['<a href="id" style=" text-decoration: none;">{text}</a>'],
        description: "[锚点链接, 锚点注入点id默认div包裹]",
        example: "<#id-链接>",
        parse_generate: function(data, reg) {
            //文本解析替换
            var rg = new RegExp(reg); //注意对字符串进行双重转义
            var text = data.match(rg);

            // console.log(text);
            // html代码替换
            var dataed = this.html_generate_array[this.reg_array.indexOf(reg)].replace("{text}", text[2]).replace("id", text[1]);

            // console.log("html:" + dataed);
            // 嵌入到原data中
            var data_html = data.replace(text[0], dataed);
            // console.log(data_html);
            return data_html;

        }
    }
]

module.exports = parse_output_html;