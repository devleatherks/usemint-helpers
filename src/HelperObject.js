"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelperObject = void 0;
const HelperVariables_1 = require("./HelperVariables");
/**
 * Usemint Helper Object
 *
 * @package Helper
 * @copyright Usemint 2020
 * @link usemint.com
 * @link usemint.com/dev/npm/usemint-helpers
 * @author leather_ks <s.kozhedub@usemint.com>
 */
class HelperObject {
    /**
     * Checks if the object key is valid
     *
     * @param {any} var
     */
    static isValidKey(key) {
        return key !== '__proto__' && key !== 'constructor' && key !== 'prototype';
    }
    /**
     * Is Plain Object
     *
     * @param {object} object
     */
    static isPlainObject(object) {
        if (HelperVariables_1.HelperVariables.isObject(object) === false) {
            return false;
        }
        let constructor = object.constructor;
        if (typeof constructor !== 'function') {
            return false;
        }
        let prototype = constructor.prototype;
        if (HelperVariables_1.HelperVariables.isObject(prototype) === false) {
            return false;
        }
        if (prototype.hasOwnProperty('isPrototypeOf') === false) {
            return false;
        }
        return true;
    }
    /**
     * Iterate over the object and call the passed callback function
     * To stop in the callback function, you need to return a false
     *
     * @param {any} object
     * @param {(element: any, key: string) => Promise<boolean | void>} callback
     * @param {boolean} numberIndex - Call the callback function only if the numeric index
     */
    static each(object, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                Object.keys(object).some((value, index, array) => __awaiter(this, void 0, void 0, function* () {
                    const result = yield callback(value, index, array);
                    if (!HelperVariables_1.HelperVariables.isUndefined(result)) {
                        return resolve(result);
                    }
                }));
            });
        });
    }
    /**
     * Get Name Class
     *
     * @param constructor
     */
    static getName(constructor) {
        const funcNameRegex = /function (.{1,})\(/;
        const results = (funcNameRegex).exec(constructor.toString());
        return (results && results.length > 1) ? results[1] : "";
    }
    /**
     * Get an item from an array using "dot" notation.
     *
     * @param {object}                   object
     * @param {string|Array<string>}    path
     * @param {V}                     def
     *
     * @return {V}
     */
    static get(object, path, def) {
        path = HelperVariables_1.HelperVariables.isArray(path) ? path : path.split('.');
        let result = path.reduce((previousValue, currentValue) => {
            return previousValue && previousValue[currentValue];
        }, object);
        if (HelperVariables_1.HelperVariables.isUndefined(result)) {
            return def;
        }
        return result;
    }
    /**
     * Set an array item to a given value using "dot" notation.
     *
     * If no key is given to the method, the entire array will be replaced.
     *
     * @param {any}                     object
     * @param {string|Array<string>}    path
     * @param {any}                     value
     *
     * @return array
     */
    static set(object, path, value) {
        if (!HelperVariables_1.HelperVariables.isObject(object)) {
            return false;
        }
        path = HelperVariables_1.HelperVariables.isArray(path) ? path : path.split('.');
        let keys = path.filter(HelperObject.isValidKey);
        let origin = object;
        if (keys.length === 1) {
            HelperObject.insert(object, keys[0], value);
            return object;
        }
        for (let i = 0; i < keys.length; i++) {
            let prop = keys[i];
            if (!HelperVariables_1.HelperVariables.isObject(object[prop])) {
                object[prop] = {};
            }
            if (i === keys.length - 1) {
                HelperObject.insert(object, prop, value);
                break;
            }
            object = object[prop];
        }
        return origin;
    }
    /**
     * Inserts a property into the passed object
     *
     * @param {T} object
     * @param {keyof T} key
     * @param value
     */
    static insert(object, key, value) {
        object[key] = value;
    }
    /**
     *
     * @param {T} object
     * @param {keyof T} key
     * @param value
     */
    static value(object, key, def) {
        if (!HelperVariables_1.HelperVariables.isObject(object)) {
            return false;
        }
        if (key in object) {
            return object[key];
        }
        return def;
    }
}
exports.HelperObject = HelperObject;
//# sourceMappingURL=HelperObject.js.map