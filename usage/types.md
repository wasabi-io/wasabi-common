## types

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


##### Usage [Arrays](https://wasabi-io.github.io/wasabi-common/modules/_types_arrays_.html): 
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

* Usage [Objects](https://wasabi-io.github.io/wasabi-common/modules/_types_objects_.html)

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

* Usage [Strings](https://wasabi-io.github.io/wasabi-common/modules/_types_strings_.html)
<a name="#strings"></a>
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
let data = {
    name1: 'Silento',
    name2: 'Miley',
    nested: { greeting: 'Dude', useName1: true },
    verb: function() {
        return this.nested.useName1 ? 'nae nae' : 'twerk';
    }
};
let result = Strings.template('Hello, ${nested["greeting"]}!', data);
console.log(result);
result = Strings.template('${nested.useName1 ? name1 : name2}', data);
console.log(result);
result = Strings.template('${name1} likes to ${verb()}', data);
console.log(result);
```
  