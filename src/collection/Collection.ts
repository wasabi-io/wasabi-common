
export interface MapItems<V> {
    [key: string]: V
    [key: number]: V
}

export default class Collection {
    /**
     *
     * @param {MapItems<T>} map
     * @param {(value: T, key: K) => U} callback
     * @returns {Array<U>}
     */
    public static map<T, U, K>(list: MapItems<T> | Array<T>, callback: (value: T, key: K) => U ): Array<U> {
        if (Object.prototype.toString.call(list) === "[object Array]" ) {
            return this.mapArray(list as Array<T>, callback);
        }
        return this.mapObject(list as MapItems<T>, callback);
    }
    /**
     *
     * @param {MapItems<T>} map
     * @param {(value: T, key: K) => U} callback
     * @returns {Array<U>}
     */
    public static mapObject<T, U, K>(map: MapItems<T>, callback: (value: T, key: K) => U ): Array<U> {
        let items: Array<U> = [];

        for(let key in map) {
            if(map.hasOwnProperty(key)) {
                let result = callback(map[key], key as any);
                if(result != undefined) {
                    items[items.length] = result as any;
                }
            }
        }
        return items;
    }
    /**
     *
     * @param {MapItems<T>} array
     * @param {(value: T, key: K) => U} callback
     * @returns {Array<U>}
     */
    public static mapArray<T, U, K>(array: Array<T>, callback: (value: T, key: K) => U): Array<U> {
        let items: Array<U> = [];
        if(!array) return items;
        for(let i = 0; i < array.length; i++) {
            let result = callback(array[i], i as any);
            if(result != undefined) {
                items[items.length] = result as any;
            }
        }
        return items;
    }

    /**
     *
     * @param {MapItems<T> | Array<T>} list
     * @param {(value: T, key: K) => (void | boolean)} callback
     * @returns {boolean}
     */
    public static forEach<T, U, K>(list: MapItems<T> | Array<T>, callback: (value: T, key: K) => void | boolean ): boolean {
        if (Object.prototype.toString.call(list) === "[object Array]" ) {
            return this.forEachArray(list as Array<T>, callback);
        }
        return this.forEachObject(list as MapItems<T>, callback);
    }
    /**
     *
     * @param {MapItems<T>} map
     * @param {(value: T, key: K) => U} callback
     * @returns {Array<U>}
     */
    public static forEachObject<T, U, K>(map: MapItems<T>, callback: (value: T, key: K) => boolean | any ): boolean {
        for(let key in map) {
            if(map.hasOwnProperty(key)) {
                if(callback(map[key], key as any) === false) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     *
     * @param {Array<T>} map
     * @param {(value: T, key: K) => (void | boolean)} callback
     * @returns {boolean}
     */
    public static forEachArray<T, U, K>(array: Array<T>, callback: (value: T, key: K) => void | boolean): boolean {
        if(!array) return true;
        for(let i = 0; i < array.length; i++) {
            if(callback(array[i], i as any) === false) {
                return false;
            }
        }
        return true;
    }
}