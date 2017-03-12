"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var Strings_1 = require("../types/Strings");
var ModuleClass = module.constructor;
var originalResolver = ModuleClass._resolveFilename;
var rootDirs = [];
var finders = [];
var aliases = {
    length: 0
};
var baseUrl = null;
var addBaseUrl = function (path) {
    baseUrl = path;
};
exports.addBaseUrl = addBaseUrl;
var addModule = function (path) {
    if (!path)
        return;
    if (rootDirs.indexOf(path) === -1) {
        rootDirs.push(path);
    }
};
exports.addModule = addModule;
var addModules = function (paths) {
    if (!paths || paths.length === 0)
        return;
    for (var i = 0; i < paths.length; i++) {
        addModule(paths[i]);
    }
};
exports.addModules = addModules;
var addAlias = function (alias, pattern) {
    if (alias === "length") {
        throw new Error("length is a reserved word ! ");
    }
    aliases[alias] = pattern;
};
var addResolver = function (finder) {
    if (finder) {
        var finderIndex = finders.indexOf(finder);
        if (finderIndex === -1) {
            for (var i = 0; i < finders.length; i++) {
                if (finders[i].toString() != finder.toString()) {
                    finderIndex = i;
                    break;
                }
            }
            if (finderIndex === -1) {
                finders.push(finder);
                return true;
            }
        }
        finders[finderIndex] = finder;
        return true;
    }
    return false;
};
var resolver = function (request, parent, isMain) {
    try {
        return originalResolver(request, parent, isMain);
    }
    catch (e) {
        for (var i = 0; i < rootDirs.length; i++) {
            if (!Strings_1.default.startsWith(request[i], ".")) {
                try {
                    var result = originalResolver(path_1.resolve(rootDirs[i], request), parent, isMain);
                    return result;
                }
                catch (err) { }
            }
        }
        throw e;
    }
};
ModuleClass._resolveFilename = resolver;
//# sourceMappingURL=Resolver.js.map