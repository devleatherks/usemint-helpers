import { HelperVariables } from './HelperVariables';

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
    public static find(haystack: Array<number | string | undefined | null>, needle: string, mode: boolean = false): boolean {
        if (!HelperVariables.isArray(haystack)) {
            return false;
        }

        return !HelperVariables.isUndefined(haystack.find((e) => {
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
    public static search(
        haystack: Array<any>,
        callback: (value: any, index: number, array: any[]) => boolean | void,
        returns: Array<any> = []
    ): Array<any> {
        if (!HelperVariables.isArray(haystack)) {
            return [];
        }

        haystack.forEach((value: any, index: number, array: any[]) => {
            if (callback(value, index, array) === true) {
                returns.push(value);
            }
        });

        return returns;
    }
}