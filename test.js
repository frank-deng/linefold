const Linefold=require('./linefold.test');
const assert = require('assert');

describe('Grouping test',function(){
    it('Grouping test',function(){
        assert.deepStrictEqual(Linefold.group('Mocha Test'),[
            'Mocha ',
            'Test'
        ]);
        assert.deepStrictEqual(Linefold.group('Mocha \tTest\t'),[
            'Mocha \t',
            'Test\t'
        ]);
        assert.deepStrictEqual(Linefold.group('  Mocha \tTest\t'),[
            '  Mocha \t',
            'Test\t'
        ]);
        assert.deepStrictEqual(Linefold.group('  \tMocha \tTest\t'),[
            '  \tMocha \t',
            'Test\t'
        ]);
        assert.deepStrictEqual(Linefold.group('The quick brown fox jumps over a lazy dog'),[
            'The ','quick ','brown ','fox ','jumps ','over ','a ','lazy ','dog'
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
        assert.deepStrictEqual(Linefold.split('HTML5的canvas元素',16,(str)=>{
            let len=0;
            for(let ch of str){
                len+=(/[\u4E00-\u9FFF]/.test(ch) ? 16 : 8);
            }
            return len;
        }),['HT','ML','5','的','ca','nv','as','元','素']);
    });
});
describe('Line folding integration test',function(){
    it('One-line text',function(){
        let text='The quick brown fox jumps over a lazy dog';
        assert.deepStrictEqual(Linefold.default(text,8*16,(str)=>(str.length*8)),[
            "The quick brown",
            "fox jumps over a",
            "lazy dog"
        ]);
        assert.deepStrictEqual(Linefold.default(text,8*15-4,(str)=>(str.length*8)),[
            "The quick",
            "brown fox",
            "jumps over a",
            "lazy dog"
        ]);
    });
    it('One-line text',function(){
        let text='The quick brown fox\njumps over a lazy dog';
        assert.deepStrictEqual(Linefold.default(text,8*16,(str)=>(str.length*8)),[
            "The quick brown",
            "fox",
            "jumps over a",
            "lazy dog"
        ]);
    });
});