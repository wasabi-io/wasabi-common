import {join} from "path";

export interface AliasEntry {
    pattern: RegExp;
    ends: boolean;
    paths: string[];
}

export class AliasResolver {

    public static escapeRegExp(str: string) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }

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
            ends,
            paths,
            pattern,
        });
    }

    public resolve(requestPath: string): string[] {
        for (const alias of this.aliases) {
            const match = requestPath.match(alias.pattern);
            if (match) {
                if (match.length === 1) {
                    return alias.paths;
                }
                if (match.length === 2) {
                    const newPaths = [];
                    for (const path of alias.paths) {
                        newPaths.push(join(path, match[1]));
                    }
                    return newPaths;
                }
            }
        }
        return undefined;
    }
}

const aliasResolver = new AliasResolver();
export default aliasResolver;
