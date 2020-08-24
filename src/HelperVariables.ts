import { Builder } from './Builder'
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

    public static and(...params: Array<any>) {
        const builder = new Builder();

        builder.and(params);
        builder.object(params);

        return builder;
    }

    /**
     * Checks if a variable is empty
     * 
     * @param {any} variable 
     * 
     * @returns {boolean} 
     */
    static empty(variable: any): boolean {
        if (this.isNull(variable)) {
            return true;
        } else if (this.isUndefined(variable)) {
            return true;
        } else if (this.isBoolean(variable)) {
            return !variable;
        } else if (this.isArray(variable)) {
            return variable.length === 0;
        } else if (this.isString(variable)) {
            return variable !== "1" && (variable === '' || variable === "0");
        } else if (this.isNumber(variable)) {
            return variable === 0;
        } else if (this.isFunction(variable)) {
            return false;
        } else if (this.isObject(variable)) {
            for (let prop in variable) {
                if (variable.hasOwnProperty(prop)) {
                    return false;
                }
            }

            return JSON.stringify(variable) === JSON.stringify({});
        }

        return true;
    }

    /**
     * Determines if a variable is a function
     * 
     * @param {any} variable 
     * 
     * @returns {boolean}
     */
    public static isFunction(variable: any): variable is (...param: Array<any>) => any {
        return !!(variable && variable.constructor && variable.call && variable.apply);
    }

    /**
     * Determines if a variable is a string
     * 
     * @param {any} variable 
     * 
     * @returns {boolean}
     */
    public static isObject(variable: any): variable is object {
        return (variable !== null && (typeof variable === 'object' || typeof variable === 'function')) && 
            Object.prototype.toString.call(variable) === '[object Object]'
    }

    /**
     * Determines if a variable is a string
     * 
     * @param {any} variable 
     * 
     * @returns {boolean}
     */
    public static isString(variable: any): variable is string {
        return typeof variable === 'string';
    }

    /**
     * Determines if a variable is a number
     * 
     * @param variable 
     * 
     * @returns {boolean}
     */
    public static isNumber(variable: any): variable is number {
        return typeof variable === 'number';
    }

    /**
     * Determines if a variable is a bool
     * 
     * @param variable 
     * 
     * @returns {boolean}
     */
    public static isBoolean(variable: any): variable is boolean {
        return typeof variable === 'boolean';
    }

    /**
     * Determines if a variable is an array
     * 
     * @param variable 
     * 
     * @returns {boolean}
     */
    public static isArray(variable: any): variable is Array<any> {
        return Array.isArray(variable);
    }

    /**
     * Determines if a variable is an array
     * 
     * @param variable 
     * 
     * @returns {boolean}
     */
    public static isNull(variable: any): variable is null {
        return variable === null;
    }

    /**
     * Determines if a variable is an undefined
     * 
     * @param variable 
     * 
     * @returns {boolean}
     */
    public static isUndefined(variable: any): variable is undefined {
        return variable === undefined || typeof variable === 'undefined';
    }
}