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
export declare class HelperVariables {
    /**
     * Checks if a variable is empty
     *
     * @param {any} variable
     *
     * @returns {boolean}
     */
    static empty(variable: any): boolean;
    /**
     * Determines if a variable is a function
     *
     * @param {any} variable
     *
     * @returns {boolean}
     */
    static isFunction(variable: any): variable is (...param: any) => any;
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
