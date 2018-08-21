import {Props} from "./Objects";

export interface ArrayMapEvents<T> {
    onCreated?: (index: number, key: any, value: T) => any;
    onUpdated?: (index: number, key: any, value: T, oldValue: T) => any;
    onDeleted?: (index: number, key: any, value: T) => any;
}

export default class ArrayMap<T extends Props<any> = Props<any>> {
    private _data: T[] = [];
    private dataMap: Props<number> = {};
    private _alias: string;
    private _key: string;
    private _keys: string[];
    private _events: ArrayMapEvents<T>;

    public constructor(keys: string | string[], items?: T[], events?: ArrayMapEvents<T>) {
        if (typeof keys === "string") {
            this._key = keys;
            this._alias = keys;
        } else if (keys instanceof Array) {
            this._alias = keys.join(".");
            this._keys = keys;
        }
        if (keys instanceof Array) {
            this._keys = keys;
        }
        if (items) {
            for (const item of items) {
                this.push(item);
            }
        }
        this._events = events;
    }

    public get nameOfKey() {
        return this._key;
    }

    public push(...items: T[]): number {
        for (const item of items) {
            this.last = item;
        }
        return this.length;
    }

    public key(value: T | number) {
        let item = typeof value === "number" ? this.data[value] : value;
        if (!this._keys) {
            return item[this._key];
        }
        for (let i = 0; i < this._keys.length; i = i + 1) {
            item = item[this._keys[i]];
            if (!item) {
                return;
            }
        }
        return item;
    }

    public setKey(key: string, value: T) {
        if (!this._keys) {
            value[this._key] = key;
            return value;
        }
        let i = 0;
        for (; i < this._keys.length - 1; i = i + 1) {
            const k = this._keys[i];
            if (!value[k]) {
                value[k] = {};
            }
        }
        value[this._keys[i]] = key;
        return value;
    }

    /**
     * Removes the last element from an array and returns it.
     */
    public pop(): T {
        if (this.length > 0) {
            return this.remove(this.data.length - 1);
        }
        return;
    }

    /**
     * Combines two or more arrays.
     * @param items Additional items to add to the end of array1.
     */
    public concat(...items: T[]): ArrayMap<T> {
        const newArrayMap = this.clone();
        for (const itemArray of items) {
            newArrayMap.push.apply(this, itemArray);
        }
        return newArrayMap;
    }

    /**
     * Adds all the elements of an array separated by the specified separator string.
     * @param separator A string used to separate one element of an array from the next in the resulting String. If omitted, the array elements are separated with a comma.
     * @param get
     */
    public join(separator: string, get?: (item: T) => string): string {
        const findElement = get ? get : this.key;
        const delimiter = separator ? separator : "";
        let result = "";
        for (let i = 0; i < this.length - 1; i = i + 1) {
            result = `${result}${findElement(this.data[i])}${delimiter}`;
        }
        if (this.length > 0) {
            result = `${result}${findElement(this.data[this.data.length - 1])}${delimiter}`;
        }
        return result;
    }

    /**
     * Reverses the elements in an Array.
     */
    public reverse(): ArrayMap<T> {
        const newArrayMap = this.clone([]);
        for (let i = this.length - 1; i >= 0; i = i - 1) {
            newArrayMap.push(this.data[i]);
        }
        return newArrayMap;
    }

    /**
     * Removes the first element from an array and returns it.
     */
    public shift(): T {
        if (this.length > 0) {
            return this.remove(0);
        }
        return;
    }

    /**
     * Returns a section of an array.
     * @param start The beginning of the specified portion of the array.
     * @param end The end of the specified portion of the array.
     */
    public slice(start?: number, end?: number): ArrayMap<T> {
        return this.clone(this.data.slice(start, end));
    }

    /**
     * Sorts an array.
     * @param compareFn The name of the function used to determine the order of the elements. If omitted, the elements are sorted in ascending, ASCII character order.
     */
    public sort(compareFn?: (a: T, b: T) => number): ArrayMap<T> | any {
        return this.clone(this.data.sort(compareFn));
    }

