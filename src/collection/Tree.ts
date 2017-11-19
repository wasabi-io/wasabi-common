import {default as Objects} from "../types/Objects";
import {has} from "../util";
import Validations from "../util/Validations";

export interface TreeProps<V> {
    [key: string]: V | TreeProps<V>;
}

export default class Tree<V = any> {

    public static allKeys(...keys: string[]) {
        let allKeys: string[] = [];
        for (const key of keys) {
            if (!key) {
                continue;
            }
            const innerKeys = key.split("\.");
            if (innerKeys.length > 1) {
                allKeys = allKeys.concat(innerKeys);
            } else {
                allKeys.push(key);
            }
        }
        return allKeys;
    }

    public static getMap<V>(map?: TreeProps<V> | Tree<V>): TreeProps<V> {
        return map instanceof Tree ? map.map : map;
    }

    private map: TreeProps<V>;

    public constructor(map?: TreeProps<V> | Tree<V>) {
        this.map = Tree.getMap(map) || {};
    }

    public put(key: string, value: V | TreeProps<V>): any {
        const keys = key.split("\.");
        const lastKey = keys.splice(-1, 1)[0];
        let parent = this.map;
        let firstKey: string;

        while (firstKey = keys.shift()) {
            if (!Validations.isObject(parent[firstKey])) {
                parent[firstKey] = {};
            }
            parent = parent[firstKey] as TreeProps<V>;
        }
        parent[lastKey] = value;
        return value;
    }

    public putAll(map?: TreeProps<V> | Tree<V>) {
        const childMap = Tree.getMap(map);
        this.map = Objects.merge(childMap, this.map);
    }

    public get(...keys: string[]): V | TreeProps<V> {
        const allKeys = Tree.allKeys.apply(Tree, keys);
        let parent = this.map;
        let firstKey: string;
        while (firstKey = allKeys.shift()) {
            parent = parent[firstKey] as TreeProps<V>;
            if (!parent) {
                return parent;
            }
        }
        return parent as V | TreeProps<V>;
    }

    public tree(...keys: string[]): Tree<V> {
        return new Tree(this.get.apply(this, keys));
    }

    public remove(...keys: string[]): boolean {
        const allKeys = Tree.allKeys.apply(Tree, keys);
        const lastKey = allKeys.splice(-1, 1)[0];
        let firstKey: string;
        let parent = this.map;
        while (firstKey = allKeys.shift()) {
            parent = parent[firstKey] as TreeProps<V>;
            if (!parent) {
                return false;
            }
        }

        if (!has(parent[lastKey])) {
            return false;
        }
        delete parent[lastKey];
        return true;
    }

    public clear() {
        this.map = {};
    }

    public length() {
        return Objects.getLength(this.map);
    }

    public value(...keys: string[]): V {
        return this.get.apply(this, keys);
    }
}
