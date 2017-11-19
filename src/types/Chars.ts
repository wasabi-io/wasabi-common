export default class Chars {
    /**
     *  check charcode is number or not.
     * @param c
     * @return {boolean}
     */
    public static isNumber(c: number): boolean {
        return c > 47 && c < 58;
    }

    /**
     *  check charcode is number or not.
     * @param c
     * @return {boolean}
     */
    public static isDot(c: number): boolean {
        return c === 46;
    }

    /**
     *  check charcode is number or not.
     * @param c
     * @return {boolean}
     */
    public static isSemiColon(c: number): boolean {
        return c === 44;
    }

    /**
     *
     * @param c
     * @return {boolean}
     */
    public static isDecimal(c: number) {
        return this.isNumber(c) || this.isDot(c) || this.isSemiColon(c);
    }

    /**
     *
     * @param c
     * @return {string}
     */
    public static toString(c: number): string {
        return String.fromCharCode(c);
    }
}
