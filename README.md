## wasabi-common 

[![npm package](https://badge.fury.io/gh/kbukum%2Fwasabi-common.svg)](https://badge.fury.io/gh/kbukum%2Fwasabi-common.svg)
[![Build Status](https://travis-ci.org/kbukum/wasabi-common.svg?branch=master)](https://travis-ci.org/kbukum/wasabi-common)
[![codecov](https://codecov.io/gh/kbukum/wasabi-common/branch/master/graph/badge.svg)](https://codecov.io/gh/kbukum/wasabi-common)

#### Motivation

Provides some common operations.

#### [Type Docs](https://kbukum.github.io/wasabi-common)

#### Common Classes

* lang
    - [Class](https://kbukum.github.io/wasabi-common/modules/_lang_class_.html) : 
    Provides to bind all methods of the instance when construct. 
    - [PropClass](https://kbukum.github.io/wasabi-common/modules/_lang_propclass_.html) : 
    Provides to merge props and defaultProps when construct.
    - [Type](https://kbukum.github.io/wasabi-common/modules/_lang_type_.html): 
    Provides define new Type by some default methods. It is useful when cloning or merging. (isEmpty, isPrimitive, isJsonType, isNativeType, getClone, getName, getSize, equals)
      
* types
    - [Arrays](https://kbukum.github.io/wasabi-common/modules/_types_arrays_.html): 
    Provides some operation on Array type
    - [Objects](https://kbukum.github.io/wasabi-common/modules/_types_objects_.html): 
    Provides some operation on Object type
    - [Strings](https://kbukum.github.io/wasabi-common/modules/_types_strings_.html):
    Provides some operation on String type

* util
    - [Validations](https://kbukum.github.io/wasabi-common/modules/_util_validations_): 
    It used for validations.
    - [Assertions](https://kbukum.github.io/wasabi-common/modules/_util_assertions_.html): 
    It used for assertions.
    - [Functions](https://kbukum.github.io/wasabi-common/modules/_util_functions_.html): 
    Provides some useful methods (getType, has, requireEs6)
    - [Resolver](https://kbukum.github.io/wasabi-common/modules/_util_resolver_.html): 
    Provides add module paths to the resolver.
    - [Types](https://kbukum.github.io/wasabi-common/modules/_util_types_.html): 
    Provides some operations on any types and defined some standard types in it. (Number, Boolean, Array, String, Date, RegExp: , Null, Function, Undefined, Object)


#### Usage

```ssh
npm install wasabi-common --save
```

##### Usage [Class](https://kbukum.github.io/wasabi-common/modules/_lang_class_.html) : 
Provides to bind all methods of the instance when construct.  
    
* extend example **extends Class**

```typescript
import { Class } from "wasabi-common"

export default class MyClass extends Class {
    private props;
    public constructor(props) {
      super();
      this.props = props;
    }
    
    // exampleMethod will bind when MyClass construct
    exampleMethod(){
        
    }
}
```


* static call example **Class.bindAll(instance)**

```typescript
 import { Class } from "wasabi-common"
 
 export default class MyClass {
     private props;
     public constructor(props) {
         Class.bindAll(this);  
         this.props = props;
     }
     
     // exampleMethod will bind when MyClass construct
     exampleMethod(){
         
     }
 }
  ```
    
##### Usage [PropClass](https://kbukum.github.io/wasabi-common/modules/_lang_propclass_.html) : 
Provides to merge props and defaultProps when construct.

* define static defaultProps example **static defaultProps**
```typescript
import { PropClass } from "wasabi-common"

export default class MyClass extends PropClass {
    static defaultProps = {
        example: {
            y: 5
        }
    }
    props;
    constructor(props) {
        super(props);
    }
}
```

* use custom default props example **customDefaults**
```typescript
import { PropClass } from "wasabi-common"

const customDefaults = {
    example: {
        y: 5
    }
};
export default class MyClass extends PropClass {
    props;
    constructor(props) {
        super(props, customDefaults);
    }
}
```

##### Usage [Type](https://kbukum.github.io/wasabi-common/modules/_lang_type_.html): 
Provides define new Type by some default methods. 
It is useful when cloning or merging. 
(isEmpty, isPrimitive, isJsonType, isNativeType, getClone, getName, getSize, equals)

- What'is benefit of use Type class: Before check [Types](#Types) class. As you can see you can add Type instance to Types.
After that if you clone, getSize ex. methods. Types recursively find types and call their methods. 
- Some Type already defined. (Number, Boolean, Array, String, Date, RegExp: , Null, Function, Undefined, Object)

-- Define example type. (This is Function Type)
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
```

- After you define type you can use below methods to check or get something from the type.
```typescript
functionType.isEmpty(f1); // false
functionType.isPrimitive(f1); // false
functionType.isJsonType(f1); // false
functionType.isNativeType(f1); // true
functionType.getClone(f1); // same instance f1
functionType.getName(f1); // Function
functionType.getSize(f1); // 59 charachter * 2 = 118
functionType.equals(f1, f1); // true
```

##### Usage [Arrays](https://kbukum.github.io/wasabi-common/modules/_types_arrays_.html): 
Provides some operation on Array type

```typescript
import { Arrays } from "wasabi-common";
let src = ["4", "5"];
let index = 1;
let value = "4";
Arrays.has(src); // true
Arrays.has(src, index); // true
Arrays.getLength(src); // 2
Arrays.remove(src, index); // ["4"]
Arrays.removeValue(src, value); // []
```

* Usage [Objects](https://kbukum.github.io/wasabi-common/modules/_types_objects_.html)

```typescript
import { Objects } from "wasabi-common";
let src = {
    key1: "3",
    key2: "3",
    key3: "6"
};
Objects.has(src); // true;
Objects.has({}); // false;
Objects.has(src, "key1"); // true;
Objects.Objects.getLength(src); // 3
Objects.remove(src, "key1"); // { key2: "3", key3: "6" }
Objects.removeValue(src, "3"); // {key3: "6"}
Objects.map(src, (value, key) => { return key + "->" value; }); // ["key3->6"]
Objects.forEach(src, (value, key) => { console.log(key) });
Objects.getKeys(src); // ["key3"]
Objects.addValue(src, "key4", "5"); // { key3: "6", key4: "5" }
Objects.addValue(src, "nestedObject", "5", ["key5"]); // { key3: "6", key4: "5", nestedObject: { key5: "5"} }
Objects.getValue(src, "key4"); // "6"
Objects.getValue(src, "nestedObject", ["key5"]); // "5"
Objects.clone(src); // { key3: "6", key4: "5", nestedObject: { key5: "5"} }
Objects.merge(src, { key5: "6", nestedObject: { key5: "7"}}); // { key3: "6", key4: "5", key5: "6", nestedObject: { key5: "5"} }
Objects.mergeDefaults(src, { key5: "6", nestedObject: { key5: "7"}}); // { key3: "6", key4: "5", key5: "6", nestedObject: { key5: "7"} }
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
import { requireEs6 } from "wasabi-common";
import { addModule } from "wasabi-common/lib/util/Resolver";

addModule("src");
const Arrays = requireEs6("types/Arrays"); // absolute call
```

* Usage <a name="Types"></a>[Types](https://kbukum.github.io/wasabi-common/modules/_util_types_.html)

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
