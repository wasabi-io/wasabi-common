export default class Binder {
    /**
     *
     * @param instance
     * @param {string} key
     * @param {Function} fn
     */
    public static bind(instance: any, key: string, /* tslint:disable */fn?: Function) {
        if (!fn) {
            fn = instance[key];
        }
        instance[key] = fn.bind(instance);
    }

    /**
     *
     * @param instance
     * @param {string} keys
     */
    public static bindAll(instance: any, ...keys: string[]) {
        if (keys.length === 0) {
            const protos = Object.getPrototypeOf(instance);
            if (protos) {
                keys = Object.getOwnPropertyNames(protos);
            }
        }
        for (const key of keys) {
            const member = instance[key];
            if (key !== "constructor" && typeof member === "function") {
                Binder.bind(instance, key, member);
            }
        }
    }

    /**
     * Constructs Binder class.
     */
    public constructor() {
        Binder.bindAll(this);
    }
}
