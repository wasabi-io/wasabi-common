## lang

  - [Class](https://wasabi-io.github.io/wasabi-common/modules/_lang_class_.html) : 
     Provides to bind all methods of the instance when construct. 
  - [PropClass](https://wasabi-io.github.io/wasabi-common/modules/_lang_propclass_.html) : 
  Provides to merge props and defaultProps when construct.
  - [Type](https://wasabi-io.github.io/wasabi-common/modules/_lang_type_.html): 
  Provides define new Type by some default methods. It is useful when cloning or merging. (isEmpty, isPrimitive, isJsonType, isNativeType, getClone, getName, getSize, equals)

##### Usage [Class](https://wasabi-io.github.io/wasabi-common/modules/_lang_class_.html) : 
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
  
##### Usage [PropClass](https://wasabi-io.github.io/wasabi-common/modules/_lang_propclass_.html) : 
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
  
  
  
##### Usage [Type](https://wasabi-io.github.io/wasabi-common/modules/_lang_type_.html): 
Provides define new Type by some default methods. 
It is useful when cloning or merging. 
(isEmpty, isPrimitive, isJsonType, isNativeType, getClone, getName, getSize, equals)

- What'is benefit of use Type class: Before check [Types](./types.md#Types) class. As you can see you can add Type instance to Types.
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
