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
});