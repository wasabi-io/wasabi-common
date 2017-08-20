export default class Binder {
    /**
     *
     */
    constructor();
    /**
     *
     * @param instance
     * @param {string} key
     * @param {Function} fn
     */
    static bind(instance: any, key: string, fn?: Function): void;
    /**
     *
     * @param instance
     * @param {string} keys
     */
    static bindAll(instance: any, ...keys: string[]): void;
}
