const Linefold=require('./linefold.test');
const assert = require('assert');

describe('Grouping test',function(){
    it('Grouping test 1',function(){
        assert.deepStrictEqual(Linefold.splitStr('Mocha Test'),[
            'Mocha ',
            'Test'
        ]);
        assert.deepStrictEqual(Linefold.splitStr('Mocha \tTest\t'),[
            'Mocha \t',
            'Test\t'
        ]);
    });
    it('Chinese test',function(){
        assert.deepStrictEqual(Linefold.splitStr('HTML5的canvas元素使用JavaScript在网页上绘制图像，画布是一个矩形区域。'),[
            `HTML5`,
            `的`,
            `canvas`,
            `元`,`素`,`使`,`用`,`JavaScript`,`在`,`网`,`页`,`上`,
            `绘`,`制`,`图`,`像，`,`画`,`布`,`是`,`一`,`个`,`矩`,`形`,`区`,`域。`
        ]);
    });
});