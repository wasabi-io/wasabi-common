import {Props} from "../types";
import {has} from "./Functions";
import Arrays from "../types/Arrays";

export interface ParsedHash {
    paths: string[];
    queries: Props<string>;
}

export default class UrlUtil {
    public static getLocation(href: string) {
        const link = document.createElement("a");
        link.href = href;
        return link.hostname;
    }

    public static join(...parts: string[]) {
        return UrlUtil.normalize(parts.slice(0));
    }

    public static joinWithQueries(queries: Props<any>, ...parts: string[]) {
        return UrlUtil.normalize(parts.slice(0), queries);
    }

    public static isValidURL(value: string) {
        try {
            new URL(value);
            return true;
        } catch (_) {
            return false;
        }
    }

    public static normalize(parts: string[], queries?: Props<any>) {
        const resultArray = [];
        const paths = [];
        let queryPart = "";
        if (queries != null) {
            const queryParts = [];
            for (const key in queries) {
                if (queries.hasOwnProperty(key)) {
                    const query = queries[key];
                    if (has(query)) {
                        queryParts.push(`${queryPart}${key}=${query.toString()}`);
                    }
                }
            }
            if (queryParts.length > 0) {
                queryPart = queryParts.join("&");
            }
        }

        let hasQuerySign = false;

        while (parts.length > 0) {
            const part = parts.pop();
            if (part) {
                if (queryPart && hasQuerySign === false && part.indexOf("?") !== -1) {
                    hasQuerySign = true;
                }
                paths.unshift(part);
                if (UrlUtil.isValidURL(part)) {
                    break;
                }
            }
        }

        if (queryPart) {
            paths.push(hasQuerySign ? queryPart : `?${queryPart}`);
        }

        // There must be two or three slashes in the file protocol, two slashes in anything else.
        if (paths[0].match(/^file:\/\/\//)) {
            paths[0] = paths[0].replace(/^([^/:]+):\/*/, '$1:///');
        } else {
            paths[0] = paths[0].replace(/^([^/:]+):\/*/, '$1://');
        }

        for (let i = 0; i < paths.length; i = i + 1) {
            let path = paths[i];

            if (i > 0) {
                // Removing the starting slashes for each component but the first.
                path = path.replace(/^[\/]+/, '');
            }
            if (i < paths.length - 1) {
                // Removing the ending slashes for each component but the last.
                path = path.replace(/[\/]+$/, '');
            } else {
                // For the last component we will combine multiple slashes to a single one.
                path = path.replace(/[\/]+$/, '/');
            }

            resultArray.push(path);

        }

        let str = resultArray.join('/');
        // Each input component is now separated by a single slash except the possible first plain protocol part.

        // remove trailing slash before parameters or hash
        str = str.replace(/\/(\?|&|#[^!])/g, '$1');

        // replace ? in parameters with &
        const sections = str.split('?');
        str = sections.shift() + (sections.length > 0 ? '?' : '') + sections.join('&');
        return str;
    }

    public static parseHash(locationHash: string): ParsedHash {
        const hash = (locationHash || "#/").substring(1);

        const startIndex = hash.indexOf("?");
        const endIndex = startIndex + 1;
        const pathPart = startIndex !== -1 ? hash.substring(1, startIndex) : hash;
        const queryPart = hash.length > endIndex ? hash.substring(endIndex) : "";

        let paths = pathPart.split("/").filter((path: string) => has(path));
        paths = Arrays.removeValue(paths, "");

        const queries = UrlUtil.parseQueries(queryPart);
        return {
            paths,
            queries
        };
    }

    public static parseQueries(query: string) {
        const result: Props<string> = {};
        if (!query) return result;
        query.split('&').forEach((item) => {
            if (item) {
                const startIndex = item.indexOf('=');
                const endIndex = startIndex + 1;
                const key = startIndex !== -1 ? item.substring(1, startIndex) : item;
                result[key] = startIndex !== -1 ? item.length > endIndex ? item.substring(endIndex) : "" : "";
            }
            return result;
        });
        return result;
    }
}
