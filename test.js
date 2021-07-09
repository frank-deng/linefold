const Linefold=require('./linefold.test');
const assert = require('assert');

describe('Grouping test',function(){
    it('Grouping test 1',function(){
        assert.deepStrictEqual(Linefold.group('Mocha Test'),[
            'Mocha ',
            'Test'
        ]);
        assert.deepStrictEqual(Linefold.group('Mocha \tTest\t'),[
            'Mocha \t',
            'Test\t'
        ]);
    });
    it('Chinese test',function(){
        assert.deepStrictEqual(Linefold.group('HTML5的canvas元素使用JavaScript在网页上绘制图像，画布是一个矩形区域。'),[
            `HTML5`,
            `的`,
            `canvas`,
            `元`,`素`,`使`,`用`,`JavaScript`,`在`,`网`,`页`,`上`,
            `绘`,`制`,`图`,`像，`,`画`,`布`,`是`,`一`,`个`,`矩`,`形`,`区`,`域。`
        ]);
    });
});
describe('Overwidth test',function(){
    it('Split text',function(){
        assert.deepStrictEqual(Linefold.split('ABCDEFGH',8*4,(str)=>(str.length*8)),[
            'ABCD',
            'EFGH'
        ]);
        assert.deepStrictEqual(Linefold.split('ABCDEFGHI',8*4,(str)=>(str.length*8)),[
            'ABCD',
            'EFGH',
            'I'
        ]);
        assert.deepStrictEqual(Linefold.split('ABCDEFGHI',36,(str)=>(str.length*8)),[
            'ABCD',
            'EFGH',
            'I'
        ]);
        assert.deepStrictEqual(Linefold.split('ABCDEFGHIJ',36,(str)=>(str.length*8)),[
            'ABCD',
            'EFGH',
            'IJ'
        ]);
    });
    it('Split text with space narrower than one character',function(){
        assert.deepStrictEqual(Linefold.split('ABC',5,(str)=>(str.length*8)),[
            'A','B','C'
        ]);
        assert.deepStrictEqual(Linefold.split('ABCDEF',10,(str)=>{
            let len=0;
            for(let ch of str){
                if('B'==ch){
                    len+=12;
                }else{
                    len+=3;
                }
            }
            return len;
        }),[
            'A','B','CDE','F'
        ]);
    });
});