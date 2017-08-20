import IResolver from "./IResolver";

export default class ElectronResolver implements IResolver {
    private ModuleClass: any;
    private originalResolver: (request: string, parent: any, isMain: boolean) => any;

    public constructor() {
        this.ModuleClass = module.constructor;
        this.originalResolver = this.ModuleClass._resolveFilename;
    }

    public apply(resolve: (path: string) => any) {
        /**
         * change resolver
         * @type resolver
         * @private
         */
        this.ModuleClass._resolveFilename = (request: string, parent: any, isMain: boolean) => {
            try {
                return this.originalResolver(request, parent, isMain);
            } catch (e) {
                let paths = resolve(request);
                if (paths.length > 0) {
                    for (let i = 0; i < paths.length; i++) {
                        let mod = this.resolve(paths[i], parent, isMain);
                        if (!(mod instanceof Error)) {
                            return mod;
                        }
                    }
                }
                throw e;
            }
        };
    };

    private resolve(request: string, parent: any, isMain: boolean) {
        try {
            let mod = this.originalResolver(request, parent, isMain);
            return mod;
        } catch (e) {
            return e;
        }
    }
}
