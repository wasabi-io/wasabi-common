import {default as Objects, Props} from "../types/Objects";
import Validations from "../util/Validations";
import {has} from "../util";

export default class Tree {
    private map: Props;

    public constructor(map?: Props | Tree) {
        this.map = Tree.getMap(map) || {};
    }

    public static allKeys(...keys: string[]) {
        let allKeys: string[] = [];
        let firstKey: string;
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            if (!key) continue;
            let innerKeys = key.split("\.");
            if (innerKeys.length > 1) {
                allKeys = allKeys.concat(innerKeys);
            } else {
                allKeys.push(key);
            }
        }
        return allKeys;
    }

    public static getMap(map?: Props | Tree): Props {
        return map instanceof Tree ? map.map : map;
    }

    public put(key: string, value: any): any {
        let keys = key.split("\.");
        let lastKey = keys.splice(-1, 1)[0];
        let parent = this.map;
        let firstKey: string;
        while (firstKey = keys.shift()) {
            if (!Validations.isObject(parent[firstKey])) {
                parent[firstKey] = {};
            }
            parent = parent[firstKey];
        }
        parent[lastKey] = value;
        return value;
    }

    public putAll(map?: Props | Tree) {
        let childMap = Tree.getMap(map);
        this.map = Objects.merge(childMap, this.map);
    }

    public get<T>(...keys: string[]): T {
        let allKeys = Tree.allKeys.apply(Tree, keys);
        let parent = this.map;
        let firstKey: string;
        while (firstKey = allKeys.shift()) {
            parent = parent[firstKey];
            if (!parent) {
                return parent as T;
            }
        }
        return parent as T;
    }

    public tree(...keys: string[]): Tree {
        return new Tree(this.get.apply(this, keys));
    }

    public remove<T>(...keys: string[]): boolean {
        let allKeys = Tree.allKeys.apply(Tree, keys);
        let lastKey = allKeys.splice(-1, 1)[0];
        let firstKey: string;
        let parent = this.map;
        while (firstKey = allKeys.shift()) {
            parent = parent[firstKey];
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

    protected getValue<T>(keys: string[]): T {
        let parent = this.map;
        let firstKey: string;
        while (firstKey = keys.shift()) {
            parent = parent[firstKey];
            if (!parent) {
                return parent as T;
            }
        }
        return parent as T;
    }
}
