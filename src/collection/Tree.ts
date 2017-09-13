import {default as Objects} from "../types/Objects";
import Validations from "../util/Validations";
import {has} from "../util";

export interface TreeProps<V> {
    [key: string]: V | TreeProps<V>
}

export default class Tree<V = any> {
    private map: TreeProps<V>;

    public constructor(map?: TreeProps<V> | Tree<V>) {
        this.map = Tree.getMap(map) || {};
    }

    public static allKeys(...keys: string[]) {
        let allKeys: string[] = [];
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

    public static getMap(map?: TreeProps<any> | Tree<any>): TreeProps<any> {
        return map instanceof Tree ? map.map : map;
    }

    public put<S extends V>(key: string, value: V): any {
        let keys = key.split("\.");
        let lastKey = keys.splice(-1, 1)[0];
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

    public putAll<S extends V>(map?: TreeProps<V> | Tree<V>) {
        let childMap = Tree.getMap(map);
        this.map = Objects.merge(childMap, this.map);
    }

    public get<S extends V>(...keys: string[]): S | TreeProps<S> {
        let allKeys = Tree.allKeys.apply(Tree, keys);
        let parent: any = this.map;
        let firstKey: string;
        while (firstKey = allKeys.shift()) {
            parent = parent[firstKey];
            if (!parent) {
                return parent;
            }
        }
        return parent as S | TreeProps<S>;
    }

    public tree<V>(...keys: string[]): Tree<V> {
        return new Tree(this.get.apply(this, keys));
    }

    public remove(...keys: string[]): boolean {
        let allKeys = Tree.allKeys.apply(Tree, keys);
        let lastKey = allKeys.splice(-1, 1)[0];
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
