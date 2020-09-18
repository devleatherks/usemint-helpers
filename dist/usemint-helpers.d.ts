declare module "Builder" {
    /**
     * Usemint Helper Var
     *
     * Functions for working with variables
     *
     * @package Helper
     * @copyright Usemint 2020
     * @link usemint.com
     * @link usemint.com/dev/npm/usemint-helpers
     * @author leather_ks <s.kozhedub@usemint.com>
     */
    export class Builder {
        private _object;
        private _attr;
        private _type;
        and(attr: Array<any>): void;
        object(object: any): void;
    }
}
declare module "HelperVariables" {
    import { Builder } from "Builder";
    /**
     * Usemint Helper Var
     *
     * Functions for working with variables
     *
     * @package Helper
     * @copyright Usemint 2020
     * @link usemint.com
     * @link usemint.com/dev/npm/usemint-helpers
     * @author leather_ks <s.kozhedub@usemint.com>
     */
    export class HelperVariables {
        static and(...params: Array<any>): Builder;
        /**
         * Checks if a variable is empty
         *
         * @param {any} variable
         *
         * @returns {boolean}
         */
        static empty(variable: any): variable is true;
        /**
         * Determines if a variable is a function
         *
         * @param {any} variable
         *
         * @returns {boolean}
         */
        static isFunction(variable: any): variable is (...param: Array<any>) => any;
        /**
         * Determines if a variable is a string
         *
         * @param {any} variable
         *
         * @returns {boolean}
         */
        static isObject(variable: any): variable is object;
        /**
         * Determines if a variable is a string
         *
         * @param {any} variable
         *
         * @returns {boolean}
         */
        static isString(variable: any): variable is string;
        /**
         * Determines if a variable is a number
         *
         * @param variable
         *
         * @returns {boolean}
         */
        static isNumber(variable: any): variable is number;
        /**
         * Determines if a variable is a bool
         *
         * @param variable
         *
         * @returns {boolean}
         */
        static isBoolean(variable: any): variable is boolean;
        /**
         * Determines if a variable is an array
         *
         * @param variable
         *
         * @returns {boolean}
         */
        static isArray(variable: any): variable is Array<any>;
        /**
         * Determines if a variable is an array
         *
         * @param variable
         *
         * @returns {boolean}
         */
        static isNull(variable: any): variable is null;
        /**
         * Determines if a variable is an undefined
         *
         * @param variable
         *
         * @returns {boolean}
         */
        static isUndefined(variable: any): variable is undefined;
    }
}
declare module "HelperArray" {
    /**
     * Usemint Helper Array
     *
     * @package Helper
     * @copyright Usemint 2020
     * @link usemint.com
     * @link usemint.com/dev/npm/usemint-helpers
     * @author leather_ks <s.kozhedub@usemint.com>
     */
    export class HelperArray {
        /**
         * Searches for a given value in an array and returns
         * the key of the first element found if successful
         *
         * @param {Array<number|string|undefined|null>} object
         * @param {string} needle
         * @param {boolean} mode true - strict | false - weak
         *
         * @returns {boolean}
         */
        static find(haystack: Array<number | string | undefined | null>, needle: string, mode?: boolean): boolean;
        /**
         * Iterates over properties with the ability to sort unwanted items
         *
         * All elements true in the callback function will be returned in array
         *
         * @param {Array<any} haystack
         * @param {(value: any, index: number, array: any[]) => boolean | void} callback
         * @param {Array<any>} returns
         *
         * @returns {Array<any>}
         */
        static search(haystack: Array<any>, callback: (value: any, index: number, array: any[]) => boolean | void, returns?: Array<any>): Array<any>;
    }
}
declare module "HelperObject" {
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
        static isValidKey(key: any): boolean;
        /**
         * Is Plain Object
         *
         * @param {object} object
         */
        static isPlainObject(object: object): boolean;
        /**
         * Iterate over the object and call the passed callback function
         * To stop in the callback function, you need to return a false
         *
         * @param {any} object
         * @param {(element: any, key: string) => Promise<boolean | void>} callback
         * @param {boolean} numberIndex - Call the callback function only if the numeric index
         */
        static each<ReturnElement>(object: any, callback: (value: ReturnElement, index: number, array: ReturnElement[]) => Promise<any>): Promise<unknown>;
        /**
         * Get Name Class
         *
         * @param constructor
         */
        static getName(constructor: object): string;
        /**
         * Get an item from an array using "dot" notation.
         *
         * @param {object}                   object
         * @param {string|Array<string>}    path
         * @param {V}                     def
         *
         * @return {V}
         */
        static get<V>(object: any, path: string | Array<string>, def: V): V;
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
        static set(object: any, path: string | Array<string>, value: any): false | object;
        /**
         * Inserts a property into the passed object
         *
         * @param {T} object
         * @param {keyof T} key
         * @param value
         */
        static insert<T extends Object>(object: T, key: keyof T, value: any): void;
        /**
         *
         * @param {T} object
         * @param {keyof T} key
         * @param value
         */
        static value<T extends Object>(object: T, key: keyof T, def: any): any | boolean;
    }
}
declare module "index" {
    export { HelperArray as array } from "HelperArray";
    export { HelperVariables as variables } from "HelperVariables";
    export { HelperObject as object } from "HelperObject";
}
