import {default as Objects, Props} from "./Objects";
import {has} from "../util/Functions";
import Binder from "../lang/Binder";
import Arrays from "./Arrays";

export interface ArrayMapEvents<T> {
    onInit?: (data: T[]) => any;
    onCreated?: (index: number, key: any, value: T) => any;
    onUpdated?: (index: number, key: any, value: T, oldValue: T) => any;
    onDeleted?: (value: T[]) => any;
}

export interface ArrayMapGetKey<T> {
    (item: T): string;
}

export interface ArrayMapProps<T extends Props<any> = Props<any>> {
    key?: string;
    keys?: string[];
    data?: T[];
    events?: ArrayMapEvents<T>;
    newMap?: () => Props<any>;
    getKey?: ArrayMapGetKey<T>;
}

export interface ArrayMapGetItem<T> {
    (item: T, index?: number): string;
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
    private _getKey: ArrayMapGetKey<T>;

    public constructor(props?: ArrayMapProps<T>) {
        const p = props || {};
        this.newMap = p.newMap || (() => Object.create({}));
        this.dataMap = this.newMap();
        this._events = p.events || {};
        Binder.bindAll(this);
        this._getKey = p.getKey;
        if (p.getKey) {
            this.getKey = p.getKey;
        }
        if (p.key || !p.keys) {
            this._key = p.key || ArrayMap.defaultKey;
            this._alias = this._key;
        } else {
            this._keys = p.keys;
            this._alias = this._keys.join(".");
        }
        if (p.data) {
            this.data = p.data;
        }
    }

    public push(...items: (T | T[])[]): number {
        for (const item of items) {
            if (item) {
                if (item instanceof Array) {
                    this.push.apply(this, item);
                } else {
                    this.last = item;
                }
            }
        }
        return this._data.length;
    }

