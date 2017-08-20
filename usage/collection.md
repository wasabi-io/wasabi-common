## lang

  - [Collection](https://wasabi-io.github.io/wasabi-common/modules/_collection_collection_.html) :
     Provides forEach, map utility methods for Object and Array.
  - [Iterator](https://wasabi-io.github.io/wasabi-common/modules/_collection_iterator_.html):
     Provides iterate on array.
  - [Set](https://wasabi-io.github.io/wasabi-common/modules/_collection_set_.html):
     Provides set list.
  - [Map](https://wasabi-io.github.io/wasabi-common/modules/_collection_map_.html):
     Provides map entry list.

##### Usage [Collection](https://wasabi-io.github.io/wasabi-common/modules/_collection_collection_.html) :
Provides forEach, map utility methods for Object and Array.

* use Collection

```typescript
import { Collection } from "wasabi-common"

let result: string[] = Collection.mapObject(obj, (item: any, key: string) => {
    return ""
});
let result: string[] = Collection.mapArray(array, (item: any, key: string) => {
    return ""
});
let result: string[] = Collection.map(obj or array, (item: any, key: string) => {
    return ""
});

Collection.forEachObject(obj, (item) => return true);
Collection.forEachArray(array, (item) => return true);
Collection.forEach(obj or array, (item) => return true);

```

##### Usage [Iterator](https://wasabi-io.github.io/wasabi-common/modules/_collection_iterator_.html):
 Provides iterate on array.

```typescript
import { Iterator } from "wasabi-common";

let iterator = new Iterator(["t1", "t2"]);
while(iterator.hasNext()) iterator.next();


let iterator2 = new Iterator(["t1", "t2"]);

if(iterator.hasNext()) {
    ...
}
iterator.forEachRemaining((item) => {
    ...
})

```

##### Usage [Set](https://wasabi-io.github.io/wasabi-common/modules/_collection_set_.html):

Provides set list.

```typescript
let set = new Set(["element"]);
let contains = set.contains("element");
console.log(contains);
let index = set.indexOf("element");
let element = set.get(0);
set.add("test");
set.addAll(["element"]);
let anotherSet = new Set(["test"]);
set.addAll(anotherSet);
set.remove("test");
console.log(set.length);
Set.addArray(["element"], set);
Set.addSet(anotherSet, set);
```

  - [Map](https://wasabi-io.github.io/wasabi-common/modules/_collection_map_.html):
     Provides map entry list.

```typescript`
let map = new Map<string, Array<string>>();
console.log(map.isEmpty());
console.log(map.contains("key1"));
console.log(map.contains(["value1"]));
console.log(map.get("key1"));
console.log(map.getOrDefault("key1", ["defaultValue"]));
console.log(map.put("key1", ["value1"]));
console.log(map.remove("key1"));
let anotherMap =  new Map<string, string>();
map.putAll(anotherMap);
map.clear(); // clear map.
map.keySet(); // return key array
map.values(); // return value array
map.entrySet(); // return entry Array.
map.forEach(() => ...) // return boolean.
map.map(() => ...) // return an array
map.length; // get size of map as number.
map.filter((entry) => true); // apply filter and return new Map
map.iterator(); // return new Iterator
``