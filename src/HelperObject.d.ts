/**
 * Usemint Helper Object
 *
 * @package Helper
 * @copyright Usemint 2020
 * @link usemint.com
 * @link usemint.com/dev/npm/usemint-helpers
 * @author leather_ks <s.kozhedub@usemint.com>
 */
export declare class HelperObject {
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
