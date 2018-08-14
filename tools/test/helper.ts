import Resolver from "../../src/resolver";
import Ajax from "../../src/util/ajax/Ajax";
import {expect} from 'chai';
import {spy} from 'sinon';

Resolver
    .electron()
    .root("src")
    .alias("wasabi-common/lib/*", "./")
    .apply();

(global as any).expect = expect;
(global as any).spy = spy;

Ajax.setup({
    baseUrl: "http://localhost:3002"
});
