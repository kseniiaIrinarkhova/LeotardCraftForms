import { RhinestonesType, Project} from '../types/main';

/************Classes************************************** */

/**
 * Class for response error handling
 */
class ResError extends Error {
    _status: number;
    constructor(status?: number, message?: string) {
        super(message); // 'Error' breaks prototype chain here
        //additional property
        if (status !== undefined) {
            this._status = status;
        } else this._status = 500;
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    }
    get status() {
        return this._status
    }
}

/************Functions************************************** */

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


/**
 * function that return custon error with status
 * @param status number
 * @param msg string
 * @returns ResError
 */
function error(status:number, msg:string) : ResError {
    let err = new ResError(status,msg);
    return err;
}

/**
 * Helper function for adding rhinestones to project
 * @param project Project
 * @param rhinestones Array of objects {rhinestoneId: number, amount: number}
 * @returns Progect with array of rhinestones
 */
function addRhinestones(project: Project, rhinestones: Array<{ rhinestoneId: number, amount: number }>) : Project {
    let rentry: { rhinestoneId: number, amount: number };
    for (rentry of rhinestones) {
        project.rhinestones?.push(rentry)
    }
    return project;

}

export { isRhinostoneType, error,ResError, addRhinestones }