const assert = require('assert');
let HelperArrayExport = require('../src/HelperArray');
HelperArray = HelperArrayExport.HelperArray;


it('Сheck HelperArray::find', () => {
    // Mode true
    assert.equal(HelperArray.find(['ss', 'ww'], 'ww', true), true, 'Mode true ww');
    assert.equal(HelperArray.find(['ss', 55], '55', true), false, 'Mode true 55');
    assert.equal(HelperArray.find(['ss', 'ww'], 'ww2',  true), false, 'Mode true ww2]');

    // Mode false
    assert.equal(HelperArray.find(['ss', 'ww'], 'ww'), true, 'Mode false ww');
    assert.equal(HelperArray.find(['ss', 55], '55'), true, 'Mode false 55');
    assert.equal(HelperArray.find(['ss', 'ww'], 'ww2'), false, 'Mode false ww2');
});

it('Сheck HelperArray::search', () => {
    let result = HelperArray.search([1, 2, 3, 4, 5], (value, index, array) => {
        return (value == 1 || value == 3 || value == 5);
    }).toString();

    assert.equal([1, 3, 5].toString(), result, 'Invalid return Array');
});

