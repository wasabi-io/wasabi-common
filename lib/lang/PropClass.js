"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Class_1 = require("./Class");
var Objects_1 = require("../types/Objects");
/**
 * A class which provides to merge props to defaultProps
 * @export
 * @class PropsClass
 */
var PropsClass = (function (_super) {
    __extends(PropsClass, _super);
    function PropsClass(props, defaultProps) {
        var _this = _super.call(this) || this;
        var defProps = defaultProps || _this.constructor["defaultProps"];
        _this.props = defProps ? Objects_1.default.mergeDefaults(defProps, props) : props;
        return _this;
    }
    return PropsClass;
}(Class_1.default));
exports.default = PropsClass;
//# sourceMappingURL=PropClass.js.map