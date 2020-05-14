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

    private _object: any;
    private _attr: [] = [];
    private _type = '';

    public and(attr: []) {
        this._attr = attr;
        this._type = 'AND';
    }

    public object(object: any) {
        this._object = object;
    }
}