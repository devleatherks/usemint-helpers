var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define("Builder", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Builder = void 0;
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
    class Builder {
        constructor() {
            this._attr = [];
            this._type = '';
        }
        and(attr) {
            this._attr = attr;
            this._type = 'AND';
        }
        object(object) {
            this._object = object;
        }
    }
    exports.Builder = Builder;
});
define("HelperVariables", ["require", "exports", "Builder"], function (require, exports, Builder_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HelperVariables = void 0;
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
    class HelperVariables {
        static and(...params) {
            const builder = new Builder_1.Builder();
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
        static empty(variable) {
            if (this.isNull(variable)) {
                return true;
            }
            else if (this.isUndefined(variable)) {
                return true;
            }
            else if (this.isBoolean(variable)) {
                return !variable;
            }
            else if (this.isArray(variable)) {
                return variable.length === 0;
            }
            else if (this.isString(variable)) {
                return variable !== "1" && (variable === '' || variable === "0");
            }
            else if (this.isNumber(variable)) {
                return variable === 0;
            }
            else if (this.isFunction(variable)) {
                return false;
            }
            else if (this.isObject(variable)) {
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
        static isFunction(variable) {
            return !!(variable && variable.constructor && variable.call && variable.apply);
        }
        /**
         * Determines if a variable is a string
         *
         * @param {any} variable
         *
         * @returns {boolean}
         */
        static isObject(variable) {
            return (variable !== null && (typeof variable === 'object' || typeof variable === 'function')) &&
                Object.prototype.toString.call(variable) === '[object Object]';
        }
        /**
         * Determines if a variable is a string
         *
         * @param {any} variable
         *
         * @returns {boolean}
         */
        static isString(variable) {
            return typeof variable === 'string';
        }
        /**
         * Determines if a variable is a number
         *
         * @param variable
         *
         * @returns {boolean}
         */
        static isNumber(variable) {
            return typeof variable === 'number';
        }
        /**
         * Determines if a variable is a bool
         *
         * @param variable
         *
         * @returns {boolean}
         */
        static isBoolean(variable) {
            return typeof variable === 'boolean';
        }
        /**
         * Determines if a variable is an array
         *
         * @param variable
         *
         * @returns {boolean}
         */
        static isArray(variable) {
            return Array.isArray(variable);
        }
        /**
         * Determines if a variable is an array
         *
         * @param variable
         *
         * @returns {boolean}
         */
        static isNull(variable) {
            return variable === null;
        }
        /**
         * Determines if a variable is an undefined
         *
         * @param variable
         *
         * @returns {boolean}
         */
        static isUndefined(variable) {
            return variable === undefined || typeof variable === 'undefined';
        }
    }
    exports.HelperVariables = HelperVariables;
});
define("HelperArray", ["require", "exports", "HelperVariables"], function (require, exports, HelperVariables_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HelperArray = void 0;
    /**
     * Usemint Helper Array
     *
     * @package Helper
     * @copyright Usemint 2020
     * @link usemint.com
     * @link usemint.com/dev/npm/usemint-helpers
     * @author leather_ks <s.kozhedub@usemint.com>
     */
    class HelperArray {
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
        static find(haystack, needle, mode = false) {
            if (!HelperVariables_1.HelperVariables.isArray(haystack)) {
                return false;
            }
            return !HelperVariables_1.HelperVariables.isUndefined(haystack.find((e) => {
                return mode ? e === needle : (e == needle);
            }));
        }
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
        static search(haystack, callback, returns = []) {
            if (!HelperVariables_1.HelperVariables.isArray(haystack)) {
                return [];
            }
            haystack.forEach((value, index, array) => {
                if (callback(value, index, array) === true) {
                    returns.push(value);
                }
            });
            return returns;
        }
    }
    exports.HelperArray = HelperArray;
});
define("HelperObject", ["require", "exports", "HelperVariables"], function (require, exports, HelperVariables_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HelperObject = void 0;
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
            if (HelperVariables_2.HelperVariables.isObject(object) === false) {
                return false;
            }
            let constructor = object.constructor;
            if (typeof constructor !== 'function') {
                return false;
            }
            let prototype = constructor.prototype;
            if (HelperVariables_2.HelperVariables.isObject(prototype) === false) {
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
                        if (!HelperVariables_2.HelperVariables.isUndefined(result)) {
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
            path = HelperVariables_2.HelperVariables.isArray(path) ? path : path.split('.');
            let result = path.reduce((previousValue, currentValue) => {
                return previousValue && previousValue[currentValue];
            }, object);
            if (HelperVariables_2.HelperVariables.isUndefined(result)) {
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
            if (!HelperVariables_2.HelperVariables.isObject(object)) {
                return false;
            }
            path = HelperVariables_2.HelperVariables.isArray(path) ? path : path.split('.');
            let keys = path.filter(HelperObject.isValidKey);
            let origin = object;
            if (keys.length === 1) {
                HelperObject.insert(object, keys[0], value);
                return object;
            }
            for (let i = 0; i < keys.length; i++) {
                let prop = keys[i];
                if (!HelperVariables_2.HelperVariables.isObject(object[prop])) {
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
            if (!HelperVariables_2.HelperVariables.isObject(object)) {
                return false;
            }
            if (key in object) {
                return object[key];
            }
            return def;
        }
    }
    exports.HelperObject = HelperObject;
});
define("index", ["require", "exports", "HelperArray", "HelperVariables", "HelperObject"], function (require, exports, HelperArray_1, HelperVariables_3, HelperObject_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.object = exports.variables = exports.array = void 0;
    Object.defineProperty(exports, "array", { enumerable: true, get: function () { return HelperArray_1.HelperArray; } });
    Object.defineProperty(exports, "variables", { enumerable: true, get: function () { return HelperVariables_3.HelperVariables; } });
    Object.defineProperty(exports, "object", { enumerable: true, get: function () { return HelperObject_1.HelperObject; } });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9CdWlsZGVyLnRzIiwic3JjL0hlbHBlclZhcmlhYmxlcy50cyIsInNyYy9IZWxwZXJBcnJheS50cyIsInNyYy9IZWxwZXJPYmplY3QudHMiLCJzcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztJQUFBOzs7Ozs7Ozs7O09BVUc7SUFDSCxNQUFhLE9BQU87UUFBcEI7WUFHWSxVQUFLLEdBQWUsRUFBRSxDQUFDO1lBQ3ZCLFVBQUssR0FBRyxFQUFFLENBQUM7UUFVdkIsQ0FBQztRQVJVLEdBQUcsQ0FBQyxJQUFnQjtZQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUN2QixDQUFDO1FBRU0sTUFBTSxDQUFDLE1BQVc7WUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDMUIsQ0FBQztLQUNKO0lBZEQsMEJBY0M7Ozs7OztJQ3hCRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsTUFBYSxlQUFlO1FBRWpCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFrQjtZQUNuQyxNQUFNLE9BQU8sR0FBRyxJQUFJLGlCQUFPLEVBQUUsQ0FBQztZQUU5QixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BCLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFdkIsT0FBTyxPQUFPLENBQUM7UUFDbkIsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNILE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBYTtZQUN0QixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ3ZCLE9BQU8sSUFBSSxDQUFDO2FBQ2Y7aUJBQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUNuQyxPQUFPLElBQUksQ0FBQzthQUNmO2lCQUFNLElBQUksSUFBSSxDQUFDLFNBQVMs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LENBQUMsS0FBSyxDQUFtQixNQUFTLEVBQUUsR0FBWSxFQUFFLEdBQVE7WUFDbkUsSUFBSSxDQUFDLGlDQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUNuQyxPQUFPLEtBQUssQ0FBQzthQUNoQjtZQUVELElBQUksR0FBRyxJQUFJLE1BQU0sRUFBRTtnQkFDZixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN0QjtZQUVELE9BQU8sR0FBRyxDQUFDO1FBQ2YsQ0FBQztLQUNKO0lBM0tELG9DQTJLQzs7Ozs7O0lDekxRLG9HQUFBLFdBQVcsT0FBUztJQUNwQiw0R0FBQSxlQUFlLE9BQWE7SUFDNUIsc0dBQUEsWUFBWSxPQUFVIiwiZmlsZSI6InVzZW1pbnQtaGVscGVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlbWludCBIZWxwZXIgVmFyXG4gKiBcbiAqIEZ1bmN0aW9ucyBmb3Igd29ya2luZyB3aXRoIHZhcmlhYmxlc1xuICogXG4gKiBAcGFja2FnZSBIZWxwZXJcbiAqIEBjb3B5cmlnaHQgVXNlbWludCAyMDIwXG4gKiBAbGluayB1c2VtaW50LmNvbVxuICogQGxpbmsgdXNlbWludC5jb20vZGV2L25wbS91c2VtaW50LWhlbHBlcnNcbiAqIEBhdXRob3IgbGVhdGhlcl9rcyA8cy5rb3poZWR1YkB1c2VtaW50LmNvbT5cbiAqL1xuZXhwb3J0IGNsYXNzIEJ1aWxkZXIge1xuXG4gICAgcHJpdmF0ZSBfb2JqZWN0OiBhbnk7XG4gICAgcHJpdmF0ZSBfYXR0cjogQXJyYXk8YW55PiA9IFtdO1xuICAgIHByaXZhdGUgX3R5cGUgPSAnJztcblxuICAgIHB1YmxpYyBhbmQoYXR0cjogQXJyYXk8YW55Pikge1xuICAgICAgICB0aGlzLl9hdHRyID0gYXR0cjtcbiAgICAgICAgdGhpcy5fdHlwZSA9ICdBTkQnO1xuICAgIH1cblxuICAgIHB1YmxpYyBvYmplY3Qob2JqZWN0OiBhbnkpIHtcbiAgICAgICAgdGhpcy5fb2JqZWN0ID0gb2JqZWN0O1xuICAgIH1cbn0iLCJpbXBvcnQgeyBCdWlsZGVyIH0gZnJvbSAnLi9CdWlsZGVyJ1xuLyoqXG4gKiBVc2VtaW50IEhlbHBlciBWYXJcbiAqIFxuICogRnVuY3Rpb25zIGZvciB3b3JraW5nIHdpdGggdmFyaWFibGVzXG4gKiBcbiAqIEBwYWNrYWdlIEhlbHBlclxuICogQGNvcHlyaWdodCBVc2VtaW50IDIwMjBcbiAqIEBsaW5rIHVzZW1pbnQuY29tXG4gKiBAbGluayB1c2VtaW50LmNvbS9kZXYvbnBtL3VzZW1pbnQtaGVscGVyc1xuICogQGF1dGhvciBsZWF0aGVyX2tzIDxzLmtvemhlZHViQHVzZW1pbnQuY29tPlxuICovXG5leHBvcnQgY2xhc3MgSGVscGVyVmFyaWFibGVzIHtcblxuICAgIHB1YmxpYyBzdGF0aWMgYW5kKC4uLnBhcmFtczogQXJyYXk8YW55Pikge1xuICAgICAgICBjb25zdCBidWlsZGVyID0gbmV3IEJ1aWxkZXIoKTtcblxuICAgICAgICBidWlsZGVyLmFuZChwYXJhbXMpO1xuICAgICAgICBidWlsZGVyLm9iamVjdChwYXJhbXMpO1xuXG4gICAgICAgIHJldHVybiBidWlsZGVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBhIHZhcmlhYmxlIGlzIGVtcHR5XG4gICAgICogXG4gICAgICogQHBhcmFtIHthbnl9IHZhcmlhYmxlIFxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBcbiAgICAgKi9cbiAgICBzdGF0aWMgZW1wdHkodmFyaWFibGU6IGFueSk6IHZhcmlhYmxlIGlzIHRydWUge1xuICAgICAgICBpZiAodGhpcy5pc051bGwodmFyaWFibGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzVW5kZWZpbmVkKHZhcmlhYmxlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0Jvb2xlYW4odmFyaWFibGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gIXZhcmlhYmxlO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNBcnJheSh2YXJpYWJsZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB2YXJpYWJsZS5sZW5ndGggPT09IDA7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc1N0cmluZyh2YXJpYWJsZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB2YXJpYWJsZSAhPT0gXCIxXCIgJiYgKHZhcmlhYmxlID09PSAnJyB8fCB2YXJpYWJsZSA9PT0gXCIwXCIpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNOdW1iZXIodmFyaWFibGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFyaWFibGUgPT09IDA7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0Z1bmN0aW9uKHZhcmlhYmxlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNPYmplY3QodmFyaWFibGUpKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBwcm9wIGluIHZhcmlhYmxlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhcmlhYmxlLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2YXJpYWJsZSkgPT09IEpTT04uc3RyaW5naWZ5KHt9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERldGVybWluZXMgaWYgYSB2YXJpYWJsZSBpcyBhIGZ1bmN0aW9uXG4gICAgICogXG4gICAgICogQHBhcmFtIHthbnl9IHZhcmlhYmxlIFxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgaXNGdW5jdGlvbih2YXJpYWJsZTogYW55KTogdmFyaWFibGUgaXMgKC4uLnBhcmFtOiBBcnJheTxhbnk+KSA9PiBhbnkge1xuICAgICAgICByZXR1cm4gISEodmFyaWFibGUgJiYgdmFyaWFibGUuY29uc3RydWN0b3IgJiYgdmFyaWFibGUuY2FsbCAmJiB2YXJpYWJsZS5hcHBseSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lcyBpZiBhIHZhcmlhYmxlIGlzIGEgc3RyaW5nXG4gICAgICogXG4gICAgICogQHBhcmFtIHthbnl9IHZhcmlhYmxlIFxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgaXNPYmplY3QodmFyaWFibGU6IGFueSk6IHZhcmlhYmxlIGlzIG9iamVjdCB7XG4gICAgICAgIHJldHVybiAodmFyaWFibGUgIT09IG51bGwgJiYgKHR5cGVvZiB2YXJpYWJsZSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHZhcmlhYmxlID09PSAnZnVuY3Rpb24nKSkgJiYgXG4gICAgICAgICAgICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFyaWFibGUpID09PSAnW29iamVjdCBPYmplY3RdJ1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERldGVybWluZXMgaWYgYSB2YXJpYWJsZSBpcyBhIHN0cmluZ1xuICAgICAqIFxuICAgICAqIEBwYXJhbSB7YW55fSB2YXJpYWJsZSBcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGlzU3RyaW5nKHZhcmlhYmxlOiBhbnkpOiB2YXJpYWJsZSBpcyBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhcmlhYmxlID09PSAnc3RyaW5nJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIGlmIGEgdmFyaWFibGUgaXMgYSBudW1iZXJcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gdmFyaWFibGUgXG4gICAgICogXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBpc051bWJlcih2YXJpYWJsZTogYW55KTogdmFyaWFibGUgaXMgbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YXJpYWJsZSA9PT0gJ251bWJlcic7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lcyBpZiBhIHZhcmlhYmxlIGlzIGEgYm9vbFxuICAgICAqIFxuICAgICAqIEBwYXJhbSB2YXJpYWJsZSBcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGlzQm9vbGVhbih2YXJpYWJsZTogYW55KTogdmFyaWFibGUgaXMgYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFyaWFibGUgPT09ICdib29sZWFuJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIGlmIGEgdmFyaWFibGUgaXMgYW4gYXJyYXlcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gdmFyaWFibGUgXG4gICAgICogXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBpc0FycmF5KHZhcmlhYmxlOiBhbnkpOiB2YXJpYWJsZSBpcyBBcnJheTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFyaWFibGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERldGVybWluZXMgaWYgYSB2YXJpYWJsZSBpcyBhbiBhcnJheVxuICAgICAqIFxuICAgICAqIEBwYXJhbSB2YXJpYWJsZSBcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGlzTnVsbCh2YXJpYWJsZTogYW55KTogdmFyaWFibGUgaXMgbnVsbCB7XG4gICAgICAgIHJldHVybiB2YXJpYWJsZSA9PT0gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIGlmIGEgdmFyaWFibGUgaXMgYW4gdW5kZWZpbmVkXG4gICAgICogXG4gICAgICogQHBhcmFtIHZhcmlhYmxlIFxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgaXNVbmRlZmluZWQodmFyaWFibGU6IGFueSk6IHZhcmlhYmxlIGlzIHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB2YXJpYWJsZSA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiB2YXJpYWJsZSA9PT0gJ3VuZGVmaW5lZCc7XG4gICAgfVxufSIsImltcG9ydCB7IEhlbHBlclZhcmlhYmxlcyB9IGZyb20gJy4vSGVscGVyVmFyaWFibGVzJztcblxuLyoqXG4gKiBVc2VtaW50IEhlbHBlciBBcnJheVxuICogXG4gKiBAcGFja2FnZSBIZWxwZXJcbiAqIEBjb3B5cmlnaHQgVXNlbWludCAyMDIwXG4gKiBAbGluayB1c2VtaW50LmNvbVxuICogQGxpbmsgdXNlbWludC5jb20vZGV2L25wbS91c2VtaW50LWhlbHBlcnNcbiAqIEBhdXRob3IgbGVhdGhlcl9rcyA8cy5rb3poZWR1YkB1c2VtaW50LmNvbT5cbiAqL1xuZXhwb3J0IGNsYXNzIEhlbHBlckFycmF5IHtcblxuICAgIC8qKlxuICAgICAqIFNlYXJjaGVzIGZvciBhIGdpdmVuIHZhbHVlIGluIGFuIGFycmF5IGFuZCByZXR1cm5zIFxuICAgICAqIHRoZSBrZXkgb2YgdGhlIGZpcnN0IGVsZW1lbnQgZm91bmQgaWYgc3VjY2Vzc2Z1bFxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyfHN0cmluZ3x1bmRlZmluZWR8bnVsbD59IG9iamVjdCBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmVlZGxlIFxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbW9kZSB0cnVlIC0gc3RyaWN0IHwgZmFsc2UgLSB3ZWFrXG4gICAgICogXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBmaW5kKGhheXN0YWNrOiBBcnJheTxudW1iZXIgfCBzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsPiwgbmVlZGxlOiBzdHJpbmcsIG1vZGU6IGJvb2xlYW4gPSBmYWxzZSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoIUhlbHBlclZhcmlhYmxlcy5pc0FycmF5KGhheXN0YWNrKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICFIZWxwZXJWYXJpYWJsZXMuaXNVbmRlZmluZWQoaGF5c3RhY2suZmluZCgoZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG1vZGUgPyBlID09PSBuZWVkbGUgOiAoZSA9PSBuZWVkbGUpO1xuICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSXRlcmF0ZXMgb3ZlciBwcm9wZXJ0aWVzIHdpdGggdGhlIGFiaWxpdHkgdG8gc29ydCB1bndhbnRlZCBpdGVtc1xuICAgICAqIFxuICAgICAqIEFsbCBlbGVtZW50cyB0cnVlIGluIHRoZSBjYWxsYmFjayBmdW5jdGlvbiB3aWxsIGJlIHJldHVybmVkIGluIGFycmF5XG4gICAgICogXG4gICAgICogQHBhcmFtIHtBcnJheTxhbnl9IGhheXN0YWNrIFxuICAgICAqIEBwYXJhbSB7KHZhbHVlOiBhbnksIGluZGV4OiBudW1iZXIsIGFycmF5OiBhbnlbXSkgPT4gYm9vbGVhbiB8IHZvaWR9IGNhbGxiYWNrIFxuICAgICAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gcmV0dXJuc1xuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHtBcnJheTxhbnk+fVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgc2VhcmNoKFxuICAgICAgICBoYXlzdGFjazogQXJyYXk8YW55PixcbiAgICAgICAgY2FsbGJhY2s6ICh2YWx1ZTogYW55LCBpbmRleDogbnVtYmVyLCBhcnJheTogYW55W10pID0+IGJvb2xlYW4gfCB2b2lkLFxuICAgICAgICByZXR1cm5zOiBBcnJheTxhbnk+ID0gW11cbiAgICApOiBBcnJheTxhbnk+IHtcbiAgICAgICAgaWYgKCFIZWxwZXJWYXJpYWJsZXMuaXNBcnJheShoYXlzdGFjaykpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGhheXN0YWNrLmZvckVhY2goKHZhbHVlOiBhbnksIGluZGV4OiBudW1iZXIsIGFycmF5OiBhbnlbXSkgPT4ge1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKHZhbHVlLCBpbmRleCwgYXJyYXkpID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJucy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHJldHVybnM7XG4gICAgfVxufSIsImltcG9ydCB7IEhlbHBlclZhcmlhYmxlcyB9IGZyb20gJy4vSGVscGVyVmFyaWFibGVzJztcblxuaW50ZXJmYWNlIEFueU9iamVjdCBleHRlbmRzIE9iamVjdCB7XG4gICAgW3ByZTogc3RyaW5nXTogYW55XG59XG4vKipcbiAqIFVzZW1pbnQgSGVscGVyIE9iamVjdFxuICogXG4gKiBAcGFja2FnZSBIZWxwZXJcbiAqIEBjb3B5cmlnaHQgVXNlbWludCAyMDIwXG4gKiBAbGluayB1c2VtaW50LmNvbVxuICogQGxpbmsgdXNlbWludC5jb20vZGV2L25wbS91c2VtaW50LWhlbHBlcnNcbiAqIEBhdXRob3IgbGVhdGhlcl9rcyA8cy5rb3poZWR1YkB1c2VtaW50LmNvbT5cbiAqL1xuZXhwb3J0IGNsYXNzIEhlbHBlck9iamVjdCB7XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgdGhlIG9iamVjdCBrZXkgaXMgdmFsaWRcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge2FueX0gdmFyIFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgaXNWYWxpZEtleShrZXk6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4ga2V5ICE9PSAnX19wcm90b19fJyAmJiBrZXkgIT09ICdjb25zdHJ1Y3RvcicgJiYga2V5ICE9PSAncHJvdG90eXBlJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJcyBQbGFpbiBPYmplY3RcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb2JqZWN0IFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgaXNQbGFpbk9iamVjdChvYmplY3Q6IG9iamVjdCk6IGJvb2xlYW4ge1xuXG4gICAgICAgIGlmIChIZWxwZXJWYXJpYWJsZXMuaXNPYmplY3Qob2JqZWN0KSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjb25zdHJ1Y3RvciA9IG9iamVjdC5jb25zdHJ1Y3RvcjtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnN0cnVjdG9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcHJvdG90eXBlID0gY29uc3RydWN0b3IucHJvdG90eXBlO1xuXG4gICAgICAgIGlmIChIZWxwZXJWYXJpYWJsZXMuaXNPYmplY3QocHJvdG90eXBlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm90b3R5cGUuaGFzT3duUHJvcGVydHkoJ2lzUHJvdG90eXBlT2YnKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEl0ZXJhdGUgb3ZlciB0aGUgb2JqZWN0IGFuZCBjYWxsIHRoZSBwYXNzZWQgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgKiBUbyBzdG9wIGluIHRoZSBjYWxsYmFjayBmdW5jdGlvbiwgeW91IG5lZWQgdG8gcmV0dXJuIGEgZmFsc2VcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge2FueX0gb2JqZWN0IFxuICAgICAqIEBwYXJhbSB7KGVsZW1lbnQ6IGFueSwga2V5OiBzdHJpbmcpID0+IFByb21pc2U8Ym9vbGVhbiB8IHZvaWQ+fSBjYWxsYmFjayBcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG51bWJlckluZGV4IC0gQ2FsbCB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gb25seSBpZiB0aGUgbnVtZXJpYyBpbmRleFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgZWFjaDxSZXR1cm5FbGVtZW50PihcbiAgICAgICAgb2JqZWN0OiBhbnksXG4gICAgICAgIGNhbGxiYWNrOiAodmFsdWU6IFJldHVybkVsZW1lbnQsIGluZGV4OiBudW1iZXIsIGFycmF5OiBSZXR1cm5FbGVtZW50W10pID0+IFByb21pc2U8YW55PlxuICAgICkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKG9iamVjdCkuc29tZShhc3luYyAodmFsdWU6IGFueSwgaW5kZXg6IG51bWJlciwgYXJyYXk6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNhbGxiYWNrKHZhbHVlLCBpbmRleCwgYXJyYXkpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFIZWxwZXJWYXJpYWJsZXMuaXNVbmRlZmluZWQocmVzdWx0KSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgTmFtZSBDbGFzc1xuICAgICAqIFxuICAgICAqIEBwYXJhbSBjb25zdHJ1Y3RvciBcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldE5hbWUoY29uc3RydWN0b3I6IG9iamVjdCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IGZ1bmNOYW1lUmVnZXggPSAvZnVuY3Rpb24gKC57MSx9KVxcKC87XG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSAoZnVuY05hbWVSZWdleCkuZXhlYyhjb25zdHJ1Y3Rvci50b1N0cmluZygpKTtcblxuICAgICAgICByZXR1cm4gKHJlc3VsdHMgJiYgcmVzdWx0cy5sZW5ndGggPiAxKSA/IHJlc3VsdHNbMV0gOiBcIlwiO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhbiBpdGVtIGZyb20gYW4gYXJyYXkgdXNpbmcgXCJkb3RcIiBub3RhdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgICBvYmplY3RcbiAgICAgKiBAcGFyYW0ge3N0cmluZ3xBcnJheTxzdHJpbmc+fSAgICBwYXRoXG4gICAgICogQHBhcmFtIHtWfSAgICAgICAgICAgICAgICAgICAgIGRlZlxuICAgICAqIFxuICAgICAqIEByZXR1cm4ge1Z9XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBnZXQ8Vj4ob2JqZWN0OiBhbnksIHBhdGg6IHN0cmluZyB8IEFycmF5PHN0cmluZz4sIGRlZjogVik6IFYge1xuICAgICAgICBwYXRoID0gSGVscGVyVmFyaWFibGVzLmlzQXJyYXkocGF0aCkgPyBwYXRoIDogcGF0aC5zcGxpdCgnLicpO1xuXG4gICAgICAgIGxldCByZXN1bHQgPSBwYXRoLnJlZHVjZTxWPigocHJldmlvdXNWYWx1ZTogYW55LCBjdXJyZW50VmFsdWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHByZXZpb3VzVmFsdWUgJiYgcHJldmlvdXNWYWx1ZVtjdXJyZW50VmFsdWVdO1xuICAgICAgICB9LCBvYmplY3QpO1xuXG4gICAgICAgIGlmIChIZWxwZXJWYXJpYWJsZXMuaXNVbmRlZmluZWQocmVzdWx0KSkge1xuICAgICAgICAgICAgcmV0dXJuIGRlZiBhcyBWO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdCBhcyBWO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCBhbiBhcnJheSBpdGVtIHRvIGEgZ2l2ZW4gdmFsdWUgdXNpbmcgXCJkb3RcIiBub3RhdGlvbi5cbiAgICAgKlxuICAgICAqIElmIG5vIGtleSBpcyBnaXZlbiB0byB0aGUgbWV0aG9kLCB0aGUgZW50aXJlIGFycmF5IHdpbGwgYmUgcmVwbGFjZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2FueX0gICAgICAgICAgICAgICAgICAgICBvYmplY3RcbiAgICAgKiBAcGFyYW0ge3N0cmluZ3xBcnJheTxzdHJpbmc+fSAgICBwYXRoXG4gICAgICogQHBhcmFtIHthbnl9ICAgICAgICAgICAgICAgICAgICAgdmFsdWVcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJuIGFycmF5XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBzZXQob2JqZWN0OiBhbnksIHBhdGg6IHN0cmluZyB8IEFycmF5PHN0cmluZz4sIHZhbHVlOiBhbnkpIHtcbiAgICAgICAgaWYgKCFIZWxwZXJWYXJpYWJsZXMuaXNPYmplY3Qob2JqZWN0KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcGF0aCA9IEhlbHBlclZhcmlhYmxlcy5pc0FycmF5KHBhdGgpID8gcGF0aCA6IHBhdGguc3BsaXQoJy4nKTtcblxuICAgICAgICBsZXQga2V5cyA9IHBhdGguZmlsdGVyKEhlbHBlck9iamVjdC5pc1ZhbGlkS2V5KTtcbiAgICAgICAgbGV0IG9yaWdpbiA9IG9iamVjdDtcblxuICAgICAgICBpZiAoa2V5cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIEhlbHBlck9iamVjdC5pbnNlcnQ8YW55PihvYmplY3QsIGtleXNbMF0sIHZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHByb3A6IHN0cmluZyA9IGtleXNbaV07XG5cbiAgICAgICAgICAgIGlmICghSGVscGVyVmFyaWFibGVzLmlzT2JqZWN0KG9iamVjdFtwcm9wXSkpIHtcbiAgICAgICAgICAgICAgICBvYmplY3RbcHJvcF0gPSB7fTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGkgPT09IGtleXMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgIEhlbHBlck9iamVjdC5pbnNlcnQob2JqZWN0LCBwcm9wLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG9iamVjdCA9IG9iamVjdFtwcm9wXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvcmlnaW47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5zZXJ0cyBhIHByb3BlcnR5IGludG8gdGhlIHBhc3NlZCBvYmplY3RcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1R9IG9iamVjdCBcbiAgICAgKiBAcGFyYW0ge2tleW9mIFR9IGtleSBcbiAgICAgKiBAcGFyYW0gdmFsdWUgXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBpbnNlcnQ8VCBleHRlbmRzIE9iamVjdD4ob2JqZWN0OiBULCBrZXk6IGtleW9mIFQsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1R9IG9iamVjdCBcbiAgICAgKiBAcGFyYW0ge2tleW9mIFR9IGtleSBcbiAgICAgKiBAcGFyYW0gdmFsdWUgXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyB2YWx1ZTxUIGV4dGVuZHMgT2JqZWN0PihvYmplY3Q6IFQsIGtleToga2V5b2YgVCwgZGVmOiBhbnkpOiBhbnkgfCBib29sZWFuIHtcbiAgICAgICAgaWYgKCFIZWxwZXJWYXJpYWJsZXMuaXNPYmplY3Qob2JqZWN0KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICAgIHJldHVybiBvYmplY3Rba2V5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkZWY7XG4gICAgfVxufSIsImV4cG9ydCB7IEhlbHBlckFycmF5IGFzIGFycmF5IH0gZnJvbSAnLi9IZWxwZXJBcnJheSc7XG5leHBvcnQgeyBIZWxwZXJWYXJpYWJsZXMgYXMgdmFyaWFibGVzIH0gZnJvbSBcIi4vSGVscGVyVmFyaWFibGVzXCI7XG5leHBvcnQgeyBIZWxwZXJPYmplY3QgYXMgb2JqZWN0IH0gZnJvbSBcIi4vSGVscGVyT2JqZWN0XCI7Il19