    /**
     * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
     * @param start The zero-based location in the array from which to start removing elements.
     * @param deleteCount The number of elements to remove.
     */
    public splice(start: number, deleteCount?: number): ArrayMap<T> {
        const items = this.clone(this.data.splice(start, deleteCount));
        for (const item of items.data) {
            const key = this.key(item);
            const index = this.dataMap[key];
            this.onDeleted(index, key, item);
        }
        return items;
    }

    /**
     * Inserts new elements at the start of an array.
     * @param items  Elements to insert at the start of the Array.
     */
    public unshift(...items: T[]): number {
        for (let i = items.length - 1; i >= 0; i = i - 1) {
            this.first = items[i];
        }
        return this.length;
    }

    public get first(): T {
        if (this.data.length > 0) {
            return this.data[0];
        }
    }

    public set first(item: T) {
        this.upsert(item, 0, (item: T) => this.data.unshift(item));
    }

    public get last(): T {
        if (this.data.length > 0) {
            return this.data[this.data.length - 1];
        }
    }

    public set last(item: T) {
        this.upsert(item, this.data.length, (item: T) => this.data.push(item));
    }

    private remove(value: number | string | T) {
        let foundIndex;
        if (!value) {
            return;
        }
        if (typeof value === "number") {
            foundIndex = value;
        } else {
            foundIndex = this.indexOf(value);
        }
        if (!foundIndex || foundIndex === -1) return;
        const key = this.key(foundIndex);
        const item = this.data[foundIndex];
        this.data.splice(foundIndex, 1);
        this.onDeleted(foundIndex, key, item);
        return item;
    }

    private upsert(item: T, lastIndex: number, fn: (item: T) => number) {
        const key = this.assertKey(item);
        const index = this.dataMap[key];
        if (index !== -1) {
            return this.set(index, item);
        }
        this.dataMap[key] = lastIndex;
        fn.call(undefined, item);
        this.onAdded(index, key, item);
        return true;
    }

    /**
     * Returns the index of the first occurrence of a value in an array.
     * @param searchElement The value to locate in the array.
     * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at index 0.
     */
    public indexOf(searchElement: T | string, fromIndex?: number): number {
        const key: string = typeof searchElement === "string" ? searchElement : this.key(searchElement);
        return this.dataMap[key] || -1;
    }

    /**
     * Returns the index of the last occurrence of a specified value in an array.
     * @param searchElement The value to locate in the array.
     * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at the last index in the array.
     */
    public lastIndexOf(searchElement: T | string, fromIndex?: number): number {
        const key: string = typeof searchElement === "string" ? searchElement : this.key(searchElement);
        return this.dataMap[key] || -1;
    }

    public get length() {
        return this.data.length;
    }

    public refresh() {
        this.dataMap = {};
        for (let i = 0; i < this.length; i = i + 1) {
            this.dataMap[this.key(this.data[i])] = i;
        }
    }

    public set(key: number | string, value: T): boolean {
        const ind: number = typeof key === "string" ? this.dataMap[key] : key;
        if (!ind) {
            return false;
        }
        const oldValue = this.data[ind];
        const valueKey = this.key(value);
        if (!valueKey) {
            this.setKey(this.key(oldValue), value);
        }
        this.data[ind] = value;
        this.onUpdated(ind, valueKey, value, oldValue);
        return true;
    }

    public get(key: number | string): T {
        const ind = typeof key === "string" ? this.dataMap[key] : key;
        if (ind != null) {
            return this.data[ind];
        }
    }

    public get data() {
        return this._data;
    }

    public assertKey(item: T | number) {
        const key = this.key(item);
        if (!key) {
            throw new Error("map key cannot be empty or null !");
        }
        return key;
    }

    public onAdded(index: number, key: any, value: T) {
        this.dataMap[key] = index;
    }

    public onUpdated(index: number, key: any, value: T, oldValue: T) {
        this.dataMap[key] = index;
    }

    public onDeleted(index: number, key: any, value: T) {
        delete this.dataMap[key];
    }

    public clone(items?: T[]): ArrayMap<T> {
        return new ArrayMap<T>(this._key, items || this.data);
    }
}
