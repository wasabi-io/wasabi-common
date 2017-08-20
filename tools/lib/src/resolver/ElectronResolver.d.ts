import IResolver from "./IResolver";
export default class ElectronResolver implements IResolver {
    private ModuleClass;
    private originalResolver;
    constructor();
    apply(resolve: (path: string) => any): void;
    private resolve(request, parent, isMain);
}
