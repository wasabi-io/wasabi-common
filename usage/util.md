## util

 - [Validations](https://wasabi-io.github.io/wasabi-common/modules/_util_validations_): 
 It used for validations.
 - [Assertions](https://wasabi-io.github.io/wasabi-common/modules/_util_assertions_.html): 
 It used for assertions.
 - [Generator](https://wasabi-io.github.io/wasabi-common/modules/_util_generator_.html): 
 Provides to generate some used values like **guid**.
 - [Properties](https://wasabi-io.github.io/wasabi-common/modules/_util_properties_.html): 
 Provides to hold properties (key and value or keys and value) and provides some operation on property like add, get, merge.
 - [Functions](https://wasabi-io.github.io/wasabi-common/modules/_util_functions_.html): 
 Provides some useful methods (getType, has, requireEs6)
 - [Resolver](https://wasabi-io.github.io/wasabi-common/modules/_util_resolver_.html): 
 Provides add module paths to the resolver.
 - [Types](https://wasabi-io.github.io/wasabi-common/modules/_util_types_.html): 
 Provides some operations on any types and defined some standard types in it. (Number, Boolean, Array, String, Date, RegExp: , Null, Function, Undefined, Object)

* Usage [Assertions](https://wasabi-io.github.io/wasabi-common/modules/_util_assertions_.html)

```typescript
import { Assertions } from "wasabi-common";
let value1 = "5";
let value2 = "example";
Assertions.equals(value1, value2); // false
Assertions.hasNot(value1); // false
Assertions.has(value1); // true
Assertions.isArray(value1); // false
Assertions.isBoolean(value1); // false
Assertions.isDate(value1); // false
Assertions.isFunction(value1); // false
Assertions.isJsonType(value1); // true
Assertions.isNativeType(value1); // true
Assertions.isPrimitive(value1); // true
Assertions.isNull(value1); // false
Assertions.isObject(value1); // false
Assertions.isNumber(value1); // false
Assertions.isRegExp(value1); // false
Assertions.isUndefined(value1); // false
Assertions.isString(value1); // true
```

* Usage [Functions](https://wasabi-io.github.io/wasabi-common/modules/_util_functions_.html)

```typescript
import { has, asEs6Module, getType, getOrDefault } from "wasabi-common";
has(null); // false
has(undefined); // false
has(""); // true
has({}); // true
getType(""); // String
getOrDefault(null, ""); // ""
getOrDefault(null, 3); // 3
getOrDefault(null, "test"); // "test"
getOrDefault(undefined, ""); // ""
getOrDefault(undefined, 3); // 3
getOrDefault(undefined, "test"); // "test"

```

* Usage [Resolver](https://wasabi-io.github.io/wasabi-common/modules/_util_resolver_.html)

```typescript
import { addModule } from "wasabi-common/lib/util/Resolver";

addModule("src");
```

* Usage <a name="Types"></a>[Types](https://wasabi-io.github.io/wasabi-common/modules/_util_types_.html)

```typescript
import { Types } from "wasabi-common";
let value1 = "5";
let value2 = "example";
Types.equals(value1, value2); // false
Types.getType(value1); // String Type Instance
Types.getClone(value1); // "5"
Types.getName(value1); // String
Types.getRawName(value1); // [object String]
Types.getSize(value1); // 1    
Types.getTypeByName(value1); // String
)```

