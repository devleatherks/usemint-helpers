import { HelperArray } from './HelperArray';
import { HelperVariables } from "./HelperVariables";
import { HelperObject } from "./HelperObject";

interface HelperMap {
    array: HelperArray;
    var: HelperVariables;
    object: HelperObject;
}

export const Helper: HelperMap = {
    array: HelperArray,
    var: HelperVariables,
    object: HelperObject
} 