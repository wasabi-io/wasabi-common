import {resolve} from "path";
import Strings from "../types/Strings";

/**
 * get native module instance.
 * @type {Function}
 */
let ModuleClass: any = module.constructor;

/**
 * hold original resolver.
 */
let originalResolver = ModuleClass._resolveFilename;
/**
 * Holds module paths.
 * @type {Array}
 */
let rootDirs = [];
/**
 * Holds finders to resolving classes.
 * @type {Array}
 */
let finders = [];

/**
 * Holds aliases to resolve path
 * @type {{length: number}}
 */
let aliases: {
    [key: string]: any
} = {
    length: 0
};

let baseUrl = null;
/**
 * change base url.
 * @param path
 */
const addBaseUrl = (path: string) => {
    baseUrl = path;
};

/**
 * add module root path to resolve files under it.
 * @param path
 */
const addModule = (path: string) => {
    if(!path) return;
    if(rootDirs.indexOf(path) === -1) {
        rootDirs.push(path);
    }
};

/**
 * add module root paths  to resolve files under their.
 * @param paths
 */
const addModules = (paths: string[]) => {
    if(!paths || paths.length === 0) return;
   for(let i = 0 ; i < paths.length; i++) {
       addModule(paths[i]);
   }
};

/**
 * add alias to resolve files.
 * @param alias
 * @param pattern
 */
const addAlias = (alias, pattern) => {
    if(alias === "length") {
        throw new Error("length is a reserved word ! ");
    }
    aliases[alias] = pattern;
};
/**
 * add new resolver to resolve files.
 * @param finder
 * @return {boolean}
 */
const addResolver = (finder: (request, parent, isMain) => any): boolean => {
    if(finder) {
        let finderIndex = finders.indexOf(finder);
        if(finderIndex === -1) {
            for(let i = 0 ; i < finders.length; i++) {
                if(finders[i].toString() != finder.toString()) {
                    finderIndex = i;
                    break;
                }
            }
            if(finderIndex === -1) {
                finders.push(finder);
                return true;
            }
        }
        finders[finderIndex] = finder;
        return true;
    }
    return false;
};


/**
 * Use resolver to wrap origin resolver because of resolve files in different rules.
 * @param request
 * @param parent
 * @param isMain
 * @return {any}
 */

const resolver = (request, parent, isMain) => {
    try {
        return originalResolver(request, parent, isMain);
    }catch (e) {
        for(let i = 0 ; i < rootDirs.length; i++) {
            if(!Strings.startsWith(request[i], ".")) {
                try{
                    let result = originalResolver(resolve(rootDirs[i], request), parent, isMain);
                    return result;
                } catch (err) {}
            }
        }
        throw e;
    }
};

/**
 * change resolver
 * @type resolver
 * @private
 */
ModuleClass._resolveFilename = resolver;

export {
    addBaseUrl,
    addModule,
    addModules
};



