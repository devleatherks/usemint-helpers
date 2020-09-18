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
//# sourceMappingURL=Builder.js.map