    /**
     * Removes the last element from an array and returns it.
     */
    public pop(): T {
        if (this._data.length > 0) {
            return this.remove(this._data.length - 1);
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
    public join(separator: string, get?: (item: T, index?: number) => string): string {
        const findElement: ArrayMapGetItem<T> = get ? get : this.key;
        const delimiter = separator ? separator : "";
        let result = "";
        const lastIndex = this._data.length - 1;
        for (let i = 0; i < lastIndex; i = i + 1) {
            result = `${result}${findElement(this._data[i], i)}${delimiter}`;
        }
        if (this._data.length > 0) {
            result = `${result}${findElement(this._data[lastIndex], lastIndex)}`;
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
        return this.clone(this._data.slice(start, end));
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
    public splice(start: number, deleteCount?: number): ArrayMap<T> | undefined {
        const items = this._data.splice(start, deleteCount);
        if (!Arrays.has(items)) {
            return;
        }
        const array = this.clone(items);
        for (const item of items) {
            const key = this.key(item);
            delete this.dataMap[key];
        }
        this.onDeleted(items);
        return array;
    }

    /**
     * Inserts new elements at the start of an array.
     * @param items  Elements to insert at the start of the Array.
     */
    public unshift(...items: (T | T[])[]): number {
        for (let i = items.length - 1; i >= 0; i = i - 1) {
            const item = items[i];
            if (item) {
                if (item instanceof Array) {
                    this.unshift.apply(this, item);
                } else {
                    this.first = item;
                }
            }
        }
        return this._data.length;
    }

    public get first(): T {
        if (this._data.length > 0) {
            return this._data[0];
        }
    }

    public set first(item: T) {
        this.upsert(item, (item: T) => this._data.unshift(item));
    }

    public get last(): T {
        if (this._data.length > 0) {
            return this.data[this._data.length - 1];
        }
    }

    public set last(item: T) {
        this.upsert(item, (item: T) => this.data.push(item) - 1);
    }

    private upsert(item: T, fn: (item: T) => number) {
        const key: string = ArrayMap.assertKey(this, item);
        let index = this.dataMap[key];
        if (has(index)) {
            this.remove(index);
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
        if (!searchElement) return -1;
        const key = typeof searchElement === "string" ? searchElement : this.key(searchElement);
        if (has(key)) {
            const ind = this.dataMap[key];
            return has(ind) ? ind : -1;
        }
        return Arrays.indexOf(this._data, searchElement as T, fromIndex);
    }

    /**
     * Returns the index of the last occurrence of a specified value in an array.
     * @param searchElement The value to locate in the array.
     * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at the last index in the array.
     */
    public lastIndexOf(searchElement: T | string, fromIndex?: number): number {
        if (!searchElement) return -1;
        const key = typeof searchElement === "string" ? searchElement : this.key(searchElement);
        if (has(key)) {
            const ind = this.dataMap[key];
            return has(ind) ? ind : -1;
        }
        return Arrays.lastIndexOf(this._data, searchElement as T, fromIndex);
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
        this.data[ind] = Objects.replace(value, oldValue);
        this.onUpdated(ind, valueKey, value, oldValue);
        return true;
    }

    public setKey(key: string, item: T): T {
       return ArrayMap.setKey(this, key, item);
    }

    public get(key: number | string): T {
        const ind = typeof key === "string" ? this.dataMap[key] : key;
        if (ind != null) {
            return this.data[ind];
        }
    }

    public removeByIndex(value: number): T | undefined {
        return ArrayMap.removeByIndex(this, value);
    }

    public removeByKey(value: string) {
        return this.removeByIndex(this.dataMap[value]);
    }

    public remove(value: number | string | T): T | undefined {
        return ArrayMap.remove(this, value);
    }

    public key(value: T | number): string {
        const item: T = typeof value === "number" ? this.data[value] : value;
        return this.getKey(item);
    }

    public getKey(item: T): string {
        return ArrayMap.getKey(this, item);
    }

    public get nameOfKey() {
        return this._alias;
    }

    public get data() {
        return this._data;
    }

    public set data(data: T[]) {
        this.dataMap = {};
        this._data = [];
        if (data) {
            for (let i = 0; i < data.length; i = i + 1) {
                const item = data[i];
                const key = ArrayMap.assertKey(this, item);
                if (!has(this.dataMap[key])) {
                    this._data[i] = item;
                    this.dataMap[key] = i;
                }
            }
        }
        this.onInit(this._data);
    }

    public onInit(data: T[]) {
        if (this._events.onInit) {
            this._events.onInit(data);
        }
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

    public onDeleted(value: T[]) {
        if (this._events.onDeleted) {
            this._events.onDeleted(value);
        }
    }

    public clone(data?: T[]): ArrayMap<T> {
        return new ArrayMap<T>({
            key: this._key,
            keys: this._keys ? this._keys.slice(0) : undefined,
            data: data || this._data,
            newMap: this.newMap,
            events: Object.create(this._events),
            getKey: this._getKey
        });
    }

    public static removeByIndex<T extends Props<any>>(map: ArrayMap<T>, value: number): T | undefined {
        if (!has(value)) {
            return;
        }
        const item = map._data[value];
        if (!item) {
            return;
        }
        map._data.splice(value, 1);
        const key = map.key(item);
        delete map.dataMap[key];
        map.onDeleted([item]);
        return item;
    }

    public static remove<T extends Props<any>>(map: ArrayMap<T>, value: number | string | T): T | undefined {
        if (typeof value === "number") {
            return ArrayMap.removeByIndex(map, value);
        }
        if (typeof  value === "string") {
            return map.removeByKey(value);
        }
        if (has(value)) {
            const key = map.key(value);
            if (key) {
                return map.removeByKey(key);
            }
        }
        return;
    }

    public static setKey<T extends Props<any>>(map: ArrayMap<T>, key: string, item: T): T {
        if (!map._keys) {
            item[map._key] = key;
            return item;
        }
        let i = 0;
        let value = item;
        for (; i < map._keys.length - 1; i = i + 1) {
            const k = map._keys[i];
            let child = value[k];
            if (!has(child)) {
                child = {};
                value[k] = child;
            }
            value = child;
        }
        value[map._keys[i]] = key;
        return item;
    }

    public static getKey<T extends Props<any>>(map: ArrayMap<T>, item: T): string {
        if (!item) return;
        if (!map._keys) {
            return item[map._key];
        }
        let result: any = item;
        for (let i = 0; i < map._keys.length; i = i + 1) {
            result = result[map._keys[i]];
            if (!result) {
                return;
            }
        }
        return result;
    }

    public static assertKey<T extends Props<any>>(map: ArrayMap<T>, item: T | number): string {
        const key = map.key(item);
        if (!key) {
            throw new Error("map key cannot be empty or null !");
        }
        return key;
    }
}
