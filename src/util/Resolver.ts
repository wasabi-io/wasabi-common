import {resolve} from "path";
import Strings from "../types/Strings";
let ModuleClass: any = module.constructor;
let originalResolver = ModuleClass._resolveFilename;
let rootDirs = [];
let finders = [];
let aliases: {
    [key: string]: any
} = {
    length: 0
};

let baseUrl = null;
const addBaseUrl = (path: string) => {
    baseUrl = path;
};

const addModule = (path: string) => {
    if(!path) return;
    if(rootDirs.indexOf(path) === -1) {
        rootDirs.push(path);
    }
};

const addModules = (paths: string[]) => {
    if(!paths || paths.length === 0) return;
   for(let i = 0 ; i < paths.length; i++) {
       addModule(paths[i]);
   }
};

const addAlias = (alias, pattern) => {
    if(alias === "length") {
        throw new Error("length is a reserved word ! ");
    }
    aliases[alias] = pattern;
};

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

ModuleClass._resolveFilename = resolver;

export {
    addBaseUrl,
    addModule,
    addModules
};

