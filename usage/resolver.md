## resolver

  - [Resolver](https://wasabi-io.github.io/wasabi-common/modules/_resolver_index_.html) :
     Provides to bind all methods of the instance when construct.

##### Usage [Resolver](https://wasabi-io.github.io/wasabi-common/modules/_resolver_index_.html) :
Provides to bind all methods of the instance when construct.

* Usage

```typescript
import Resolver from "wasabi-common/lib/resolver";

Resolver
    .electron()
    .root("src")
    .alias("wasabi-common/lib/*", "./")
    .apply();

```