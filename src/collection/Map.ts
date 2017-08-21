import Collection from "./Collection";
import Iterator from "./Iterator";
import {has} from "../util/Functions";

export class Entry<K = string | number, V = any> {
    private _key: K;
    private _value: V;

    public constructor(key: K, value: V) {
        this._key = key;
        this._value = value;
    }

    get key(): K {
        return this._key;
    }

    get value(): V {
        return this._value;
    }
}

export interface MapItems<V> {
    [key: string]: V

    [key: number]: V
}

export default class Map<K extends string | number, V> {
    private _length = 0;
    private _items: MapItems<Entry<K, V>> = {};

    /**
     *
     */
    public constructor(map?: Map<K, V> | MapItems<V> | Array<V>) {
        this._length = 0;
        this.putAll(map);
    }

    /**
     * Returns <tt>true</tt> if this map contains no key-value mappings.
     * @return
     */
    public isEmpty(): boolean {
        return this._length == 0;
    }

    /**
     *
     * @param {K} key
     * @returns {boolean}
     */
    public containsKey(key: K): boolean {
        return this._items.hasOwnProperty(key as any);
    }


    /**
     *
     * @param {V} value
     * @returns {boolean}
     */
    public containsValue(value: V): boolean {
        return !this.forEach((v) => v != value);
    }

    /**
     *
     * @param {K} key
     * @returns {V}
     */
    public get(key: K): V {
        let entry = this._items[key as any];
        return entry ? entry.value : undefined;
    }

    /**
     *
     * @param {K} key
     * @param {V} def
     * @returns {V}
     */
    public getOrDefault(key: K, def: V): V {
        let entry = this._items[key as any];
        if (entry) {
            return entry.value;
        }
        return def;
    }

    /**
     *
     * @param {K} key
     * @param {V} value
     * @returns {V}
     */
    public put(key: K, value: V): V {
        if (!this.containsKey(key)) {
            this._length += 1;
        }
        this._items[key as any] = new Entry(key, value);
        return value;
    }

    private add(key: K, entry: Entry<K, V>) {
        this._length += 1;
        this._items[key as any] = entry;
        return entry.value;
    }

    /**
     *
     * @param {K} key
     * @returns {boolean}
     */
    public remove(key: K): boolean {
        if (this.containsKey(key)) {
            delete this._items[key as any];
            this._length -= 1;
            return true;
        }
        return false;
    }

    /**
     *
     * @param {Map<K, V> | MapItems<V> | Array<V>} map
     */
    public putAll(map: Map<K, V> | MapItems<V> | Array<V>): Array<V> {
        if(!has(map)) return [];
        if(map instanceof Map) {
            return Collection.mapObject(
                map._items, (entry: Entry<K, V>, key: K) => this.put(key as any, entry.value)
            );
        } else if(map instanceof Array) {
            return Collection.mapArray(map, (value: V, key: number) => this.put(key as any, value));
        }
        return Collection.mapObject(map, (value: V, key: string) => this.put(key as any, value));
    }

    /**
     *
     */
    public clear() {
        this._items = {};
        this._length = 0;
    }

    /**
     *
     * @returns {Array<K>}
     */
    public keySet(): Array<K> {
        return Collection.mapObject(
            this._items, (entry: Entry<K, V>, key: K) => entry.key
        );
    }

    /**
     *
     * @returns {Array<V>}
     */
    public values(): Array<V> {
        return Collection.mapObject(
            this._items, (entry: Entry<K, V>) => entry.value
        );
    }

    /**
     *
     * @returns {Array<Entry<K, V>>}
     */
    public entrySet(): Array<Entry<K, V>> {
        return Collection.mapObject(
            this._items, (entry: Entry<K, V>, key: K) => entry
        );
    }

    /**
     *
     * @param {(item: V, key?: K) => boolean} callback
     * @returns {boolean}
     */
    public forEach<T = string | number>(callback: (item: V, key?: K) => void | boolean): boolean {
        return Collection.forEachObject(this._items, (entry: Entry<K, V>, key: K) => {
            return callback(entry.value, entry.key);
        });
    }

    /**
     *
     * @param {(item: V, key?: K, obj?: V) => T} callback
     * @returns {Array<T>}
     */
    public map<U>(callback: (value: V, key: K) => U): Array<U> {
        return Collection.mapObject(this._items, (entry: Entry<K, V>, key: K) => {
            return callback(entry.value, entry.key);
        });
    }

    /**
     *  Returns the number of key-value mappings in this map.
     * @returns {number}map
     */
    get length(): number {
        return this._length;
    }

    /**
     *
     * @param {(entry: Entry<K, V>) => boolean} predicate
     * @returns {Map<K extends string | number, V>}
     */
    public filter<U>(predicate: (entry: Entry<K, V>) => boolean): Map<K, V> {
        let map: Map<K, V> = new Map<K, V>();
        Collection.forEachObject(this._items, (entry: Entry<K, V>, key: K) => {
            if (predicate(entry)) map.add(key, entry);
            return true;
        });
        return map;
    }

    public iterator(): Iterator<Entry<K, V>> {
        return new Iterator(this.entrySet());
    }
}
