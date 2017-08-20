export default class Binder {
    /**
     *
     */
    public constructor() {
        Binder.bindAll(this);
    }

    /**
     *
     * @param instance
     * @param {string} key
     * @param {Function} fn
     */
    public static bind(instance: any, key: string, fn?: Function) {
        if(!fn) {
            fn = instance[key];
        }
        instance[key] = fn.bind(instance);
    }

    /**
     *
     * @param instance
     * @param {string} keys
     */
    public static bindAll(instance: any, ...keys: string[]){
        if(keys.length === 0) {
            keys = Object.getPrototypeOf(instance);
        }
        for(let key in keys) {
            let member = instance[key];
            if(key !== "constructor" && typeof member === "function") {
                Binder.bind(instance, key, member);
            }
        }
    }
}