# listbetter-property

A lightweight JavaScript utility for better listing and inspecting object properties. This library provides enhanced property inspection capabilities beyond the standard `Object.keys()` and `console.log()`, making it easier to understand object structures, property attributes, and metadata.

## Features

- 📋 **Comprehensive Property Listing**: List all properties with detailed information including type, enumerability, configurability, and writability
- 🎨 **Formatted Display**: Pretty-print property information in a readable format
- 🔍 **Type Grouping**: Group properties by their data types
- 📊 **Statistics**: Get counts and statistics about object properties
- ⚙️ **Flexible Options**: Control what information to include (inherited properties, non-enumerable properties, values, etc.)
- 🔐 **Getter/Setter Detection**: Identify properties with getters and setters

## Installation

```bash
npm install listbetter-property
```

Or if using this repository directly:

```bash
git clone https://github.com/grimaccce/listbetter-property.git
cd listbetter-property
npm install
```

## Usage

### Basic Example

```javascript
const { displayProperties } = require('listbetter-property');

const obj = {
  name: 'John',
  age: 30,
  email: 'john@example.com'
};

console.log(displayProperties(obj));
```

Output:
```
Properties:
────────────────────────────────────────────────────────────
  name (string)
  age (number)
  email (string)
```

### Display with Values

```javascript
const { displayProperties } = require('listbetter-property');

const config = {
  apiKey: 'abc123',
  timeout: 5000,
  debug: false
};

console.log(displayProperties(config, { showValues: true }));
```

Output:
```
Properties:
────────────────────────────────────────────────────────────
  apiKey (string)
    Value: "abc123"
  timeout (number)
    Value: 5000
  debug (boolean)
    Value: false
```

## API Reference

### `listProperties(obj, options)`

Returns an array of property information objects.

**Parameters:**
- `obj` (Object): The object to inspect
- `options` (Object): Configuration options
  - `includeInherited` (Boolean): Include inherited properties (default: `false`)
  - `includeNonEnumerable` (Boolean): Include non-enumerable properties (default: `false`)
  - `showTypes` (Boolean): Include type information (default: `true`)
  - `showValues` (Boolean): Include property values (default: `true`)

**Returns:** Array of property information objects with the following structure:
```javascript
{
  name: 'propertyName',
  enumerable: true,
  configurable: true,
  writable: true,
  isOwn: true,
  type: 'string',
  value: 'propertyValue',
  hasGetter: false,
  hasSetter: false
}
```

### `displayProperties(obj, options)`

Returns a formatted string representation of object properties.

**Parameters:**
- `obj` (Object): The object to inspect
- `options` (Object): Same as `listProperties()`

**Returns:** String with formatted property information

### `groupByType(obj)`

Groups properties by their data type.

**Parameters:**
- `obj` (Object): The object to inspect

**Returns:** Object with properties grouped by type:
```javascript
{
  string: ['name', 'email'],
  number: ['age', 'count'],
  boolean: ['active']
}
```

### `countProperties(obj)`

Returns statistics about object properties.

**Parameters:**
- `obj` (Object): The object to inspect

**Returns:** Object with property counts:
```javascript
{
  total: 7,
  enumerable: 6,
  nonEnumerable: 1,
  writable: 6,
  readonly: 0,
  withGetters: 1,
  withSetters: 1
}
```

## Examples

### Inspecting Objects with Getters/Setters

```javascript
const { displayProperties } = require('listbetter-property');

const user = {
  _name: 'Alice'
};

Object.defineProperty(user, 'name', {
  get() { return this._name; },
  set(value) { this._name = value; },
  enumerable: true
});

console.log(displayProperties(user));
```

### Getting Property Statistics

```javascript
const { countProperties } = require('listbetter-property');

const obj = {
  prop1: 'value1',
  prop2: 42,
  prop3: true
};

const stats = countProperties(obj);
console.log(stats);
// { total: 3, enumerable: 3, nonEnumerable: 0, writable: 3, readonly: 0, withGetters: 0, withSetters: 0 }
```

### Grouping by Type

```javascript
const { groupByType } = require('listbetter-property');

const data = {
  name: 'Product',
  price: 99.99,
  inStock: true,
  tags: ['electronics', 'sale']
};

const grouped = groupByType(data);
console.log(grouped);
// { string: ['name'], number: ['price'], boolean: ['inStock'], object: ['tags'] }
```

## Running Tests

```bash
npm test
```

## Running Examples

```bash
node examples.js
```

## Use Cases

- **Debugging**: Quickly inspect object structures during development
- **Documentation**: Generate property documentation for objects
- **Validation**: Verify object structures match expected schemas
- **Learning**: Understand how JavaScript properties work
- **Testing**: Inspect test objects and verify property attributes

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.