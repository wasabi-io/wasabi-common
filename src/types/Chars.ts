export default class Chars {
    /**
     *  check charcode is number or not.
     * @param c
     * @return {boolean}
     */
    static isNumber(c: number): boolean {
        return c > 47 && c < 58;
    }
    /**
     *  check charcode is number or not.
     * @param c
     * @return {boolean}
     */
    static isDot(c: number): boolean {
        return c === 46;
    }
    /**
     *  check charcode is number or not.
     * @param c
     * @return {boolean}
     */
    static isSemiColon(c: number): boolean {
        return c === 44;
    }

    /**
     *
     * @param c
     * @return {boolean}
     */
    static isDecimal(c: number) {
        return this.isNumber(c) || this.isDot(c) || this.isSemiColon(c);
    }

    /**
     *
     * @param c
     * @return {string}
     */
    static toString(c: number): string {
        return String.fromCharCode(c);
    }
}
