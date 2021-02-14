const assert = require('assert');
let HelperVariablesExport = require('../dist/HelperVariables');
HelperVariables = HelperVariablesExport.HelperVariables;

let allTypes = {
    boolean: [true, false],
    null: [null],
    undefined: [undefined],
    array: [
        [],
        [0],
        ['s']
    ],
    string: ['', '0', '1', 'wwws'],
    number: [0, 1, 5, 8.6],
    function: [() => {}],
    object: [{}, { 5: 6 }]
}

it('Сheck HelperVariables::empty', () => {
    assert.equal(HelperVariables.empty(null), true, 'empty[null]');
    assert.equal(HelperVariables.empty(undefined), true, 'empty[undefined]');

    // Bool
    assert.equal(HelperVariables.empty(true), false), 'empty[true]';
    assert.equal(HelperVariables.empty(false), true), 'empty[false]';

    // Array
    assert.equal(HelperVariables.empty([]), true, 'empty[array');
    assert.equal(HelperVariables.empty(['5']), false, 'empty[array["5"]]');

    // String
    assert.equal(HelperVariables.empty(''), true, 'empty[""]');
    assert.equal(HelperVariables.empty('0'), true, 'empty["0"]');
    assert.equal(HelperVariables.empty('1'), false, 'empty["1"]');
    assert.equal(HelperVariables.empty('asd1'), false, 'empty["asd1"]');

    // Number
    assert.equal(HelperVariables.empty(0), true, 'empty[0]');
    assert.equal(HelperVariables.empty(6), false, 'empty[6]');
    assert.equal(HelperVariables.empty(6.7), false, 'empty[6.7]');

    // Function
    assert.equal(HelperVariables.empty(() => {}), false, 'empty[() => {}]');

    // Object
    assert.equal(HelperVariables.empty({}), true, 'empty[{}]');
    assert.equal(HelperVariables.empty({ s: 5 }), false, 'empty[{s: 5}]');
});


it('Сheck HelperVariables::isFunction', () => {
    for (let key in allTypes) {
        allTypes[key].forEach((value) => {
            assert.equal(HelperVariables.isFunction(value), key === 'function', key + ' is not function error');
        });
    }
});

it('Сheck HelperVariables::isObject', () => {
    for (let key in allTypes) {
        allTypes[key].forEach((value) => {

            assert.equal(HelperVariables.isObject(value), key === 'object', key + ' is not object error');
        });
    }
});

it('Сheck HelperVariables::isString', () => {
    for (let key in allTypes) {
        allTypes[key].forEach((value) => {
            assert.equal(HelperVariables.isString(value), key === 'string', key + ' is not string error');
        });
    }
});

it('Сheck HelperVariables::isNumber', () => {
    for (let key in allTypes) {
        allTypes[key].forEach((value) => {
            assert.equal(HelperVariables.isNumber(value), key === 'number', key + ' is not number error');
        });
    }
});

it('Сheck HelperVariables::isBoolean', () => {
    for (let key in allTypes) {
        allTypes[key].forEach((value) => {
            assert.equal(HelperVariables.isBoolean(value), key === 'boolean', key + ' is not boolean error');
        });
    }
});

it('Сheck HelperVariables::isArray', () => {
    for (let key in allTypes) {
        allTypes[key].forEach((value) => {
            assert.equal(HelperVariables.isArray(value), key === 'array', key + ' is not array error');
        });
    }
});

it('Сheck HelperVariables::isNull', () => {
    for (let key in allTypes) {
        allTypes[key].forEach((value) => {
            assert.equal(HelperVariables.isNull(value), key === 'null', key + ' is not null error');
        });
    }
});

it('Сheck HelperVariables::isUndefined', () => {
    for (let key in allTypes) {
        allTypes[key].forEach((value) => {
            assert.equal(HelperVariables.isUndefined(value), key === 'undefined', key + ' is not undefined error');
        });
    }
});