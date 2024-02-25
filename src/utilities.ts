import { RhinestonesType } from '../types/main';

/**
 * Function to check if the type is RhinostonesType
 * @param type rhinostones type name
 * @returns true if type is RhinestonesType
 */
function isRhinostoneType(type: string): type is RhinestonesType {
    return type === "Sew-on" ||
        type === "HotFix" ||
        type === "No-HotFix";
}

export { isRhinostoneType }