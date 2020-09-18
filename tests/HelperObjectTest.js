const assert = require('assert');
let HelperObjectExport = require('../src/HelperObject');
HelperObject = HelperObjectExport.HelperObject;

let objTest = {
    qwerty: {
        str: 5
    }
}

it('Check HelperObject::get', () => {
    assert.equal(HelperObject.get(objTest, 'qwerty.str', 6), 5, );
    assert.equal(HelperObject.get(objTest, 'qwerty.strs', 6), 6);
});

it('Check HelperObject::set', () => {
    HelperObject.set(objTest, 'qwerty.str', 8);
    assert.equal(HelperObject.get(objTest, 'qwerty.str', 4), 8);
});

it('Check HelperObject::each', () => {
    HelperObject.each({
        a: 4
    }, async () => {
        
    });

    assert.equal(HelperObject.get(objTest, 'qwerty.str', 4), 8);
});