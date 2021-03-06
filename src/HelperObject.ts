import { HelperVariables } from './HelperVariables';

interface ObjectArr<T> {
    readonly length?: number;
    [index: number]: T;
}

/**
 * Usemint Helper Object
 * 
 * @package Helper
 * @copyright Usemint 2020
 * @link usemint.com
 * @link usemint.com/dev/npm/usemint-helpers
 * @author leather_ks <s.kozhedub@usemint.com>
 */
export class HelperObject {

    /**
     * Checks if the object key is valid
     * 
     * @param {any} var 
     */
    public static isValidKey(key: any): boolean {
        return key !== '__proto__' && key !== 'constructor' && key !== 'prototype';
    }

    /**
     * Is Plain Object
     * 
     * @param {object} object 
     */
    public static isPlainObject(object: object): boolean {

        if (HelperVariables.isObject(object) === false) {
            return false;
        }

        let constructor = object.constructor;

        if (typeof constructor !== 'function') {
            return false;
        }

        let prototype = constructor.prototype;

        if (HelperVariables.isObject(prototype) === false) {
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
     * @param {(value: T, index: string, array: T[]) => Promise<any>} callback
     * @param {boolean} numberIndex - Call the callback function only if the numeric index
     */
    public static async each<O extends ObjectArr<T>, T>(
        object: O,
        callback: (value: T, index: string, array: O) => Promise<any>
    ) {
        return new Promise((resolve) => {
            Object.keys(object).some(async (value: any) => {
                const result = await callback(object[value], String(value), object);

                if (!HelperVariables.isUndefined(result)) {
                    return resolve(result);
                }
            });
        });
    }

    /**
     * Get Name Class
     * 
     * @param constructor 
     */
    public static getName(constructor: object): string {
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
    public static get<V>(object: any, path: string | Array<string>, def: V): V {
        path = HelperVariables.isArray(path) ? path : path.split('.');

        let result = path.reduce<V>((previousValue: any, currentValue: string) => {
            return previousValue && previousValue[currentValue];
        }, object);

        if (HelperVariables.isUndefined(result)) {
            return def as V;
        }

        return result as V;
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
    public static set(object: any, path: string | Array<string>, value: any) {
        if (!HelperVariables.isObject(object)) {
            return false;
        }

        path = HelperVariables.isArray(path) ? path : path.split('.');

        let keys = path.filter(HelperObject.isValidKey);
        let origin = object;

        if (keys.length === 1) {
            HelperObject.insert<any>(object, keys[0], value);
            return object;
        }

        for (let i: number = 0; i < keys.length; i++) {
            let prop: string = keys[i];

            if (!HelperVariables.isObject(object[prop])) {
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
    public static insert<T extends Object>(object: T, key: keyof T, value: any): void {
        object[key] = value;
    }

    /**
     * 
     * @param {T} object 
     * @param {keyof T} key 
     * @param value 
     */
    public static value<T extends Object>(object: T, key: keyof T, def: any): any | boolean {
        if (!HelperVariables.isObject(object)) {
            return false;
        }

        if (key in object) {
            return object[key];
        }

        return def;
    }
}