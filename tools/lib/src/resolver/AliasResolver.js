"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var join = require("path").join;
var AliasResolver = /** @class */ (function () {
    function AliasResolver() {
        this.aliases = [];
    }
    AliasResolver.prototype.has = function () {
        return this.aliases.length > 0;
    };
    AliasResolver.prototype.add = function (alias) {
        var paths = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            paths[_i - 1] = arguments[_i];
        }
        var pattern;
        var ends;
        if (alias.substring(alias.length - 1) !== "*") {
            pattern = new RegExp("^" + AliasResolver.escapeRegExp(alias) + "$");
            ends = false;
        }
        else {
            pattern = new RegExp("^" + AliasResolver.escapeRegExp(alias.substring(0, alias.length - 1)) + "(.*)");
            ends = true;
        }
        this.aliases.push({
            pattern: pattern,
            ends: ends,
            paths: paths
        });
    };
    AliasResolver.prototype.resolve = function (requestPath) {
        for (var i = 0; i < this.aliases.length; i++) {
            var alias = this.aliases[i];
            var match = requestPath.match(alias.pattern);
            if (match) {
                if (match.length == 1) {
                    return alias.paths;
                }
                else if (match.length == 2) {
                    var newPaths = [];
                    for (var i_1 = 0; i_1 < alias.paths.length; i_1++) {
                        newPaths.push(join(alias.paths[i_1], match[1]));
                    }
                    return newPaths;
                }
            }
        }
        return undefined;
    };
    AliasResolver.escapeRegExp = function (str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    };
    return AliasResolver;
}());
exports.AliasResolver = AliasResolver;
var aliasResolver = new AliasResolver();
exports.default = aliasResolver;
