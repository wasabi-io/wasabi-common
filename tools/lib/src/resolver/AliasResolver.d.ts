export interface AliasEntry {
    pattern: RegExp;
    ends: boolean;
    paths: string[];
}
export declare class AliasResolver {
    private aliases;
    has(): boolean;
    add(alias: string, ...paths: string[]): void;
    resolve(requestPath: string): string[];
    static escapeRegExp(str: string): string;
}
declare const aliasResolver: AliasResolver;
export default aliasResolver;
