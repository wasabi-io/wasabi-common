## wasabi-common 

[![npm package](https://badge.fury.io/gh/wasabi-io%2Fwasabi-common.svg)](https://badge.fury.io/gh/wasabi-io%2Fwasabi-common.svg)
[![Build Status](https://travis-ci.org/wasabi-io/wasabi-common.svg?branch=master)](https://travis-ci.org/wasabi-io/wasabi-common)
[![codecov](https://codecov.io/gh/wasabi-io/wasabi-common/branch/master/graph/badge.svg)](https://codecov.io/gh/wasabi-io/wasabi-common)

#### Motivation

Provides some common operations.

#### [Type Docs](https://wasabi-io.github.io/wasabi-common)

#### Common Classes

* collection [..more](./usage/collection.md)
  - [Collection](https://wasabi-io.github.io/wasabi-common/modules/_collection_collection_.html) :
     Provides forEach, map utility methods for Object and Array.
  - [Iterator](https://wasabi-io.github.io/wasabi-common/modules/_collection_iterator_.html):
     Provides iterate on array.
  - [Set](https://wasabi-io.github.io/wasabi-common/modules/_collection_set_.html):
     Provides set list.
  - [Map](https://wasabi-io.github.io/wasabi-common/modules/_collection_map_.html):
     Provides map entry list.
  - [Tree]  - (https://wasabi-io.github.io/wasabi-common/modules/_collection_tree_.html):
  Provides tree list.

* lang [..more](./usage/lang.md) 
  - [Binder](https://wasabi-io.github.io/wasabi-common/modules/_lang_binder_.html) :
     Provides to bind all methods of the instance when construct.
  - [Type](https://wasabi-io.github.io/wasabi-common/modules/_lang_type_.html):
     Provides define new Type by some default methods. It is useful when cloning or merging. (isEmpty, isPrimitive, isJsonType, isNativeType, getClone, getName, getSize, equals)


* types [..more](./usage/types.md) 
    - [Arrays](https://wasabi-io.github.io/wasabi-common/modules/_types_arrays_.html): 
    Provides some operation on Array type
    - [Chars](https://wasabi-io.github.io/wasabi-common/modules/_types_chars_.html):
    Provides some operation for chars.
    - [Functions](https://wasabi-io.github.io/wasabi-common/modules/_types_functions_.html):
    Provides some operation on Function type.
    - [Maps](https://wasabi-io.github.io/wasabi-common/modules/_types_maps_.html):
    Provides some operation on Map type.
    - [Objects](https://wasabi-io.github.io/wasabi-common/modules/_types_objects_.html): 
    Provides some operation on Object type
    - [Strings](https://wasabi-io.github.io/wasabi-common/modules/_types_strings_.html):
    Provides some operation on String type

* util [..more](./usage/util.md) 
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


#### Usage

```bash
npm install wasabi-common --save
```
   


