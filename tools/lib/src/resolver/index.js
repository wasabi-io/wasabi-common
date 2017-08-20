"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var ElectronResolver_1 = require("./ElectronResolver");
var AliasResolver_1 = require("./AliasResolver");
var Binder_1 = require("../lang/Binder");
var Builder = /** @class */ (function () {
    function Builder(resolver) {
        this.rootKeys = [];
        this.roots = [];
        this.resolver = resolver;
        this.aliasResolver = new AliasResolver_1.AliasResolver();
        this.rootKeys.push("./");
        this.roots.push(path_1.resolve("./"));
        Binder_1.default.bindAll(this);
    }
    Builder.prototype.root = function (path) {
        if (this.rootKeys.indexOf(path) == -1) {
            this.rootKeys.push(path);
            this.roots.push(path_1.resolve(path));
        }
        return this;
    };
    Builder.prototype.alias = function (alias) {
        var refs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            refs[_i - 1] = arguments[_i];
        }
        this.aliasResolver.add.apply(this.aliasResolver, [alias].concat(refs));
        return this;
    };
    Builder.prototype.resolve = function (request) {
        var paths = [request];
        if (this.aliasResolver.has()) {
            var aliasesPaths = this.aliasResolver.resolve(request);
            if (aliasesPaths) {
                paths = aliasesPaths.concat(paths);
            }
        }
        var allPaths = [];
        for (var p in paths) {
            for (var r in this.roots) {
                var joinPath = path_1.resolve(this.roots[r], paths[p]);
                allPaths.push(joinPath);
            }
        }
        return allPaths;
    };
    Builder.prototype.apply = function () {
        this.resolver.apply(this.resolve);
    };
    return Builder;
}());
exports.Builder = Builder;
var Resolver = /** @class */ (function () {
    function Resolver() {
    }
    Resolver.electron = function () {
        return new Builder(new ElectronResolver_1.default());
    };
    return Resolver;
}());
exports.default = Resolver;
