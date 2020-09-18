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
         * @param {(value: T, index: string, array: T[]) => Promise<any>} callback
         * @param {boolean} numberIndex - Call the callback function only if the numeric index
         */
        static each(object, callback) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve) => {
                    Object.keys(object).some((value) => __awaiter(this, void 0, void 0, function* () {
                        const result = yield callback(object[value], String(value), object);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9CdWlsZGVyLnRzIiwic3JjL0hlbHBlclZhcmlhYmxlcy50cyIsInNyYy9IZWxwZXJBcnJheS50cyIsInNyYy9IZWxwZXJPYmplY3QudHMiLCJzcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztJQUFBOzs7Ozs7Ozs7O09BVUc7SUFDSCxNQUFhLE9BQU87UUFBcEI7WUFHWSxVQUFLLEdBQWUsRUFBRSxDQUFDO1lBQ3ZCLFVBQUssR0FBRyxFQUFFLENBQUM7UUFVdkIsQ0FBQztRQVJVLEdBQUcsQ0FBQyxJQUFnQjtZQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUN2QixDQUFDO1FBRU0sTUFBTSxDQUFDLE1BQVc7WUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDMUIsQ0FBQztLQUNKO0lBZEQsMEJBY0M7Ozs7OztJQ3hCRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsTUFBYSxlQUFlO1FBRWpCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFrQjtZQUNuQyxNQUFNLE9BQU8sR0FBRyxJQUFJLGlCQUFPLEVBQUUsQ0FBQztZQUU5QixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BCLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFdkIsT0FBTyxPQUFPLENBQUM7UUFDbkIsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNILE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBYTtZQUN0QixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ3ZCLE9BQU8sSUFBSSxDQUFDO2FBQ2Y7aUJBQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUNuQyxPQUFPLElBQUksQ0FBQzthQUNmO2lCQUFNLElBQUksSUFBSSxDQUFDLFNBQVMs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O1FBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBbUIsTUFBUyxFQUFFLEdBQVksRUFBRSxHQUFRO1lBQ25FLElBQUksQ0FBQyxpQ0FBZSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDbkMsT0FBTyxLQUFLLENBQUM7YUFDaEI7WUFFRCxJQUFJLEdBQUcsSUFBSSxNQUFNLEVBQUU7Z0JBQ2YsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDdEI7WUFFRCxPQUFPLEdBQUcsQ0FBQztRQUNmLENBQUM7S0FDSjtJQTNLRCxvQ0EyS0M7Ozs7OztJQzNMUSxvR0FBQSxXQUFXLE9BQVM7SUFDcEIsNEdBQUEsZUFBZSxPQUFhO0lBQzVCLHNHQUFBLFlBQVksT0FBVSIsImZpbGUiOiJ1c2VtaW50LWhlbHBlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZW1pbnQgSGVscGVyIFZhclxuICogXG4gKiBGdW5jdGlvbnMgZm9yIHdvcmtpbmcgd2l0aCB2YXJpYWJsZXNcbiAqIFxuICogQHBhY2thZ2UgSGVscGVyXG4gKiBAY29weXJpZ2h0IFVzZW1pbnQgMjAyMFxuICogQGxpbmsgdXNlbWludC5jb21cbiAqIEBsaW5rIHVzZW1pbnQuY29tL2Rldi9ucG0vdXNlbWludC1oZWxwZXJzXG4gKiBAYXV0aG9yIGxlYXRoZXJfa3MgPHMua296aGVkdWJAdXNlbWludC5jb20+XG4gKi9cbmV4cG9ydCBjbGFzcyBCdWlsZGVyIHtcblxuICAgIHByaXZhdGUgX29iamVjdDogYW55O1xuICAgIHByaXZhdGUgX2F0dHI6IEFycmF5PGFueT4gPSBbXTtcbiAgICBwcml2YXRlIF90eXBlID0gJyc7XG5cbiAgICBwdWJsaWMgYW5kKGF0dHI6IEFycmF5PGFueT4pIHtcbiAgICAgICAgdGhpcy5fYXR0ciA9IGF0dHI7XG4gICAgICAgIHRoaXMuX3R5cGUgPSAnQU5EJztcbiAgICB9XG5cbiAgICBwdWJsaWMgb2JqZWN0KG9iamVjdDogYW55KSB7XG4gICAgICAgIHRoaXMuX29iamVjdCA9IG9iamVjdDtcbiAgICB9XG59IiwiaW1wb3J0IHsgQnVpbGRlciB9IGZyb20gJy4vQnVpbGRlcidcbi8qKlxuICogVXNlbWludCBIZWxwZXIgVmFyXG4gKiBcbiAqIEZ1bmN0aW9ucyBmb3Igd29ya2luZyB3aXRoIHZhcmlhYmxlc1xuICogXG4gKiBAcGFja2FnZSBIZWxwZXJcbiAqIEBjb3B5cmlnaHQgVXNlbWludCAyMDIwXG4gKiBAbGluayB1c2VtaW50LmNvbVxuICogQGxpbmsgdXNlbWludC5jb20vZGV2L25wbS91c2VtaW50LWhlbHBlcnNcbiAqIEBhdXRob3IgbGVhdGhlcl9rcyA8cy5rb3poZWR1YkB1c2VtaW50LmNvbT5cbiAqL1xuZXhwb3J0IGNsYXNzIEhlbHBlclZhcmlhYmxlcyB7XG5cbiAgICBwdWJsaWMgc3RhdGljIGFuZCguLi5wYXJhbXM6IEFycmF5PGFueT4pIHtcbiAgICAgICAgY29uc3QgYnVpbGRlciA9IG5ldyBCdWlsZGVyKCk7XG5cbiAgICAgICAgYnVpbGRlci5hbmQocGFyYW1zKTtcbiAgICAgICAgYnVpbGRlci5vYmplY3QocGFyYW1zKTtcblxuICAgICAgICByZXR1cm4gYnVpbGRlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgYSB2YXJpYWJsZSBpcyBlbXB0eVxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7YW55fSB2YXJpYWJsZSBcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gXG4gICAgICovXG4gICAgc3RhdGljIGVtcHR5KHZhcmlhYmxlOiBhbnkpOiB2YXJpYWJsZSBpcyB0cnVlIHtcbiAgICAgICAgaWYgKHRoaXMuaXNOdWxsKHZhcmlhYmxlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc1VuZGVmaW5lZCh2YXJpYWJsZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNCb29sZWFuKHZhcmlhYmxlKSkge1xuICAgICAgICAgICAgcmV0dXJuICF2YXJpYWJsZTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzQXJyYXkodmFyaWFibGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFyaWFibGUubGVuZ3RoID09PSAwO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNTdHJpbmcodmFyaWFibGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFyaWFibGUgIT09IFwiMVwiICYmICh2YXJpYWJsZSA9PT0gJycgfHwgdmFyaWFibGUgPT09IFwiMFwiKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzTnVtYmVyKHZhcmlhYmxlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhcmlhYmxlID09PSAwO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNGdW5jdGlvbih2YXJpYWJsZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzT2JqZWN0KHZhcmlhYmxlKSkge1xuICAgICAgICAgICAgZm9yIChsZXQgcHJvcCBpbiB2YXJpYWJsZSkge1xuICAgICAgICAgICAgICAgIGlmICh2YXJpYWJsZS5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFyaWFibGUpID09PSBKU09OLnN0cmluZ2lmeSh7fSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIGlmIGEgdmFyaWFibGUgaXMgYSBmdW5jdGlvblxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7YW55fSB2YXJpYWJsZSBcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGlzRnVuY3Rpb24odmFyaWFibGU6IGFueSk6IHZhcmlhYmxlIGlzICguLi5wYXJhbTogQXJyYXk8YW55PikgPT4gYW55IHtcbiAgICAgICAgcmV0dXJuICEhKHZhcmlhYmxlICYmIHZhcmlhYmxlLmNvbnN0cnVjdG9yICYmIHZhcmlhYmxlLmNhbGwgJiYgdmFyaWFibGUuYXBwbHkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERldGVybWluZXMgaWYgYSB2YXJpYWJsZSBpcyBhIHN0cmluZ1xuICAgICAqIFxuICAgICAqIEBwYXJhbSB7YW55fSB2YXJpYWJsZSBcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGlzT2JqZWN0KHZhcmlhYmxlOiBhbnkpOiB2YXJpYWJsZSBpcyBvYmplY3Qge1xuICAgICAgICByZXR1cm4gKHZhcmlhYmxlICE9PSBudWxsICYmICh0eXBlb2YgdmFyaWFibGUgPT09ICdvYmplY3QnIHx8IHR5cGVvZiB2YXJpYWJsZSA9PT0gJ2Z1bmN0aW9uJykpICYmIFxuICAgICAgICAgICAgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhcmlhYmxlKSA9PT0gJ1tvYmplY3QgT2JqZWN0XSdcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIGlmIGEgdmFyaWFibGUgaXMgYSBzdHJpbmdcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge2FueX0gdmFyaWFibGUgXG4gICAgICogXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBpc1N0cmluZyh2YXJpYWJsZTogYW55KTogdmFyaWFibGUgaXMgc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YXJpYWJsZSA9PT0gJ3N0cmluZyc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lcyBpZiBhIHZhcmlhYmxlIGlzIGEgbnVtYmVyXG4gICAgICogXG4gICAgICogQHBhcmFtIHZhcmlhYmxlIFxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgaXNOdW1iZXIodmFyaWFibGU6IGFueSk6IHZhcmlhYmxlIGlzIG51bWJlciB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFyaWFibGUgPT09ICdudW1iZXInO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERldGVybWluZXMgaWYgYSB2YXJpYWJsZSBpcyBhIGJvb2xcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gdmFyaWFibGUgXG4gICAgICogXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBpc0Jvb2xlYW4odmFyaWFibGU6IGFueSk6IHZhcmlhYmxlIGlzIGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhcmlhYmxlID09PSAnYm9vbGVhbic7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lcyBpZiBhIHZhcmlhYmxlIGlzIGFuIGFycmF5XG4gICAgICogXG4gICAgICogQHBhcmFtIHZhcmlhYmxlIFxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgaXNBcnJheSh2YXJpYWJsZTogYW55KTogdmFyaWFibGUgaXMgQXJyYXk8YW55PiB7XG4gICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHZhcmlhYmxlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIGlmIGEgdmFyaWFibGUgaXMgYW4gYXJyYXlcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gdmFyaWFibGUgXG4gICAgICogXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBpc051bGwodmFyaWFibGU6IGFueSk6IHZhcmlhYmxlIGlzIG51bGwge1xuICAgICAgICByZXR1cm4gdmFyaWFibGUgPT09IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lcyBpZiBhIHZhcmlhYmxlIGlzIGFuIHVuZGVmaW5lZFxuICAgICAqIFxuICAgICAqIEBwYXJhbSB2YXJpYWJsZSBcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGlzVW5kZWZpbmVkKHZhcmlhYmxlOiBhbnkpOiB2YXJpYWJsZSBpcyB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdmFyaWFibGUgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2YgdmFyaWFibGUgPT09ICd1bmRlZmluZWQnO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBIZWxwZXJWYXJpYWJsZXMgfSBmcm9tICcuL0hlbHBlclZhcmlhYmxlcyc7XG5cbi8qKlxuICogVXNlbWludCBIZWxwZXIgQXJyYXlcbiAqIFxuICogQHBhY2thZ2UgSGVscGVyXG4gKiBAY29weXJpZ2h0IFVzZW1pbnQgMjAyMFxuICogQGxpbmsgdXNlbWludC5jb21cbiAqIEBsaW5rIHVzZW1pbnQuY29tL2Rldi9ucG0vdXNlbWludC1oZWxwZXJzXG4gKiBAYXV0aG9yIGxlYXRoZXJfa3MgPHMua296aGVkdWJAdXNlbWludC5jb20+XG4gKi9cbmV4cG9ydCBjbGFzcyBIZWxwZXJBcnJheSB7XG5cbiAgICAvKipcbiAgICAgKiBTZWFyY2hlcyBmb3IgYSBnaXZlbiB2YWx1ZSBpbiBhbiBhcnJheSBhbmQgcmV0dXJucyBcbiAgICAgKiB0aGUga2V5IG9mIHRoZSBmaXJzdCBlbGVtZW50IGZvdW5kIGlmIHN1Y2Nlc3NmdWxcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0FycmF5PG51bWJlcnxzdHJpbmd8dW5kZWZpbmVkfG51bGw+fSBvYmplY3QgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5lZWRsZSBcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1vZGUgdHJ1ZSAtIHN0cmljdCB8IGZhbHNlIC0gd2Vha1xuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZmluZChoYXlzdGFjazogQXJyYXk8bnVtYmVyIHwgc3RyaW5nIHwgdW5kZWZpbmVkIHwgbnVsbD4sIG5lZWRsZTogc3RyaW5nLCBtb2RlOiBib29sZWFuID0gZmFsc2UpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKCFIZWxwZXJWYXJpYWJsZXMuaXNBcnJheShoYXlzdGFjaykpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhSGVscGVyVmFyaWFibGVzLmlzVW5kZWZpbmVkKGhheXN0YWNrLmZpbmQoKGUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBtb2RlID8gZSA9PT0gbmVlZGxlIDogKGUgPT0gbmVlZGxlKTtcbiAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEl0ZXJhdGVzIG92ZXIgcHJvcGVydGllcyB3aXRoIHRoZSBhYmlsaXR5IHRvIHNvcnQgdW53YW50ZWQgaXRlbXNcbiAgICAgKiBcbiAgICAgKiBBbGwgZWxlbWVudHMgdHJ1ZSBpbiB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gd2lsbCBiZSByZXR1cm5lZCBpbiBhcnJheVxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7QXJyYXk8YW55fSBoYXlzdGFjayBcbiAgICAgKiBAcGFyYW0geyh2YWx1ZTogYW55LCBpbmRleDogbnVtYmVyLCBhcnJheTogYW55W10pID0+IGJvb2xlYW4gfCB2b2lkfSBjYWxsYmFjayBcbiAgICAgKiBAcGFyYW0ge0FycmF5PGFueT59IHJldHVybnNcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8YW55Pn1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHNlYXJjaChcbiAgICAgICAgaGF5c3RhY2s6IEFycmF5PGFueT4sXG4gICAgICAgIGNhbGxiYWNrOiAodmFsdWU6IGFueSwgaW5kZXg6IG51bWJlciwgYXJyYXk6IGFueVtdKSA9PiBib29sZWFuIHwgdm9pZCxcbiAgICAgICAgcmV0dXJuczogQXJyYXk8YW55PiA9IFtdXG4gICAgKTogQXJyYXk8YW55PiB7XG4gICAgICAgIGlmICghSGVscGVyVmFyaWFibGVzLmlzQXJyYXkoaGF5c3RhY2spKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cblxuICAgICAgICBoYXlzdGFjay5mb3JFYWNoKCh2YWx1ZTogYW55LCBpbmRleDogbnVtYmVyLCBhcnJheTogYW55W10pID0+IHtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayh2YWx1ZSwgaW5kZXgsIGFycmF5KSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybnMucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiByZXR1cm5zO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBIZWxwZXJWYXJpYWJsZXMgfSBmcm9tICcuL0hlbHBlclZhcmlhYmxlcyc7XG5cbmludGVyZmFjZSBPYmplY3RBcnI8VD4ge1xuICAgIHJlYWRvbmx5IGxlbmd0aD86IG51bWJlcjtcbiAgICBbaW5kZXg6IG51bWJlcl06IFQ7XG59XG5cbi8qKlxuICogVXNlbWludCBIZWxwZXIgT2JqZWN0XG4gKiBcbiAqIEBwYWNrYWdlIEhlbHBlclxuICogQGNvcHlyaWdodCBVc2VtaW50IDIwMjBcbiAqIEBsaW5rIHVzZW1pbnQuY29tXG4gKiBAbGluayB1c2VtaW50LmNvbS9kZXYvbnBtL3VzZW1pbnQtaGVscGVyc1xuICogQGF1dGhvciBsZWF0aGVyX2tzIDxzLmtvemhlZHViQHVzZW1pbnQuY29tPlxuICovXG5leHBvcnQgY2xhc3MgSGVscGVyT2JqZWN0IHtcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0aGUgb2JqZWN0IGtleSBpcyB2YWxpZFxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7YW55fSB2YXIgXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBpc1ZhbGlkS2V5KGtleTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBrZXkgIT09ICdfX3Byb3RvX18nICYmIGtleSAhPT0gJ2NvbnN0cnVjdG9yJyAmJiBrZXkgIT09ICdwcm90b3R5cGUnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIElzIFBsYWluIE9iamVjdFxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3QgXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBpc1BsYWluT2JqZWN0KG9iamVjdDogb2JqZWN0KTogYm9vbGVhbiB7XG5cbiAgICAgICAgaWYgKEhlbHBlclZhcmlhYmxlcy5pc09iamVjdChvYmplY3QpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGNvbnN0cnVjdG9yID0gb2JqZWN0LmNvbnN0cnVjdG9yO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29uc3RydWN0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwcm90b3R5cGUgPSBjb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG5cbiAgICAgICAgaWYgKEhlbHBlclZhcmlhYmxlcy5pc09iamVjdChwcm90b3R5cGUpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSgnaXNQcm90b3R5cGVPZicpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSXRlcmF0ZSBvdmVyIHRoZSBvYmplY3QgYW5kIGNhbGwgdGhlIHBhc3NlZCBjYWxsYmFjayBmdW5jdGlvblxuICAgICAqIFRvIHN0b3AgaW4gdGhlIGNhbGxiYWNrIGZ1bmN0aW9uLCB5b3UgbmVlZCB0byByZXR1cm4gYSBmYWxzZVxuICAgICAqXG4gICAgICogQHBhcmFtIHthbnl9IG9iamVjdFxuICAgICAqIEBwYXJhbSB7KHZhbHVlOiBULCBpbmRleDogc3RyaW5nLCBhcnJheTogVFtdKSA9PiBQcm9taXNlPGFueT59IGNhbGxiYWNrXG4gICAgICogQHBhcmFtIHtib29sZWFufSBudW1iZXJJbmRleCAtIENhbGwgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIG9ubHkgaWYgdGhlIG51bWVyaWMgaW5kZXhcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIGVhY2g8TyBleHRlbmRzIE9iamVjdEFycjxUPiwgVD4oXG4gICAgICAgIG9iamVjdDogTyxcbiAgICAgICAgY2FsbGJhY2s6ICh2YWx1ZTogVCwgaW5kZXg6IHN0cmluZywgYXJyYXk6IE8pID0+IFByb21pc2U8YW55PlxuICAgICkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKG9iamVjdCkuc29tZShhc3luYyAodmFsdWU6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNhbGxiYWNrKG9iamVjdFt2YWx1ZV0sIFN0cmluZyh2YWx1ZSksIG9iamVjdCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIUhlbHBlclZhcmlhYmxlcy5pc1VuZGVmaW5lZChyZXN1bHQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBOYW1lIENsYXNzXG4gICAgICogXG4gICAgICogQHBhcmFtIGNvbnN0cnVjdG9yIFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TmFtZShjb25zdHJ1Y3Rvcjogb2JqZWN0KTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgZnVuY05hbWVSZWdleCA9IC9mdW5jdGlvbiAoLnsxLH0pXFwoLztcbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IChmdW5jTmFtZVJlZ2V4KS5leGVjKGNvbnN0cnVjdG9yLnRvU3RyaW5nKCkpO1xuXG4gICAgICAgIHJldHVybiAocmVzdWx0cyAmJiByZXN1bHRzLmxlbmd0aCA+IDEpID8gcmVzdWx0c1sxXSA6IFwiXCI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGFuIGl0ZW0gZnJvbSBhbiBhcnJheSB1c2luZyBcImRvdFwiIG5vdGF0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgIG9iamVjdFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfEFycmF5PHN0cmluZz59ICAgIHBhdGhcbiAgICAgKiBAcGFyYW0ge1Z9ICAgICAgICAgICAgICAgICAgICAgZGVmXG4gICAgICogXG4gICAgICogQHJldHVybiB7Vn1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldDxWPihvYmplY3Q6IGFueSwgcGF0aDogc3RyaW5nIHwgQXJyYXk8c3RyaW5nPiwgZGVmOiBWKTogViB7XG4gICAgICAgIHBhdGggPSBIZWxwZXJWYXJpYWJsZXMuaXNBcnJheShwYXRoKSA/IHBhdGggOiBwYXRoLnNwbGl0KCcuJyk7XG5cbiAgICAgICAgbGV0IHJlc3VsdCA9IHBhdGgucmVkdWNlPFY+KChwcmV2aW91c1ZhbHVlOiBhbnksIGN1cnJlbnRWYWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcHJldmlvdXNWYWx1ZSAmJiBwcmV2aW91c1ZhbHVlW2N1cnJlbnRWYWx1ZV07XG4gICAgICAgIH0sIG9iamVjdCk7XG5cbiAgICAgICAgaWYgKEhlbHBlclZhcmlhYmxlcy5pc1VuZGVmaW5lZChyZXN1bHQpKSB7XG4gICAgICAgICAgICByZXR1cm4gZGVmIGFzIFY7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0IGFzIFY7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IGFuIGFycmF5IGl0ZW0gdG8gYSBnaXZlbiB2YWx1ZSB1c2luZyBcImRvdFwiIG5vdGF0aW9uLlxuICAgICAqXG4gICAgICogSWYgbm8ga2V5IGlzIGdpdmVuIHRvIHRoZSBtZXRob2QsIHRoZSBlbnRpcmUgYXJyYXkgd2lsbCBiZSByZXBsYWNlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7YW55fSAgICAgICAgICAgICAgICAgICAgIG9iamVjdFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfEFycmF5PHN0cmluZz59ICAgIHBhdGhcbiAgICAgKiBAcGFyYW0ge2FueX0gICAgICAgICAgICAgICAgICAgICB2YWx1ZVxuICAgICAqIFxuICAgICAqIEByZXR1cm4gYXJyYXlcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHNldChvYmplY3Q6IGFueSwgcGF0aDogc3RyaW5nIHwgQXJyYXk8c3RyaW5nPiwgdmFsdWU6IGFueSkge1xuICAgICAgICBpZiAoIUhlbHBlclZhcmlhYmxlcy5pc09iamVjdChvYmplY3QpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBwYXRoID0gSGVscGVyVmFyaWFibGVzLmlzQXJyYXkocGF0aCkgPyBwYXRoIDogcGF0aC5zcGxpdCgnLicpO1xuXG4gICAgICAgIGxldCBrZXlzID0gcGF0aC5maWx0ZXIoSGVscGVyT2JqZWN0LmlzVmFsaWRLZXkpO1xuICAgICAgICBsZXQgb3JpZ2luID0gb2JqZWN0O1xuXG4gICAgICAgIGlmIChrZXlzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgSGVscGVyT2JqZWN0Lmluc2VydDxhbnk+KG9iamVjdCwga2V5c1swXSwgdmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgcHJvcDogc3RyaW5nID0ga2V5c1tpXTtcblxuICAgICAgICAgICAgaWYgKCFIZWxwZXJWYXJpYWJsZXMuaXNPYmplY3Qob2JqZWN0W3Byb3BdKSkge1xuICAgICAgICAgICAgICAgIG9iamVjdFtwcm9wXSA9IHt9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaSA9PT0ga2V5cy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgSGVscGVyT2JqZWN0Lmluc2VydChvYmplY3QsIHByb3AsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgb2JqZWN0ID0gb2JqZWN0W3Byb3BdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9yaWdpbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIGEgcHJvcGVydHkgaW50byB0aGUgcGFzc2VkIG9iamVjdFxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7VH0gb2JqZWN0IFxuICAgICAqIEBwYXJhbSB7a2V5b2YgVH0ga2V5IFxuICAgICAqIEBwYXJhbSB2YWx1ZSBcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGluc2VydDxUIGV4dGVuZHMgT2JqZWN0PihvYmplY3Q6IFQsIGtleToga2V5b2YgVCwgdmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7VH0gb2JqZWN0IFxuICAgICAqIEBwYXJhbSB7a2V5b2YgVH0ga2V5IFxuICAgICAqIEBwYXJhbSB2YWx1ZSBcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHZhbHVlPFQgZXh0ZW5kcyBPYmplY3Q+KG9iamVjdDogVCwga2V5OiBrZXlvZiBULCBkZWY6IGFueSk6IGFueSB8IGJvb2xlYW4ge1xuICAgICAgICBpZiAoIUhlbHBlclZhcmlhYmxlcy5pc09iamVjdChvYmplY3QpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgICAgcmV0dXJuIG9iamVjdFtrZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRlZjtcbiAgICB9XG59IiwiZXhwb3J0IHsgSGVscGVyQXJyYXkgYXMgYXJyYXkgfSBmcm9tICcuL0hlbHBlckFycmF5JztcbmV4cG9ydCB7IEhlbHBlclZhcmlhYmxlcyBhcyB2YXJpYWJsZXMgfSBmcm9tIFwiLi9IZWxwZXJWYXJpYWJsZXNcIjtcbmV4cG9ydCB7IEhlbHBlck9iamVjdCBhcyBvYmplY3QgfSBmcm9tIFwiLi9IZWxwZXJPYmplY3RcIjsiXX0=
