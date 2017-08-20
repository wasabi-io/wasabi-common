export default class Iterator<E> {
    private array: Array<E>;

    public constructor(array: Array<E>) {
        this.array = array.slice(0);
    }

    /**
     * Returns {@code true} if the iteration has more elements.
     * (In other words, returns {@code true} if {@link #next} would
     * return an element rather than throwing an exception.)
     *
     * @return {@code true} if the iteration has more elements
     */
    public hasNext(): boolean {
        return this.array.length > 0;
    }

    /**
     * Returns the next element in the iteration.
     */
    public next(): E {
        return this.array.shift();
    }

    /**
     *
     * @param {(element: E) => any} callback
     */
    public forEachRemaining(callback: (element: E) => any) {
        while (this.hasNext()) callback(this.next());
    }
}