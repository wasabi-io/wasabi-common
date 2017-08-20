import {resolve} from "path";
import IResolver from "./IResolver";
import ElectronResolver from "./ElectronResolver";
import {AliasResolver} from "./AliasResolver";
import Binder from "../lang/Binder";

export class Builder {
    private rootKeys: string[] = [];
    private roots: string[] = [];
    private aliasResolver: AliasResolver;
    private resolver: IResolver;

    public constructor(resolver: IResolver) {
        this.resolver = resolver;
        this.aliasResolver = new AliasResolver();
        this.rootKeys.push("./");
        this.roots.push(resolve("./"));
        Binder.bindAll(this);
    }

    public root(path: string): Builder {
        if (this.rootKeys.indexOf(path) == -1) {
            this.rootKeys.push(path);
            this.roots.push(resolve(path));
        }
        return this;
    }

    public alias(alias: string, ...refs: string[]): Builder {
        this.aliasResolver.add.apply(this.aliasResolver, [alias].concat(refs))
        return this;
    }

    public resolve(request: string) {
        let paths = [request];
        if (this.aliasResolver.has()) {
            let aliasesPaths = this.aliasResolver.resolve(request);
            if (aliasesPaths) {
                paths = aliasesPaths.concat(paths);
            }
        }
        let allPaths = [];
        for (let p in paths) {
            for (let r in this.roots) {
                let joinPath = resolve(this.roots[r], paths[p]);
                allPaths.push(joinPath);
            }
        }
        return allPaths;
    }

    public apply() {
        this.resolver.apply(this.resolve);
    }
}

export default class Resolver {
    public static electron(): Builder {
        return new Builder(new ElectronResolver());
    }
}