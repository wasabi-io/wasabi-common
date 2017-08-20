"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var resolver_1 = require("../../src/resolver");
resolver_1.default
    .electron()
    .root("src")
    .alias("wasabi-common/lib/*", "./")
    .apply();
var chai_1 = require("chai");
var sinon_1 = require("sinon");
global.expect = chai_1.expect;
global.spy = sinon_1.spy;
