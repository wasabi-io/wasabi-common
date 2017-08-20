"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ElectronResolver = /** @class */ (function () {
    function ElectronResolver() {
        this.ModuleClass = module.constructor;
        this.originalResolver = this.ModuleClass._resolveFilename;
    }
    ElectronResolver.prototype.apply = function (resolve) {
        var _this = this;
        /**
         * change resolver
         * @type resolver
         * @private
         */
        this.ModuleClass._resolveFilename = function (request, parent, isMain) {
            try {
                return _this.originalResolver(request, parent, isMain);
            }
            catch (e) {
                var paths = resolve(request);
                if (paths.length > 0) {
                    for (var i = 0; i < paths.length; i++) {
                        var mod = _this.resolve(paths[i], parent, isMain);
                        if (!(mod instanceof Error)) {
                            return mod;
                        }
                    }
                }
                throw e;
            }
        };
    };
    ;
    ElectronResolver.prototype.resolve = function (request, parent, isMain) {
        try {
            var mod = this.originalResolver(request, parent, isMain);
            return mod;
        }
        catch (e) {
            return e;
        }
    };
    return ElectronResolver;
}());
exports.default = ElectronResolver;
