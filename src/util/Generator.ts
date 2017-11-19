import "../prototype";

export default class Generator {
    /**
     * Generates 4 digit to generate a part of guid
     * @return {string}
     */
    public static s4(): string {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };

    /**
     * A universally unique identifier (UUID) is a 128-bit number used to identify information in computer systems.
     * Microsoft uses the term globally unique identifier (GUID), either as a synonym for UUID or to refer to a particular UUID variant.
     * @return {string}
     */
    public static guid(): string {
        const s = Generator.s4;
        return `${s()}${s()}-${s()}-${s()}-${s()}-${s()}${s()}${s()}`;
    }
}
