import UrlUtil from "wasabi-common/lib/util/UrlUtil";
import {expect} from "chai";

/* tslint:disable no-unused-expression */
describe("util/UrlUtil", () => {
    it("getLocation", () => {
        const hostname = UrlUtil.getLocation("http://www.example.com/test?example=value");
        expect(hostname).eq("www.example.com");
    });
    it("join", () => {
        // UrlUtil.join()
    });

    it("normalize", () => {
        // UrlUtil.normalize()
    });
});
