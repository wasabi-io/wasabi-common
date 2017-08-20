import IResolver from "./IResolver";
export declare class Builder {
    private rootKeys;
    private roots;
    private aliasResolver;
    private resolver;
    constructor(resolver: IResolver);
    root(path: string): Builder;
    alias(alias: string, ...refs: string[]): Builder;
    resolve(request: string): string[];
    apply(): void;
}
export default class Resolver {
    static electron(): Builder;
}
