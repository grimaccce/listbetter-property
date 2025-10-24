/**
 * Examples of using listbetter-property
 */

const {
  listProperties,
  displayProperties,
  groupByType,
  countProperties
} = require('./index');

console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║          ListBetter Property - Usage Examples             ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

// Example 1: Simple object inspection
console.log('Example 1: Simple Object Inspection');
console.log('─'.repeat(60));
const person = {
  firstName: 'John',
  lastName: 'Doe',
  age: 30,
  email: 'john@example.com'
};

console.log(displayProperties(person));
console.log('\n');

// Example 2: Inspecting with values
console.log('Example 2: Displaying with Values');
console.log('─'.repeat(60));
const config = {
  apiKey: 'abc123',
  timeout: 5000,
  retries: 3,
  debug: false
};

console.log(displayProperties(config, { showValues: true }));
console.log('\n');

// Example 3: Grouping by type
console.log('Example 3: Grouping Properties by Type');
console.log('─'.repeat(60));
const mixedData = {
  title: 'Sample',
  count: 42,
  enabled: true,
  items: [1, 2, 3],
  metadata: { version: '1.0' }
};

const grouped = groupByType(mixedData);
console.log('Properties grouped by type:');
for (const [type, props] of Object.entries(grouped)) {
  console.log(`  ${type}: ${props.join(', ')}`);
}
console.log('\n');

// Example 4: Property statistics
console.log('Example 4: Property Statistics');
console.log('─'.repeat(60));
const stats = countProperties(mixedData);
console.log('Property counts:');
console.log(`  Total: ${stats.total}`);
console.log(`  Enumerable: ${stats.enumerable}`);
console.log(`  Non-enumerable: ${stats.nonEnumerable}`);
console.log(`  Writable: ${stats.writable}`);
console.log(`  Read-only: ${stats.readonly}`);
console.log('\n');

// Example 5: Object with getters/setters
console.log('Example 5: Object with Getters and Setters');
console.log('─'.repeat(60));
const user = {
  _name: 'Alice',
  _age: 25
};

Object.defineProperty(user, 'name', {
  get() { return this._name; },
  set(value) { this._name = value; },
  enumerable: true
});

Object.defineProperty(user, 'age', {
  get() { return this._age; },
  set(value) { this._age = value; },
  enumerable: true
});

console.log(displayProperties(user, { includeNonEnumerable: true }));
console.log('\n');

// Example 6: Detailed property information
console.log('Example 6: Raw Property Information');
console.log('─'.repeat(60));
const props = listProperties(person);
console.log('Raw property data:');
console.log(JSON.stringify(props, null, 2));
