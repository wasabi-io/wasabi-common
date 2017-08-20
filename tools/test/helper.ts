import Resolver from "../../src/resolver";

Resolver
    .electron()
    .root("src")
    .alias("wasabi-common/lib/*", "./")
    .apply();

import { expect } from 'chai';
import { spy } from 'sinon';

(global as any).expect = expect;
(global as any).spy = spy;

