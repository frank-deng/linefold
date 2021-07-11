<a name='english'></a>

linefold
========

[English](#english) | [中文](#chinese)

Convert given text into folded lines with maximum width and given font / given text length measuring function before rendering, so as to render paragraphs onto platforms without line-folding support, e.g. HTML5 Canvas.

This tool only supports languages like English, French, German, Russian, Chinese, Japanese, Korean, etc. Text with complex scripts (e.g. Arabic, Hebrew, Hindi, Thai) not supported.

[Click here to open demo page](https://frank-deng.github.io/linefold/)

Loading
-------

WebPack

	import Linefold from 'linefold';

Node.js

	const Linefold = require('linefold');

Script Tag

	<script type='text/javascript' src='path/to/linefold.js'></script>

Usage
-----

	linefold(text,max_length,font);
	linefold(text,max_length,(text)=>{
		//Your function for measuring text length
		return text.length;
	});

Example
-------

Default text length measuring function based on HTML Canvas, with text length in pixel:

	var text='Convert given text into folded lines with given font and maximum width before rendering, so as to render paragraphs onto platforms without line-folding support, e.g. HTML5 Canvas.';
	var lines=linefold(text,320,'16px Times New Roman');
	/*
	Folding result:
	[
		"Convert given text into folded lines with given",
		"font and maximum width before rendering, so as",
		"to render paragraphs onto platforms without line-",
		"folding support, e.g. HTML5 Canvas."
	]
	*/


<a name='chinese'></a>

linefold
========

[English](#english) | [中文](#chinese)

根据给定的文本、最大宽度、字体/文本长度测量函数，对一段文本进行换行操作。用于将文本渲染到一些不支持自动换行的环境上，比如HTML5 Canvas。

本工具仅支持英语、法语、德语、俄语、中日韩文字等文字。不支持含有复杂文字（如希伯来语、阿拉伯语、印地语、泰语）的文本。

[单击此处打开演示页面](https://frank-deng.github.io/linefold/)

引入
----

WebPack

	import linefold from 'linefold';

Node.js

	const linefold = require('linefold');

Script Tag

	<script type='text/javascript' src='path/to/linefold.js'></script>

使用方法
--------

	linefold(text,max_length,font);
	linefold(text,max_length,(text)=>{
		//自定义文本长度测量函数
		return text.length;
	});
	
范例
----

浏览器中使用默认的基于HTML Canvas的文本长度测量方式，单位为像素：

	var text='根据给定的文本、最大宽度、字体等条件，对一段文本进行换行操作。然后渲染到一些不支持自动换行的环境上，比如HTML5 Canvas。';
	var lines=linefold(text,320,'16px 宋体');
	/*
	换行结果：
	[
		"根据给定的文本、最大宽度、字体等条件，对",
		"一段文本进行换行操作。然后渲染到一些不支",
		"持自动换行的环境上，比如HTML5 Canvas。"
	]
	*/
