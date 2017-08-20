const {join} = require("path");

export interface AliasEntry {
    pattern: RegExp,
    ends: boolean,
    paths: string[]
}

export class AliasResolver {
    private aliases: AliasEntry[] = [];

    public has(): boolean {
        return this.aliases.length > 0;
    }

    public add(alias: string, ...paths: string[]) {
        let pattern;
        let ends;
        if (alias.substring(alias.length - 1) !== "*") {
            pattern = new RegExp(`^${AliasResolver.escapeRegExp(alias)}$`);
            ends = false;
        } else {
            pattern = new RegExp(`^${AliasResolver.escapeRegExp(alias.substring(0, alias.length - 1))}(.*)`);
            ends = true;
        }
        this.aliases.push({
            pattern,
            ends,
            paths
        });
    }

    public resolve(requestPath: string): string[] {
        for (let i = 0; i < this.aliases.length; i++) {
            let alias: AliasEntry = this.aliases[i];
            let match = requestPath.match(alias.pattern);
            if (match) {
                if (match.length == 1) {
                    return alias.paths;
                } else if (match.length == 2) {
                    let newPaths = [];
                    for (let i = 0; i < alias.paths.length; i++) {
                        newPaths.push(join(alias.paths[i], match[1]));
                    }
                    return newPaths;
                }
            }
        }
        return undefined;
    }

    public static escapeRegExp(str: string) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }
}

const aliasResolver = new AliasResolver();
export default aliasResolver;