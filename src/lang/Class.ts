import "../prototype";

// Native Components
const RESTRICTED_TYPES = [
    "Object",
    "ReactComponent",
    "Component",
    "Class",
    "Date",
    "File"
];

// JSX members
const RESTRICTED_JSX_TYPES = [
    "constructor",
    "componentWillMount",
    "render",
    "componentDidMount",
    "componentWillReceiveProps",
    "shouldComponentUpdate",
    "componentWillUpdate",
    "render",
    "componentDidUpdate",
    "componentWillUnmount",
    "setState",
    "forceUpdate",
    "defaultProps",
    "displayName",
    "propTypes",
    "props",
    "state",
    "isMounted",
    "replaceState"
];

/**
 * A class which  implements __bindAll which binds all methods to the instance.
 * Essential to use at all classes if you don't want to use fat-arrows or manuel bindings.
 * @export
 * @class Class
 */
export default class Class {

    public constructor() {
        Class.bindAll(this);
    }

    /**
     * Binds all methods which is not a exist in restricted list
     * @param {Object} instance to bind
     */
    public static bindAll(instance: Object) {
        let parent = Object.getPrototypeOf(instance);
        let bindedNames: any[] = [];
        while (parent != null && RESTRICTED_TYPES.indexOf(parent.constructor.name) === -1) {
            let names = Object.getOwnPropertyNames(parent);
            for (let i = 0; i < names.length; i++) {
                let name = names[i];
                if (!bindedNames[name] && typeof parent[name] === "function" && RESTRICTED_JSX_TYPES.indexOf(name) === -1) {
                    instance[name] = parent[name].bind(instance);
                    bindedNames[name] = true;
                }
            }
            parent = Object.getPrototypeOf(parent);
        }
    }
}

