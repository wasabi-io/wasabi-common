## wasabi-common

[![npm package](https://badge.fury.io/gh/kbukum%2Fwasabi-common.svg)](https://badge.fury.io/gh/kbukum%2Fwasabi-common.svg)
[![Build Status](https://travis-ci.org/kbukum/wasabi-common.svg?branch=master)](https://travis-ci.org/kbukum/wasabi-common)
[![codecov](https://codecov.io/gh/kbukum/wasabi-common/branch/master/graph/badge.svg)](https://codecov.io/gh/kbukum/wasabi-common)

#### Motivation

Provides some common operations.

#### Common Classes

* lang
    - [Class](https://kbukum.github.io/wasabi-common/modules/_lang_class_.html) : Provides to bind all methods of the instance when construct. 
    - [PropClass](https://kbukum.github.io/wasabi-common/modules/_lang_propclass_.html) : Provides to merge props and defaultProps when construct.
    - [Type](https://kbukum.github.io/wasabi-common/modules/_lang_type_.html): Provides define new Type by some default methods.
    It is useful when cloning or merging. (isEmpty, isPrimitive, isJsonType, isNativeType, getClone, getName, getSize, equals)
      
* types
    - [Arrays](https://kbukum.github.io/wasabi-common/modules/_types_arrays_.html): Provides some operation on Array type
    - [Objects](https://kbukum.github.io/wasabi-common/modules/_types_objects_.html): Provides some operation on Object type
    - [Strings](https://kbukum.github.io/wasabi-common/modules/_types_strings_.html): : Provides some operation on String type

* util
    - [Validations](https://kbukum.github.io/wasabi-common/modules/_util_validations_): It used for validations.
    - [Assertions](https://kbukum.github.io/wasabi-common/modules/_util_assertions_.html): It used for assertions.
    - [Functions](https://kbukum.github.io/wasabi-common/modules/_util_functions_.html): Provides some useful methods (getType, has, requireEs6)
    - [Resolver](https://kbukum.github.io/wasabi-common/modules/_util_resolver_.html): Provides add module paths to the resolver.
    - [Types](https://kbukum.github.io/wasabi-common/modules/_util_types_.html): Provides some operations on any types.
    and defined some standard types in it. (Number, Boolean, Array, String, Date, RegExp: , Null, Function, Undefined, Object)

#### Usage

```ssh
npm install wasabi-common --save
```

* Usage [Class](https://kbukum.github.io/wasabi-common/modules/_lang_class_.html)

```typescript
import { Class } from "wasabi-common"

export default class MyClass extends Class {
    constructor(props) {
        super(props)
    }
    
    // exampleMethod will bind when MyClass construct
    exampleMethod(){
        
    }
}

```

* Usage [PropClass](https://kbukum.github.io/wasabi-common/modules/_lang_propclass_.html)

```typescript
import { PropClass } from "wasabi-common"

export default class MyClass extends PropClass {
    props;
    static defaultProps = {
        example: {
            x: 5
        }
    }
    constructor(props) {
        super(props)
    }
    
    // exampleMethod will bind when MyClass construct
    exampleMethod(){
        
    }
}

let myClass = new MyClass({
    example: {
        y: 5
    }
});

console.log(myClass.props);
// Result
// { example { x: 5, y: 5}}

```

* Usage [Type](https://kbukum.github.io/wasabi-common/modules/_lang_type_.html)

```typescript
import { Type } from "wasabi-common";

let functionType = new Type<Function>({
    isPrimitive: (): boolean => false,
    isJsonType: (): boolean => false,
    getSize: (o: Function): number => {
        return (o as any).toString().length * 2;
    }
}

const f1 = function Example() {
    console.log("Example function");
}

functionType.isEmpty(f1);
functionType.isPrimitive(f1);
functionType.isJsonType(f1);
functionType.isNativeType(f1);
functionType.getClone(f1);
functionType.getName(f1);
functionType.getSize(f1);
functionType.equals(f1, f1);
```


* Usage [Arrays](https://kbukum.github.io/wasabi-common/modules/_types_arrays_.html)

```typescript
import { Arrays } from "wasabi-common";
Arrays.has([]);
```

* Usage [Objects](https://kbukum.github.io/wasabi-common/modules/_types_objects_.html)

```typescript
import { Objects } from "wasabi-common";
Objects.has({}); // false
```

* Usage [Strings](https://kbukum.github.io/wasabi-common/modules/_types_strings_.html)

```typescript
import { Strings } from "wasabi-common";
Strings.capitalizeFirstLetter("example"); // "Example"
Strings.endsWith("Example", "ex"); // false
Strings.has(""); // false
Strings.lPad("example", "0", 10); // "000example"
Strings.lTrim(" example "); // "example "
Strings.partsByNumber("example", 2); // ["ex", "am", "pl", "e"]
Strings.rPad("example", "0", 10); // "example000"
Strings.rTrim(" example "); // " example"
Strings.startsWith("Example", "ex"); // false
Strings.toString(null); // ""
Strings.trim(" Example "); // "Example"
```
  
* Usage [Assertions](https://kbukum.github.io/wasabi-common/modules/_util_assertions_.html)

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

* Usage [Functions](https://kbukum.github.io/wasabi-common/modules/_util_functions_.html)

```typescript
import { has, requireEs6, getType } from "wasabi-common";
has(null); // false
has(undefined); // false
has(""); // true
has({}); // true
requireEs6("./wasabi-common/lib/types/Arrays") // Arrays
getType(""); // String
getType(true); // Boolean
```

* Usage [Resolver](https://kbukum.github.io/wasabi-common/modules/_util_resolver_.html)

```typescript
import { addModule } from "wasabi-common";

addModule("src");
const Arrays = requireEs6("types/Arrays") // absolute call
```

* Usage [Types](https://kbukum.github.io/wasabi-common/modules/_util_types_.html)

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
