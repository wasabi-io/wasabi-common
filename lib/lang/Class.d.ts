import "../prototype";
/**
 * A class which  implements __bindAll which binds all methods to the instance.
 * Essential to use at all classes if you don't want to use fat-arrows or manuel bindings.
 * @export
 * @class Class
 */
export default class Class {
    constructor();
    /**
     * Binds all methods which is not a exist in restricted list
     * @param {Object} instance to bind
     */
    static bindAll(instance: Object): void;
}
