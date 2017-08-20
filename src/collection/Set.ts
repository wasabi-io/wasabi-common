import Types from "wasabi-common/lib/util/Types";

export default class Set<E = any> {
    private _length: number = 0;
    private _array: Array<E> = [];

    public constructor(array?: Array<E> | Set<E>) {
        this.addAll(array)
    }

    public get length(): number {
        return this._length;
    }

    public get array(): Array<E> {
        return this._array.slice(0);
    }

    public contains(element: E) {
        return this.indexOf(element) > -1;
    }

    public indexOf(element: E): number {
        for (let i = 0; i < this._array.length; i++) {
            if (Types.equals(this._array[i], element)) {
                return i;
            }
        }
        return -1;
    }

    public get(ind: number) {
        return this._array[ind];
    }

    public add(element: E): number {
        this.remove(element);
        this._length++;
        return this._array.push(element);
    }

    public addAll(collection: Set<E> | Array<E>) {
        if (collection instanceof Set) {
            Set.addSet(collection, this);
        } else {
            Set.addArray(collection, this);
        }
    }

    public remove(element: E): boolean {
        let index = this.indexOf(element);
        if (index > -1) {
            this._array.splice(index, 1);
            this._length--;
            return true;
        }
        return false;
    }

    public static addArray<E>(source: Array<E>, destination: Set<E>) {
        for (let i = 0; i < source.length; i++) {
            if (!destination.contains(source[i])) {
                destination.add(source[i]);
            }
        }
    }

    public static addSet<E>(source: Set<E>, destination: Set<E>) {
        for (let i = 0; i < source.length; i++) {
            let element = source.get(i);
            if (!destination.contains(element)) {
                destination.add(element);
            }
        }
    }
}