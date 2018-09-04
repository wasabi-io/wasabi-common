import {Props} from "./Objects";
import {has} from "../util/Functions";

export interface ArrayMapEvents<T> {
    onCreated?: (index: number, key: any, value: T) => any;
    onUpdated?: (index: number, key: any, value: T, oldValue: T) => any;
    onDeleted?: (index: number, key: any, value: T) => any;
}

export interface ArrayMapProps<T extends Props<any> = Props<any>> {
    key?: string;
    keys?: string[];
    data?: T[];
    events?: ArrayMapEvents<T>;
    newMap?: () => Props<any>;
}

export default class ArrayMap<T extends Props<any> = Props<any>> {
    public static readonly defaultKey = "id";
    private _data: T[] = [];
    private dataMap: Props<number>;
    private _alias: string;
    private _key: string;
    private _keys: string[];
    private _events: ArrayMapEvents<T>;
    private newMap: () => Props<any>;
    public constructor(props?: ArrayMapProps<T>) {
        const p = props || {};
        this.newMap = p.newMap || (() => Object.create({}));
        this.dataMap = this.newMap();
        this._events = p.events || {};
        if (this._key || !this._keys) {
            this._key = p.key || ArrayMap.defaultKey;
            this._alias = this._key;
        } else {
            this._keys = p.keys;
            this._alias = this._keys.join(".");
        }
        if (p.data) {
            this.push.apply(this, p.data);
        }
    }

    public get nameOfKey() {
        return this._alias;
    }

    public push(...items: T[]): number {
        for (const item of items) {
            this.last = item;
        }
        return this.data.length;
    }

    public key(value: T | number) {
        let item = typeof value === "number" ? this.data[value] : value;
        if (!item) return;
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
        if (this.data.length > 0) {
            return this.remove(this.data.length - 1);
        }
        return;
    }

    /**
     * Combines two or more arrays.
     * @param items Additional items to add to the end of array1.
     */
    public concat(...items: (ArrayMap<T> | T[])[]): ArrayMap<T> {
        const newArrayMap = this.clone();
        for (const itemArray of items) {
            newArrayMap.push.apply(
                newArrayMap,
                itemArray instanceof Array ? itemArray : itemArray._data
            );
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
        for (let i = 0; i < this.data.length - 1; i = i + 1) {
            result = `${result}${findElement(this.data[i])}${delimiter}`;
        }
        if (this.data.length > 0) {
            result = `${result}${findElement(this.data[this.data.length - 1])}${delimiter}`;
        }
        return result;
    }

    /**
     * Reverses the elements in an Array.
     */
    public reverse(): ArrayMap<T> {
        return this.clone(this._data.reverse());
    }

    /**
     * Removes the first element from an array and returns it.
     */
    public shift(): T {
        if (this._data.length > 0) {
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
        const newArrayMap = this.clone();
        newArrayMap.push.apply(this, this._data.slice(start, end));
        return newArrayMap;
    }

    /**
     * Sorts an array.
     * @param compareFn The name of the function used to determine the order of the elements. If omitted, the elements are sorted in ascending, ASCII character order.
     */
    public sort(compareFn?: (a: T, b: T) => number): ArrayMap<T> | any {
        return this.clone(this._data.sort(compareFn));
    }

    /**
     * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
     * @param start The zero-based location in the array from which to start removing elements.
     * @param deleteCount The number of elements to remove.
     */
    public splice(start: number, deleteCount?: number): ArrayMap<T> {
        const items = this.clone(this._data.splice(start, deleteCount));
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
        return this.data.length;
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
        this.upsert(item, this.data.length, (item: T) => this.data.push(item) - 1);
    }

    private remove(value: number | string | T) {
        let foundIndex;
        if (!has(value)) {
            return;
        }
        if (typeof value === "number") {
            foundIndex = value;
        } else {
            foundIndex = this.indexOf(value);
        }
        if (!has(foundIndex) || foundIndex === -1) return;
        const key = this.key(foundIndex);
        const item = this.data[foundIndex];
        this.data.splice(foundIndex, 1);
        this.onDeleted(foundIndex, key, item);
        return item;
    }

    private upsert(item: T, lastIndex: number, fn: (item: T) => number) {
        const key = this.assertKey(item);
        let index = this.dataMap[key];
        if (has(index)) {
            return this.set(index, item);
        }
        index = fn.call(undefined, item);
        this.onCreated(index, key, item);
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
        this.dataMap = this.newMap();
        for (let i = 0; i < this.data.length; i = i + 1) {
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

    public onCreated(index: number, key: any, value: T) {
        this.dataMap[key] = index;
        if (this._events.onCreated) {
            this._events.onCreated(index, key, value);
        }
    }

    public onUpdated(index: number, key: any, value: T, oldValue: T) {
        this.dataMap[key] = index;
        if (this._events.onUpdated) {
            this._events.onUpdated(index, key, value, oldValue);
        }
    }

    public onDeleted(index: number, key: any, value: T) {
        delete this.dataMap[key];
        if (this._events.onDeleted) {
            this._events.onDeleted(index, key, value);
        }
    }

    public clone(data?: T[]): ArrayMap<T> {
        return new ArrayMap<T>({
            key: this._key,
            keys: this._keys ? this._keys.slice(0) : undefined,
            data : data || this._data,
            newMap: this.newMap,
            events: Object.create(this._events)
        });
    }
}
